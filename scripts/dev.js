const http = require('http');
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const mime = { '.html':'text/html', '.css':'text/css', '.js':'application/javascript', '.ico':'image/x-icon' };
http.createServer((req,res)=>{
  if (req.url.startsWith('/api/')) { res.writeHead(501, {'content-type':'application/json'}); return res.end(JSON.stringify({enabled:false,note:'API runs on Vercel. Local guide is available.'})); }
  let p = req.url === '/' ? '/index.html' : req.url.split('?')[0];
  const file = path.normalize(path.join(root, p));
  if (!file.startsWith(root)) { res.writeHead(403); return res.end('Forbidden'); }
  fs.readFile(file, (err, data)=>{
    if (err) { res.writeHead(404); return res.end('Not found'); }
    res.writeHead(200, {'content-type': mime[path.extname(file)] || 'text/plain'}); res.end(data);
  });
}).listen(5173, ()=>console.log('http://localhost:5173'));
