#!/bin/bash
# ============================================================
# setup_frontend.sh — Portfolio Frontend
# Usage: bash setup_frontend.sh
# ============================================================
set -e

PROJECT="portfolio-frontend"
echo "======================================"
echo "  Portfolio Frontend — Setup"
echo "======================================"

mkdir -p $PROJECT/assets/{css,js}

# ── CSS ─────────────────────────────────────────────────────
cat > $PROJECT/assets/css/main.css << 'EOF'
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@300;400;500&display=swap');
:root {
  --bg:#090b0e; --bg2:#0e1117; --bg3:#131720;
  --border:#1c2333; --border2:#243044;
  --text:#c9d1d9; --muted:#4a5568; --muted2:#6b7280;
  --green:#00ff9f; --green-dim:#00ff9f22;
  --blue:#58a6ff;  --blue-dim:#58a6ff22;
  --purple:#a78bfa;--purple-dim:#a78bfa22;
  --yellow:#f59e0b;--yellow-dim:#f59e0b22;
  --red:#f87171;   --red-dim:#f8717122;
  --font-mono:'JetBrains Mono','Fira Code',monospace;
  --font-sans:'Inter',system-ui,sans-serif;
  --radius:6px; --radius-lg:10px;
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{background:var(--bg);color:var(--text);font-family:var(--font-sans);font-size:14px;line-height:1.6;min-height:100vh;}
a{color:inherit;text-decoration:none;}
button{cursor:pointer;border:none;background:none;font:inherit;}
ul{list-style:none;}
::-webkit-scrollbar{width:5px;height:5px;}
::-webkit-scrollbar-track{background:var(--bg);}
::-webkit-scrollbar-thumb{background:var(--border2);border-radius:3px;}
.grid-bg{position:fixed;inset:0;z-index:0;pointer-events:none;background-image:linear-gradient(var(--border) 1px,transparent 1px),linear-gradient(90deg,var(--border) 1px,transparent 1px);background-size:40px 40px;opacity:.35;}
.topbar{position:fixed;top:0;left:0;right:0;z-index:100;height:48px;background:#090b0eee;backdrop-filter:blur(12px);border-bottom:1px solid var(--border);display:flex;align-items:center;padding:0 24px;gap:0;}
.topbar-brand{font-family:var(--font-mono);font-size:12px;color:var(--green);letter-spacing:.1em;margin-right:32px;white-space:nowrap;}
.topbar-nav{display:flex;gap:2px;flex:1;overflow-x:auto;}
.topbar-nav a{font-family:var(--font-mono);font-size:11px;letter-spacing:.08em;color:var(--muted);padding:0 14px;height:48px;display:flex;align-items:center;border-bottom:2px solid transparent;transition:color .15s,border-color .15s;white-space:nowrap;}
.topbar-nav a:hover{color:var(--text);}
.topbar-nav a.active{color:var(--green);border-bottom-color:var(--green);}
.topbar-status{font-family:var(--font-mono);font-size:10px;color:var(--green);display:flex;align-items:center;gap:6px;margin-left:16px;}
.topbar-status::before{content:'';width:6px;height:6px;background:var(--green);border-radius:50%;box-shadow:0 0 6px var(--green);animation:pulse 2s infinite;}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
.page{position:relative;z-index:1;max-width:1100px;margin:0 auto;padding:72px 24px 60px;}
.section-header{display:flex;align-items:baseline;gap:12px;padding-bottom:16px;border-bottom:1px solid var(--border);margin-bottom:28px;}
.section-icon{font-size:18px;color:var(--green);font-family:var(--font-mono);}
.section-title{font-family:var(--font-mono);font-size:20px;color:#fff;letter-spacing:-.01em;}
.section-sub{font-size:13px;color:var(--muted2);margin-left:4px;}
.panel{background:var(--bg2);border:1px solid var(--border);border-radius:var(--radius-lg);padding:20px 24px;}
.panel-label{font-family:var(--font-mono);font-size:10px;color:var(--muted);letter-spacing:.08em;margin-bottom:10px;display:block;}
.tag{display:inline-block;font-family:var(--font-mono);font-size:10px;padding:2px 8px;border-radius:4px;border:1px solid var(--border2);color:var(--muted2);background:var(--bg3);letter-spacing:.04em;}
.tag-green{border-color:#00ff9f44;color:var(--green);background:var(--green-dim);}
.tag-blue{border-color:#58a6ff44;color:var(--blue);background:var(--blue-dim);}
.tag-purple{border-color:#a78bfa44;color:var(--purple);background:var(--purple-dim);}
.tag-yellow{border-color:#f59e0b44;color:var(--yellow);background:var(--yellow-dim);}
.tag-red{border-color:#f8717144;color:var(--red);background:var(--red-dim);}
.dot{display:inline-block;width:7px;height:7px;border-radius:50%;margin-right:6px;flex-shrink:0;}
.dot-green{background:var(--green);box-shadow:0 0 5px var(--green);}
.dot-yellow{background:var(--yellow);box-shadow:0 0 5px var(--yellow);}
.dot-red{background:var(--red);}
.dot-gray{background:var(--muted);}
.progress-wrap{margin-bottom:18px;}
.progress-header{display:flex;justify-content:space-between;margin-bottom:6px;}
.progress-name{font-family:var(--font-mono);font-size:12px;color:var(--text);}
.progress-pct{font-family:var(--font-mono);font-size:11px;}
.progress-track{height:3px;background:var(--border);border-radius:2px;overflow:hidden;}
.progress-bar{height:100%;border-radius:2px;transition:width .8s ease;}
.bar-green{background:linear-gradient(90deg,var(--green),#00cfff);}
.bar-blue{background:linear-gradient(90deg,var(--blue),var(--purple));}
.bar-purple{background:var(--purple);}
.code-block{font-family:var(--font-mono);font-size:12px;color:var(--blue);background:var(--bg);border:1px solid var(--border);border-radius:var(--radius);padding:12px 16px;overflow-x:auto;white-space:pre;line-height:1.7;}
.grid-3{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px;}
.grid-2{display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:20px;}
.skeleton{background:linear-gradient(90deg,var(--bg2) 25%,var(--bg3) 50%,var(--bg2) 75%);background-size:200% 100%;animation:shimmer 1.5s infinite;border-radius:var(--radius);}
@keyframes shimmer{to{background-position:-200% 0}}
.cursor{animation:blink 1s step-end infinite;}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
.empty{text-align:center;padding:60px 20px;color:var(--muted);font-family:var(--font-mono);font-size:13px;}
.empty::before{content:'[ ]';display:block;font-size:32px;margin-bottom:12px;}
.footer{position:fixed;bottom:0;left:0;right:0;height:32px;background:var(--bg);border-top:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;padding:0 24px;font-family:var(--font-mono);font-size:10px;color:var(--muted);z-index:100;}
.footer-right{display:flex;gap:20px;}
EOF

# ── API JS ───────────────────────────────────────────────────
cat > $PROJECT/assets/js/api.js << 'EOF'
const API = (() => {
  const BASE_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:8000/api'
    : 'https://your-app.onrender.com/api';
  async function get(endpoint) {
    const res = await fetch(`${BASE_URL}${endpoint}`);
    if (!res.ok) throw new Error(`API error ${res.status}`);
    return res.json();
  }
  return {
    skills:       { all: () => get('/skills/'), byCategory: () => get('/skills/by_category/') },
    projects:     { all: (s='') => get('/projects/'+(s?`?status=${s}`:'')), one: slug => get(`/projects/${slug}/`) },
    walkthroughs: { all: (s='') => get('/walkthroughs/'+(s?`?status=${s}`:'')), one: slug => get(`/walkthroughs/${slug}/`) },
    labs:         { all: (s='') => get('/labs/'+(s?`?status=${s}`:'')) },
    journal:      { all: () => get('/journal/'), one: slug => get(`/journal/${slug}/`) },
    roadmap:      { byHorizon: () => get('/roadmap/by_horizon/') },
  };
})();
EOF

# ── UI JS ────────────────────────────────────────────────────
cat > $PROJECT/assets/js/ui.js << 'EOF'
const UI = {
  topbar(active) {
    const nav=[['index','~'],['skills','Skills'],['projects','Projects'],['walkthroughs','Walkthroughs'],['labs','Labs'],['journal','Journal'],['roadmap','Roadmap']];
    return `<div class="grid-bg"></div><nav class="topbar"><span class="topbar-brand">▸ PORTFOLIO.SYS</span><div class="topbar-nav">${nav.map(([p,l])=>`<a href="${p}.html" class="${active===p?'active':''}">${l.toUpperCase()}</a>`).join('')}</div><div class="topbar-status">LIVE</div></nav>`;
  },
  footer() {
    return `<footer class="footer"><span>© ${new Date().getFullYear()} — portfolio.sys</span><div class="footer-right"><span id="footer-clock"></span><span>v0.1.0</span></div></footer>`;
  },
  sectionHeader(icon,title,sub='') {
    return `<div class="section-header"><span class="section-icon">${icon}</span><span class="section-title">${title}</span>${sub?`<span class="section-sub">// ${sub}</span>`:''}</div>`;
  },
  tags(arr,color='') {
    if(!arr?.length) return '';
    return arr.map(t=>`<span class="tag ${color?'tag-'+color:''}">${t}</span>`).join(' ');
  },
  statusDot(status) {
    const map={operational:'green',active:'green',done:'green',published:'green',degraded:'yellow',in_progress:'yellow',draft:'yellow',down:'red',planned:'gray',future:'gray',archived:'gray'};
    return `<span class="dot dot-${map[status]||'gray'}"></span>`;
  },
  progressBar(name,level,barClass='bar-green',pctColor='--green') {
    return `<div class="progress-wrap"><div class="progress-header"><span class="progress-name">${name}</span><span class="progress-pct" style="color:var(${pctColor})">${level}%</span></div><div class="progress-track"><div class="progress-bar ${barClass}" style="width:${level}%"></div></div></div>`;
  },
  empty(msg='Aucun contenu') { return `<div class="empty">${msg}</div>`; },
  error(msg='Erreur de connexion à l\'API') {
    return `<div class="panel" style="border-color:#f8717144;text-align:center;padding:40px"><div style="font-family:var(--font-mono);color:var(--red);margin-bottom:8px">× API_ERROR</div><div style="color:var(--muted);font-size:13px">${msg}</div><div style="color:var(--muted);font-size:11px;margin-top:8px">Vérifie que le backend tourne sur <code>localhost:8000</code></div></div>`;
  },
  startClock() {
    const el=document.getElementById('footer-clock');
    if(!el) return;
    const tick=()=>{ el.textContent=new Date().toUTCString().slice(17,25)+' UTC'; };
    tick(); setInterval(tick,1000);
  },
};
EOF

echo ""
echo "======================================"
echo "  Frontend créé dans ./$PROJECT/"
echo "======================================"
echo ""
echo "  Pour lancer :"
echo "  cd $PROJECT"
echo "  python3 -m http.server 3000"
echo "  → http://localhost:3000"
echo ""
