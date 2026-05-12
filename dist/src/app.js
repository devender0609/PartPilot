(() => {
  'use strict';
  const root = document.getElementById('app');

  const PARTS = [
    { id:'toilet-flapper', cat:'Toilet', name:'Toilet flapper / flush seal', words:['toilet','flapper','flush','running','chain','rubber','seal','ghost flush'], risk:'Medium', confirm:['Measure 2-inch vs 3-inch flush valve opening.','Match hinge ears/ring style and chain attachment.','Check tank model stamped inside tank or under the lid.'], photos:['Inside tank with lid removed','Old flapper both sides','Ruler across flush valve opening'], q:['toilet flapper 2 inch 3 inch flush seal replacement','Korky Fluidmaster universal toilet flapper size guide'], explain:'Choose this if the broken rubber flap sits at the bottom of the toilet tank.' },
    { id:'toilet-fill', cat:'Toilet', name:'Toilet fill valve', words:['fill valve','float','hissing','refill','water level','tank fills'], risk:'Medium', confirm:['Measure tank height and overflow-tube height.','Confirm supply connection and refill tube setup.','Check whether universal valve fits tank.'], photos:['Full inside-tank photo','Fill valve tower close-up','Water supply connection below tank'], q:['universal toilet fill valve replacement kit','toilet fill valve hissing slow refill replacement'], explain:'Choose this if the tall valve/float assembly controls tank refill.' },
    { id:'faucet-cartridge', cat:'Faucet', name:'Faucet cartridge / stem', words:['faucet','sink','cartridge','stem','drip','handle leak','tap','shower valve'], risk:'High', confirm:['Identify brand from faucet body/handle if possible.','Match cartridge length, pins, grooves, spline/stem shape.','Confirm retaining clip/nut style.'], photos:['Brand mark on faucet','Old cartridge next to ruler','Stem top and side close-up'], q:['faucet cartridge stem replacement identify by photo','Moen Delta Kohler faucet cartridge identification'], explain:'Choose this if leaking is from the handle or valve stem.' },
    { id:'faucet-aerator', cat:'Faucet', name:'Faucet aerator / screen', words:['aerator','low flow','screen','sprays sideways','faucet tip','sputter'], risk:'Low', confirm:['Confirm male vs female thread.','Measure thread diameter.','Match flow rate/finish if important.'], photos:['Faucet tip close-up','Removed aerator front and side','Thread with ruler'], q:['faucet aerator replacement thread size','faucet aerator male female thread identification'], explain:'Choose this if the issue is at the faucet tip or water stream.' },
    { id:'cabinet-hinge', cat:'Cabinet', name:'Concealed cabinet hinge', words:['cabinet','hinge','soft close','35mm','door sagging','blum','euro hinge'], risk:'Medium', confirm:['Measure hinge cup diameter, often 35 mm.','Confirm overlay type: full, half, inset, or face-frame.','Match screw spacing, hinge arm, and opening angle.'], photos:['Installed hinge on door','Hinge arm markings','Closed door showing overlay'], q:['35mm concealed cabinet hinge soft close overlay replacement','cabinet hinge identify full overlay half overlay inset'], explain:'Choose this if the part is a furniture/cabinet hinge, not an appliance hinge.' },
    { id:'drawer-slide', cat:'Cabinet', name:'Drawer slide / runner', words:['drawer','slide','runner','rail','stuck drawer','undermount','side mount'], risk:'Medium', confirm:['Measure closed slide length.','Confirm side mount, undermount, center mount, or euro slide.','Check side clearance and load rating.'], photos:['Side of drawer with slide visible','Cabinet interior rail','Closed slide length measurement'], q:['drawer slide replacement side mount undermount length','identify drawer runner slide replacement'], explain:'Choose this if the broken part is a drawer rail/runner.' },
    { id:'dishwasher-wheel', cat:'Dishwasher', name:'Dishwasher rack wheel / roller', words:['dishwasher','rack','wheel','roller','clip','upper rack','lower rack'], risk:'Medium', confirm:['Find dishwasher model on door frame.','Confirm upper vs lower rack.','Match clip style, axle shape, and wheel diameter.'], photos:['Rack corner where wheel broke','Good matching wheel/clip','Model sticker on dishwasher frame'], q:['dishwasher rack wheel roller assembly model number','dishwasher lower rack wheel replacement clip style'], explain:'Choose this if the broken part came from a dishwasher rack.' },
    { id:'fridge-filter', cat:'Refrigerator', name:'Refrigerator water filter', words:['fridge','refrigerator','water filter','filter light','dispenser','ice filter','bad taste'], risk:'Medium', confirm:['Find refrigerator model number or old filter code.','Confirm push, twist, or drop-down style.','Check NSF/compatibility markings if important.'], photos:['Old filter label','Filter housing location','Fridge model plate'], q:['refrigerator water filter replacement model number','fridge filter replacement old filter code'], explain:'Choose this if the part is the filter cartridge or filter housing part.' },
    { id:'fridge-hinge-cover', cat:'Refrigerator', name:'Refrigerator lower door hinge cover / corner trim', words:['refrigerator','fridge','hinge','door hinge','corner trim','bottom corner','door corner','plastic cover','white plastic','lower hinge'], risk:'High', confirm:['Find the refrigerator brand and full model number from the inside wall or door frame.','Confirm whether the broken piece clips over the hinge or is part of the door trim/end cap.','Compare left vs right side and top vs bottom position before buying.'], photos:['Full view of refrigerator door and hinge area','Close-up of hinge/corner with broken plastic removed if safe','Model plate inside refrigerator','Matching intact hinge/corner on the opposite side'], q:['refrigerator lower door hinge cover corner trim replacement model number','fridge door corner trim hinge cover white plastic replacement','refrigerator hinge cover replacement by model number'], explain:'Choose this if the broken white plastic is at the refrigerator door corner or hinge area.' },
    { id:'fridge-door-gasket', cat:'Refrigerator', name:'Refrigerator door gasket / seal', words:['refrigerator','fridge','door seal','gasket','magnetic seal','warm fridge','air leak'], risk:'Medium', confirm:['Find the refrigerator model number.','Confirm which door and side.','Check if the problem is torn gasket versus door alignment.'], photos:['Full door gasket view','Torn/leaking section close-up','Model plate'], q:['refrigerator door gasket replacement model number','fridge door seal magnetic gasket replacement'], explain:'Choose this if the rubber/magnetic seal around the door is torn or leaking.' },
    { id:'fridge-bin', cat:'Refrigerator', name:'Refrigerator door bin / shelf', words:['door bin','shelf','crisper','drawer cracked','fridge bin','refrigerator shelf'], risk:'Medium', confirm:['Find fridge model number.','Confirm bin position: top/middle/bottom and left/right.','Measure width/depth and match clip tabs.'], photos:['Broken bin including tabs','Door where bin attaches','Fridge model plate'], q:['refrigerator door bin shelf replacement model number','fridge shelf bin replacement by dimensions'], explain:'Choose this if the cracked piece is an interior shelf/bin.' },
    { id:'laundry-knob', cat:'Laundry', name:'Washer/dryer control knob', words:['washer','dryer','knob','dial','timer','spins freely'], risk:'Medium', confirm:['Check D-shaft vs splined shaft.','Find appliance model number.','Confirm knob is broken, not the control shaft.'], photos:['Front panel showing knob location','Back of old knob','Appliance model sticker'], q:['washer dryer control knob replacement model number','dryer timer knob D shaft splined replacement'], explain:'Choose this if the knob/dial is cracked or spins freely.' },
    { id:'vacuum-belt', cat:'Vacuum', name:'Vacuum belt / brush drive belt', words:['vacuum','belt','brush not spinning','roller','burning rubber','beater bar'], risk:'Low', confirm:['Find vacuum model number.','Match old belt code, width, and length.','Check brush roll spins freely before replacing belt.'], photos:['Vacuum model label','Brush roll area opened','Old belt if available'], q:['vacuum belt replacement model number','vacuum brush not spinning belt replacement'], explain:'Choose this if the brush roller stopped spinning or belt is broken.' },
    { id:'door-latch', cat:'Door', name:'Door latch / strike plate', words:['door','latch','strike','knob','lock','not latching','backset'], risk:'Medium', confirm:['Measure backset: 2-3/8 inch or 2-3/4 inch.','Match round vs square faceplate.','Check if strike alignment is the real problem.'], photos:['Door edge latch close-up','Strike plate on frame','Knob/handle set photo'], q:['door latch replacement backset faceplate','door not latching strike plate latch replacement'], explain:'Choose this if a room/exterior door will not latch.' },
    { id:'sprinkler-head', cat:'Irrigation', name:'Sprinkler head / nozzle', words:['sprinkler','nozzle','rotor','spray head','pop up','irrigation'], risk:'Medium', confirm:['Confirm spray vs rotor.','Match radius, pattern angle, and pop-up height.','Look for brand on cap.'], photos:['Top cap with brand','Full sprinkler body exposed','Spray pattern photo/video'], q:['sprinkler head nozzle replacement radius pattern','pop up sprinkler head replacement brand cap'], explain:'Choose this if the broken part is from an irrigation head/nozzle.' },
    { id:'pool-basket', cat:'Pool', name:'Pool pump strainer basket', words:['pool','pump basket','strainer','skimmer','basket cracked','o-ring'], risk:'Medium', confirm:['Find pump model number.','Measure basket height, top diameter, and bottom diameter.','Inspect lid O-ring condition.'], photos:['Pump label','Old basket next to ruler','Pump lid/basket chamber'], q:['pool pump strainer basket replacement dimensions model','pool pump basket cracked replacement'], explain:'Choose this if the part is a pool pump/skimmer basket.' }
  ];

  const state = {
    view: 'intake', loading:false, message:'', apiNote:'',
    form: { issue:'', category:'', brand:'', model:'', location:'', measurement:'' },
    images: [], analysis:null, selectedId:null, checks:{}, apiState:'unknown'
  };

  const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const pct = n => Math.max(0, Math.min(100, Math.round(Number(n) || 0)));
  const norm = v => String(v || '').toLowerCase();
  const clamp = (n,min,max) => Math.max(min, Math.min(max, Number(n) || 0));

  function scorePart(part) {
    const text = [state.form.issue, state.form.category, state.form.brand, state.form.model, state.form.location, state.form.measurement, ...state.images.map(i => i.name)].join(' ').toLowerCase();
    let score = 0;
    for (const w of part.words) if (text.includes(w)) score += w.length > 8 ? 15 : 10;
    if (state.form.category && part.cat.toLowerCase().includes(state.form.category.toLowerCase())) score += 20;
    return score;
  }

  function categoryWords(category, likely='') { return `${category || ''} ${likely || ''}`.toLowerCase(); }

  function inferCategory(category, likely) {
    const text = categoryWords(category, likely);
    const cats = [...new Set(PARTS.map(p => p.cat))];
    for (const cat of cats) if (text.includes(cat.toLowerCase())) return cat;
    if (/(fridge|refrigerator|freezer|ice maker)/.test(text)) return 'Refrigerator';
    if (/(dishwasher|dish washer)/.test(text)) return 'Dishwasher';
    if (/(toilet|flush|tank)/.test(text)) return 'Toilet';
    if (/(faucet|tap|sink|shower)/.test(text)) return 'Faucet';
    if (/(cabinet|drawer)/.test(text)) return 'Cabinet';
    if (/(washer|dryer|laundry)/.test(text)) return 'Laundry';
    if (/(vacuum)/.test(text)) return 'Vacuum';
    if (/(sprinkler|irrigation)/.test(text)) return 'Irrigation';
    if (/(pool|pump|skimmer)/.test(text)) return 'Pool';
    if (/(door|lock|latch|strike)/.test(text)) return 'Door';
    return category || 'Unknown';
  }

  function partTextScore(part, likely, category) {
    const text = `${likely || ''} ${category || ''}`.toLowerCase();
    let hit = 0;
    const tokens = [...new Set(text.split(/\W+/).filter(w => w.length > 3))];
    for (const t of tokens) {
      if (part.name.toLowerCase().includes(t)) hit += 18;
      if (part.cat.toLowerCase().includes(t)) hit += 10;
      if (part.words.some(w => w.includes(t) || t.includes(w))) hit += 8;
    }
    return hit;
  }

  function buildRelevantCandidates({likely, category, confidence, fallbackCandidates=[]}) {
    const inferred = inferCategory(category, likely);
    const baseConf = pct(confidence || 50);
    const related = PARTS
      .map(p => ({...p, matchScore: partTextScore(p, likely, category)}))
      .filter(p => inferred !== 'Unknown' ? p.cat === inferred : p.matchScore > 0)
      .sort((a,b) => (b.matchScore - a.matchScore) || a.name.localeCompare(b.name));

    let list = related.slice(0,5).map((p, i) => ({
      id:p.id, name:p.name, category:p.cat, risk:p.risk,
      confidence: i === 0 ? Math.max(35, baseConf - (p.matchScore ? 0 : 10)) : Math.max(12, baseConf - 12 - i * 10),
      explain:p.explain,
      confirm:p.confirm, photos:p.photos, q:p.q
    }));

    const likelyLower = norm(likely);
    const exactKnown = list.some(c => likelyLower && (norm(c.name).includes(likelyLower) || likelyLower.includes(norm(c.name).split('/')[0].trim())));
    if (likely && !exactKnown) {
      list.unshift({
        id:'vision-main', name:likely, category: inferred, risk: related[0]?.risk || 'High', confidence: baseConf,
        explain:'This is the main AI photo interpretation. Use it as a replacement category, not an exact guaranteed part number.',
        confirm: related[0]?.confirm || ['Confirm brand/model compatibility.','Confirm exact dimensions and connection style.','Compare to the original part before buying.'],
        photos: related[0]?.photos || ['Full view showing where the part installs','Close-up of the broken piece','Model/serial label'],
        q: related[0]?.q || [`${likely} replacement model number`, `${inferred} ${likely} replacement part`]
      });
    }

    if (!list.length) list = fallbackCandidates.slice(0,5);
    const seen = new Set();
    const finalList = list.filter(c => c && c.name && !seen.has(c.name.toLowerCase()) && seen.add(c.name.toLowerCase())).slice(0,5);
    const topConf = pct(finalList[0]?.confidence || baseConf || confidence || 45);
    return finalList.map((c, i) => ({
      ...c,
      confidence: i === 0 ? topConf : Math.max(10, Math.min(pct(c.confidence), topConf - 10 - (i * 5)))
    }));
  }

  function selectedCandidate() {
    const list = state.analysis?.candidates || [];
    return list.find(c => c.id === state.selectedId) || list[0] || null;
  }

  function readiness() {
    const a = state.analysis || {};
    const completed = Object.values(state.checks).filter(Boolean).length;
    const hasModel = Boolean(state.form.model.trim());
    const hasBrand = Boolean(state.form.brand.trim());
    const hasMeasure = Boolean(state.form.measurement.trim());
    const highRisk = String(a.fit_risk || '').toLowerCase().includes('high');
    const remaining = [];
    if (!hasModel) remaining.push('model number or old part code');
    if (!hasBrand) remaining.push('brand');
    if (!hasMeasure && String(a.fit_risk).toLowerCase() !== 'low') remaining.push('measurement or connection-style photo');
    if (completed < 2) remaining.push('at least two checklist items');

    let status = 'Do not buy yet';
    let tone = 'stop';
    let plain = 'The photo gives a likely part category, but fit details are missing. Use the next-step checklist before buying.';

    if ((hasModel && hasBrand && completed >= 2) || (hasModel && hasMeasure && completed >= 2)) {
      status = highRisk ? 'Ready to search, verify fit' : 'Ready to search';
      tone = 'ready';
      plain = 'You have enough details to start a safer search. Still confirm exact compatibility before purchasing.';
    } else if (hasModel || (hasBrand && completed >= 2) || (hasMeasure && completed >= 2)) {
      status = 'Okay to search, not ready to buy';
      tone = 'search';
      plain = 'You can start looking, but do not purchase until the missing fit details are confirmed.';
    }
    return { status, tone, plain, remaining: [...new Set(remaining)].slice(0,3), completed };
  }

  function localGuide() {
    const ranked = PARTS.map(p => ({...p, score:scorePart(p)})).sort((a,b)=>b.score-a.score);
    const top = ranked[0].score > 0 ? ranked[0] : null;
    const confidence = top ? Math.min(58, 20 + top.score) : 12;
    const part = top || { name:'Unknown replacement part', cat:'Unknown', risk:'High', confirm:['Identify what device/appliance it came from.','Find the model/serial label.','Measure the broken piece and connection points.'], photos:['Clear close-up of the broken piece','Photo showing where it came from','Model/serial label','Ruler or coin next to the part'], q:['replacement part identification help','appliance part identify by model number'], explain:'More information is needed before narrowing this down.' };
    const candidates = buildRelevantCandidates({ likely: part.name, category: part.cat, confidence, fallbackCandidates: ranked.slice(0,5).map(p => ({ id:p.id, name:p.name, category:p.cat, risk:p.risk, confidence:p.score ? Math.min(58, 20+p.score) : 6, explain:p.explain, confirm:p.confirm, photos:p.photos, q:p.q })) });
    return {
      mode:'local', detected_category: part.cat, likely_part: top ? part.name : 'Unknown replacement part', confidence_0_100: confidence,
      confidenceText: top ? 'Local clue match only' : 'Needs more information', fit_risk: top ? part.risk : 'High',
      visible_clues: top ? ['Matched your typed issue/category/filename clues.', 'Photo files were uploaded, but local mode cannot visually inspect them.'] : ['Photo received, but local mode cannot visually inspect an unknown part.'],
      missing_info: ['Vision AI is not connected, so true photo identification is unavailable.', ...part.confirm.slice(0,3)],
      next_photos: part.photos, confirm_before_buying: part.confirm,
      buying_warning: top ? 'Do not buy until model, measurement, and connection style are confirmed.' : 'Do not buy yet. Add a symptom/category or connect Vision AI for real photo identification.',
      search_queries: part.q, candidates
    };
  }

  function normalizeApi(api, fallback) {
    if (!api || !api.enabled || !api.result) return null;
    const r = api.result;
    const likely = r.likely_part || r.part_name || fallback.likely_part;
    const detected = inferCategory(r.detected_category || fallback.detected_category, likely);
    const confidence = pct(r.confidence_0_100 ?? r.confidence ?? 50);
    const match = PARTS.map(p => ({p, hit: partTextScore(p, likely, detected)})).sort((a,b)=>b.hit-a.hit)[0]?.p;
    let candidates = buildRelevantCandidates({ likely, category: detected, confidence, fallbackCandidates:fallback.candidates });
    if (Array.isArray(r.candidate_replacement_categories)) {
      const apiCands = r.candidate_replacement_categories
        .filter(x => x && x.name)
        .map((x, i) => ({
          id: 'api-candidate-' + i,
          name: x.name,
          category: inferCategory(x.category || detected, x.name),
          risk: x.fit_risk || x.risk || 'Medium',
          confidence: pct(x.likelihood_0_100 ?? x.confidence ?? Math.max(15, confidence - i * 12)),
          explain: x.why || 'AI-proposed replacement category. Verify by model number and connection style.',
          confirm: candidates[0]?.confirm || fallback.confirm_before_buying,
          photos: candidates[0]?.photos || fallback.next_photos,
          q: [`${x.name} replacement model number`, `${x.name} ${state.form.brand || ''} ${state.form.model || ''}`.trim()]
        }))
        .filter(x => x.category === detected || detected === 'Unknown');
      if (apiCands.length) candidates = [...apiCands, ...candidates].filter((c, idx, arr) => arr.findIndex(z => z.name.toLowerCase() === c.name.toLowerCase()) === idx).slice(0,5);
    }
    const main = candidates[0];
    return {
      mode:'vision', detected_category: detected, likely_part: likely, confidence_0_100: confidence,
      confidenceText: confidence >= 75 ? 'AI photo confidence' : confidence >= 45 ? 'AI photo confidence: verify with more details' : 'Low AI photo confidence',
      fit_risk: r.fit_risk || main?.risk || match?.risk || 'High',
      visible_clues: Array.isArray(r.visible_clues) ? r.visible_clues : fallback.visible_clues,
      missing_info: Array.isArray(r.missing_info) ? r.missing_info : fallback.missing_info,
      next_photos: Array.isArray(r.next_photos) ? r.next_photos : (main?.photos || match?.photos || fallback.next_photos),
      confirm_before_buying: Array.isArray(r.confirm_before_buying) ? r.confirm_before_buying : (main?.confirm || match?.confirm || fallback.confirm_before_buying),
      buying_warning: r.buying_warning || r.warning || 'Verify model, dimensions, and connection style before buying.',
      search_queries: Array.isArray(r.search_queries) ? r.search_queries : (main?.q || match?.q || fallback.search_queries),
      candidates, apiRaw: r
    };
  }

  async function analyze() {
    if (!state.images.length && !state.form.issue.trim()) { state.message = 'Upload at least one photo or type one short symptom.'; render(); return; }
    state.loading = true; state.message = 'Analyzing photos and building a fit checklist...'; state.apiNote = ''; render();
    const fallback = localGuide();
    try {
      const payload = { form: state.form, images: state.images.slice(0,4).map(i => ({ name:i.name, dataUrl:i.url })) };
      const res = await fetch('/api/analyze', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) });
      const raw = await res.text();
      let api = null;
      try { api = JSON.parse(raw); } catch { api = { enabled:false, code:'ROUTE_NOT_JSON', note:'The API route did not return JSON. Redeploy this updated ZIP.' }; }
      const merged = normalizeApi(api, fallback);
      if (merged) { state.analysis = merged; state.apiNote = 'Vision AI analyzed the photo. The big % is photo-identification confidence; buying readiness depends on the checklist below.'; }
      else { state.analysis = fallback; state.apiNote = api?.note || api?.error || 'Vision AI is not connected. The checklist below is a local guide, not true photo identification.'; }
    } catch (e) {
      state.analysis = fallback;
      state.apiNote = 'Vision AI could not be reached. Showing a local guide only.';
    }
    state.selectedId = state.analysis.candidates?.[0]?.id || null;
    state.checks = {};
    state.view = 'results'; state.loading = false; state.message = ''; render();
  }

  function header() {
    return `<aside class="side"><div class="brand"><div class="logo">🔎</div><div><h1>PartPilot</h1><p>Photo-first part triage</p></div></div>
      <div class="case"><span>Current case</span><b>${state.images.length} photo${state.images.length!==1?'s':''} uploaded</b><small>${esc(state.analysis?.likely_part || state.form.issue || 'Start with a photo')}</small></div>
      ${nav('intake','1. Show the part','Photos first')}${nav('results','2. Smart triage','Likely part + fit risk',!state.analysis)}${nav('report','3. Store report','Checklist + searches',!state.analysis)}
      <div class="truth"><b>⚠️ Wrong-part prevention</b><p>Use this before buying to know what must be verified.</p></div>
      <button class="ghost" data-action="reset">↻ Start over</button></aside>`;
  }
  function nav(view,title,sub,disabled){ return `<button class="nav ${state.view===view?'active':''}" data-view="${view}" ${disabled?'disabled':''}><b>${title}</b><small>${sub}</small></button>`; }

  function confidenceLabel(n) {
    n = pct(n);
    return n >= 75 ? 'Strong photo match' : n >= 45 ? 'Possible photo match' : 'Needs more photos';
  }

  function fitRiskPlain(risk) {
    const r = String(risk || 'Medium').toLowerCase();
    if (r.includes('high')) return 'High fit risk';
    if (r.includes('low')) return 'Low fit risk';
    return 'Medium fit risk';
  }

  function hero() {
    const a = state.analysis;
    if (!a) return `<section class="hero calmHero"><div><span>PartPilot</span><h2>Find the right replacement part from a photo</h2><p>Upload the broken part. The app gives a likely name, the next best step, and a short store report.</p></div></section>`;
    const r = readiness();
    return `<section class="hero calmHero resultHero"><div><span>Result</span><h2>${esc(a.likely_part)}</h2><p>${esc(confidenceLabel(a.confidence_0_100))} · ${esc(fitRiskPlain(a.fit_risk))} · ${esc(r.status)}</p></div></section>`;
  }

  function intakeView() {
    return `<section class="workspace intake cleanIntake calmIntake"><div class="card upload primaryUpload"><div class="sectionTop"><span>Step 1</span><b>Upload photos</b><p>Start with the broken piece. Add where it came from if you have it.</p></div>
      <label id="dropZone" class="drop bigDrop calmDrop"><input id="fileInput" type="file" accept="image/*" multiple><div class="plus">＋</div><h3>Add photos</h3><p>Best: close-up, installation location, model label.</p></label>
      ${state.images.length?`<div class="thumbs">${state.images.map(i=>`<div class="thumb"><img src="${i.url}" alt=""><button data-remove="${i.id}">×</button><small>${esc(i.name)}</small></div>`).join('')}</div>`:''}
      ${state.message?`<div class="message">${esc(state.message)}</div>`:''}
      <button class="primary wide" data-action="analyze" ${state.loading?'disabled':''}>${state.loading?'Checking...':'Check part'}</button>
    </div><div class="card quickClue"><div class="sectionTop"><span>Optional</span><b>Add one clue</b><p>One short clue helps avoid a wrong category.</p></div>
      <textarea data-field="issue" placeholder="Example: white plastic piece broke from bottom corner of refrigerator door">${esc(state.form.issue)}</textarea>
      <div class="chips compactChips">${['Toilet','Faucet','Cabinet','Dishwasher','Refrigerator','Laundry','Vacuum','Door','Irrigation','Pool'].map(c=>`<button class="chip ${state.form.category===c?'on':''}" data-cat="${c}">${c}</button>`).join('')}</div>
      <details class="advanced"><summary>Already know brand/model?</summary><div class="miniFields"><input data-field="brand" value="${esc(state.form.brand)}" placeholder="Brand"><input data-field="model" value="${esc(state.form.model)}" placeholder="Model or old part code"><input data-field="location" value="${esc(state.form.location)}" placeholder="Where it installs"><input data-field="measurement" value="${esc(state.form.measurement)}" placeholder="Measurement"></div></details>
    </div></section>`;
  }

  function candidateCard(c, i) {
    return `<div class="plainCandidate"><span>${esc(c.name)}</span><small>${esc(c.category)} · ${esc(fitRiskPlain(c.risk))}</small></div>`;
  }

  function actionSentence() {
    const r = readiness();
    if (!r.remaining.length) return 'Make report and verify fit before buying.';
    return 'Add ' + r.remaining[0] + '.';
  }

  function resultsView() {
    if (!state.analysis) return locked('Analyze a photo first.');
    const a = state.analysis;
    const candidates = (a.candidates || []).slice(1,4);
    const r = readiness();
    const clues = (a.visible_clues || []).slice(0,2);
    const missing = (a.missing_info || []).filter(x => !String(x).toLowerCase().includes('vision ai is not connected')).slice(0,3);
    return `<section class="workspace results calmResults">
      <div class="card summaryCard"><div class="summaryTop"><div><span>Likely part</span><h2>${esc(a.likely_part)}</h2></div><div class="statusPill ${r.tone}">${esc(r.status)}</div></div>
        <div class="summaryFacts"><div><span>Photo match</span><p>${esc(confidenceLabel(a.confidence_0_100))}</p></div><div><span>Fit risk</span><p>${esc(fitRiskPlain(a.fit_risk))}</p></div><div><span>Next step</span><p>${esc(actionSentence())}</p></div></div>
      </div>
      <div class="calmGrid">
        <div class="card"><div class="sectionTop"><span>Why</span><b>What the photo suggests</b></div>${list(clues)}<div class="warning compact"><b>Before buying</b><p>${esc(a.buying_warning)}</p></div></div>
        <div class="card"><div class="sectionTop"><span>Still needed</span><b>Do these next</b><p>Use this as a simple checklist. It does not change the AI result.</p></div>${simpleChecklist(a)}</div>
      </div>
      <div class="card calmAlt"><div class="sectionTop"><span>Other possible names</span><b>If the result looks wrong</b><p>These are same-category alternatives, not exact part numbers.</p></div><div class="plainAltList">${candidates.map(candidateCard).join('') || '<p>No alternate names yet.</p>'}</div></div>
      <div class="center calmActions"><button class="primary" data-view="report">Create store report</button><button class="secondary" data-view="intake">Add photos/details</button></div>
    </section>`;
  }

  function simpleChecklist(a) {
    const combined = [...(a.next_photos || []).slice(0,2), ...(a.confirm_before_buying || []).slice(0,3)];
    return `<div class="simpleChecks">${checks(combined,'s')}</div>`;
  }

  function nextSteps() { return simpleChecklist(state.analysis || {}); }

  function checks(items,prefix){ return (items||[]).map((x,i)=>`<label class="check simpleCheck"><input type="checkbox" data-check="${prefix}${i}" ${state.checks[prefix+i]?'checked':''}><span>${esc(x)}</span></label>`).join('') || '<p class="tiny">No items.</p>'; }
  function list(items){ return `<ul class="clean calmList">${(items||[]).map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`; }

  function reportView() {
    if (!state.analysis) return locked('Analyze a photo first.');
    const a = state.analysis; const sel = selectedCandidate(); const r = readiness();
    const name = sel?.name || a.likely_part;
    const category = sel?.category || a.detected_category;
    const risk = sel?.risk || a.fit_risk;
    const confirm = (sel?.confirm || a.confirm_before_buying || []).slice(0,4);
    const queries = (sel?.q || a.search_queries || []).slice(0,3);
    return `<section class="workspace report cleanReport calmReport"><div class="card"><div class="sectionTop"><span>Store report</span><b>${esc(name)}</b><p>Use this when searching online or asking a store/technician.</p></div><div class="reportBox compactReport"><p><span>Likely part:</span> ${esc(name)}</p><p><span>Category:</span> ${esc(category)}</p><p><span>Fit risk:</span> ${esc(fitRiskPlain(risk))}</p><p><span>Status:</span> ${esc(r.status)}</p><p><span>Brand/model:</span> ${esc([state.form.brand,state.form.model].filter(Boolean).join(' / ') || 'Still needed')}</p></div>
      <h3>Verify before buying</h3>${list(confirm)}<button class="primary wide" data-action="download">Download report</button></div><div class="card"><div class="sectionTop"><span>Search</span><b>Better search terms</b></div>${queries.map(q=>`<div class="query"><code>${esc(q)}</code><div>${['Google','Home Depot','Lowe’s','Amazon','Repair videos'].map(s=>`<a href="${url(q,s)}" target="_blank" rel="noopener">${s}</a>`).join('')}</div></div>`).join('')}<div class="warning"><b>Reminder</b><p>Do not buy from photo similarity alone. Confirm model, dimensions, and connection points.</p></div></div></section>`;
  }

  function locked(t){ return `<div class="workspace"><div class="card"><h2>${esc(t)}</h2><button class="primary" data-view="intake">Go to upload</button></div></div>`; }
  function url(q,s){ const e=encodeURIComponent(q); return s==='Home Depot'?`https://www.homedepot.com/s/${e}`:s==='Lowe’s'?`https://www.lowes.com/search?searchTerm=${e}`:s==='Amazon'?`https://www.amazon.com/s?k=${e}`:s==='Repair videos'?`https://www.youtube.com/results?search_query=${e}+repair+replace`:`https://www.google.com/search?q=${e}`; }

  async function handleFiles(files) {
    const list = Array.from(files||[]).filter(f=>f.type.startsWith('image/')).slice(0, 8-state.images.length);
    if (!list.length) return;
    state.message='Preparing image previews...'; render();
    const imgs=[]; for (const f of list) imgs.push(await resize(f));
    state.images=[...state.images,...imgs]; state.message=`${imgs.length} photo${imgs.length>1?'s':''} added.`; render();
  }
  function resize(file){ return new Promise(resolve=>{ const reader=new FileReader(); reader.onload=()=>{ const img=new Image(); img.onload=()=>{ const max=1200, scale=Math.min(1,max/Math.max(img.width,img.height)); const c=document.createElement('canvas'); c.width=Math.max(1,Math.round(img.width*scale)); c.height=Math.max(1,Math.round(img.height*scale)); c.getContext('2d').drawImage(img,0,0,c.width,c.height); resolve({id:(crypto.randomUUID?crypto.randomUUID():String(Date.now()+Math.random())),name:file.name,url:c.toDataURL('image/jpeg',0.82)});}; img.onerror=()=>resolve({id:String(Date.now()),name:file.name,url:reader.result}); img.src=reader.result;}; reader.readAsDataURL(file); }); }

  function downloadReport(){ const a=state.analysis; if(!a)return; const sel=selectedCandidate(); const r=readiness(); const name=sel?.name||a.likely_part; const html=`<!doctype html><html><head><meta charset="utf-8"><title>PartPilot Report</title><style>body{font-family:Arial,sans-serif;line-height:1.45;color:#111}h1{color:#0f766e}.box{border:1px solid #ddd;padding:12px;margin:12px 0}.warn{background:#fff7ed}</style></head><body><h1>PartPilot Replacement Part Report</h1><div class="box warn"><b>Warning:</b> ${esc(a.buying_warning)}</div><div class="box"><p><b>Main AI photo interpretation:</b> ${esc(a.likely_part)}</p><p><b>Selected replacement category:</b> ${esc(name)}</p><p><b>Category:</b> ${esc(sel?.category||a.detected_category)}</p><p><b>Fit risk:</b> ${esc(sel?.risk||a.fit_risk)}</p><p><b>Buy status:</b> ${esc(r.status)}</p><p><b>Issue:</b> ${esc(state.form.issue||'Not provided')}</p><p><b>Brand/model:</b> ${esc([state.form.brand,state.form.model].filter(Boolean).join(' / ')||'Not provided')}</p></div><h2>Visible/logical clues</h2>${list(a.visible_clues)}<h2>Still needed</h2>${list(a.missing_info)}<h2>Confirm before buying</h2>${list(sel?.confirm||a.confirm_before_buying)}<h2>Search terms</h2>${list(sel?.q||a.search_queries)}</body></html>`; const blob=new Blob([html],{type:'application/msword'}); const link=document.createElement('a'); link.href=URL.createObjectURL(blob); link.download='PartPilot_report.doc'; link.click(); URL.revokeObjectURL(link.href); }
  function reset(){ state.view='intake'; state.loading=false; state.message=''; state.apiNote=''; state.form={issue:'',category:'',brand:'',model:'',location:'',measurement:''}; state.images=[]; state.analysis=null; state.selectedId=null; state.checks={}; render(); }

  function layout(){ return `<div class="shell">${header()}<main>${hero()}${state.view==='intake'?intakeView():state.view==='results'?resultsView():reportView()}</main></div>`; }
  function render(){ root.innerHTML=layout(); wire(); }
  function wire(){ document.querySelectorAll('[data-view]').forEach(e=>e.addEventListener('click',()=>{ if(!e.disabled){ state.view=e.dataset.view; render(); }})); document.querySelectorAll('[data-action]').forEach(e=>e.addEventListener('click',()=>{ if(e.dataset.action==='analyze') analyze(); if(e.dataset.action==='reset') reset(); if(e.dataset.action==='download') downloadReport(); })); document.querySelectorAll('[data-field]').forEach(e=>{ const fn=()=>state.form[e.dataset.field]=e.value; e.addEventListener('input',fn); e.addEventListener('change',fn); }); document.querySelectorAll('[data-cat]').forEach(e=>e.addEventListener('click',()=>{ state.form.category=e.dataset.cat; render(); })); document.querySelectorAll('[data-remove]').forEach(e=>e.addEventListener('click',()=>{ state.images=state.images.filter(i=>i.id!==e.dataset.remove); render(); })); document.querySelectorAll('[data-part]').forEach(e=>e.addEventListener('click',()=>{ state.selectedId=e.dataset.part; render(); })); document.querySelectorAll('[data-check]').forEach(e=>e.addEventListener('change',()=>{ state.checks[e.dataset.check]=e.checked; render(); })); const input=document.getElementById('fileInput'); if(input) input.addEventListener('change',e=>handleFiles(e.target.files)); const dz=document.getElementById('dropZone'); if(dz){ ['dragenter','dragover'].forEach(ev=>dz.addEventListener(ev,e=>{e.preventDefault();dz.classList.add('drag')})); ['dragleave','drop'].forEach(ev=>dz.addEventListener(ev,e=>{e.preventDefault();dz.classList.remove('drag')})); dz.addEventListener('drop',e=>handleFiles(e.dataTransfer.files)); } }
  render();
})();
