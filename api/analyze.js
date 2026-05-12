function json(res, status, payload) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
}

function safeJsonParse(v) {
  if (!v) return {};
  if (typeof v === 'object') return v;
  try { return JSON.parse(v); } catch { return {}; }
}

async function handler(req, res) {
  if (req.method !== 'POST') return json(res, 405, { enabled:false, error:'Method not allowed' });

  const body = safeJsonParse(req.body);
  const images = Array.isArray(body.images) ? body.images.slice(0, 4) : [];
  const form = body.form || {};

  if (!process.env.OPENAI_API_KEY) {
    return json(res, 200, {
      enabled: false,
      code: 'NO_OPENAI_API_KEY',
      note: 'Vision AI is not connected. Add OPENAI_API_KEY in Vercel Environment Variables and redeploy. The app will still create a guided checklist, but it cannot truly identify an unknown part from a photo without vision.'
    });
  }

  try {
    const imageContent = images
      .filter(img => typeof img.dataUrl === 'string' && img.dataUrl.startsWith('data:image/'))
      .map(img => ({ type: 'image_url', image_url: { url: img.dataUrl } }));

    const prompt = `Analyze these homeowner repair-part photos. Identify the likely replacement part, but do not guarantee fit. Return compact valid JSON only with this exact shape:
{
  "detected_category": "string",
  "likely_part": "string",
  "confidence_0_100": number,
  "fit_risk": "Low|Medium|High",
  "visible_clues": ["string"],
  "missing_info": ["string"],
  "next_photos": ["string"],
  "confirm_before_buying": ["string"],
  "buying_warning": "string",
  "search_queries": ["string"],
  "candidate_replacement_categories": [{"name":"string","category":"string","fit_risk":"Low|Medium|High","likelihood_0_100":number,"why":"string"}]
}
Rules: Be practical. If the photo is unclear, say so. Ask only for the next details that reduce wrong purchases. Prefer common household parts: toilet flapper/fill valve, faucet cartridge/aerator, cabinet hinge/drawer slide, dishwasher rack wheel, refrigerator water filter/bin/shelf/door hinge cover/corner trim/gasket, washer/dryer knob, vacuum belt/brush, door latch, sprinkler head, pool pump basket. Candidate categories must stay in the same appliance/system as the main detected category unless the photo is genuinely ambiguous. User details: ${JSON.stringify(form).slice(0, 3000)}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4.1-mini',
        temperature: 0.15,
        max_tokens: 900,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: 'You are PartPilot, a careful visual replacement-part triage assistant. Output JSON only.' },
          { role: 'user', content: [{ type: 'text', text: prompt }, ...imageContent] }
        ]
      })
    });

    const text = await response.text();
    let data;
    try { data = JSON.parse(text); } catch { data = { raw: text }; }

    if (!response.ok) {
      return json(res, 200, {
        enabled: false,
        code: 'OPENAI_ERROR',
        error: data?.error?.message || 'Vision analysis failed.'
      });
    }

    const content = data?.choices?.[0]?.message?.content || '{}';
    let result;
    try { result = JSON.parse(content); }
    catch {
      result = { likely_part: 'Unclear part', confidence_0_100: 20, fit_risk: 'High', visible_clues: [], missing_info: ['The vision response was not valid JSON.'], next_photos: ['Retake a clear close-up photo.'], confirm_before_buying: ['Do not buy until model and measurements are confirmed.'], buying_warning: 'Identification was not reliable.', search_queries: [] };
    }

    return json(res, 200, { enabled: true, source: 'vision', result });
  } catch (error) {
    return json(res, 200, { enabled:false, code:'SERVER_ERROR', error: error?.message || 'Unexpected server error.' });
  }
}


module.exports = handler;
