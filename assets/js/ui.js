// ui.js — Composants réutilisables

const UI = {

  // ── TOPBAR ─────────────────────────────────────────────
  topbar(activePage) {
    const nav = [
      ['index',        '~'],
      ['skills',       'Skills'],
      ['projects',     'Projects'],
      ['walkthroughs', 'Walkthroughs'],
      ['labs',         'Labs'],
      ['journal',      'Journal'],
      ['roadmap',      'Roadmap'],
    ];
    return `
      <div class="grid-bg"></div>
      <nav class="topbar">
        <span class="topbar-brand">▸ PORTFOLIO.SYS</span>
        <div class="topbar-nav">
          ${nav.map(([page, label]) => `
            <a href="${page}.html" class="${activePage === page ? 'active' : ''}">
              ${label.toUpperCase()}
            </a>
          `).join('')}
        </div>
        <div class="topbar-status">LIVE</div>
      </nav>
    `;
  },

  // ── FOOTER ─────────────────────────────────────────────
  footer() {
    const now = new Date();
    return `
      <footer class="footer">
        <span>© ${now.getFullYear()} — portfolio.sys</span>
        <div class="footer-right">
          <span id="footer-clock"></span>
          <span>v0.1.0</span>
        </div>
      </footer>
    `;
  },

  // ── SECTION HEADER ─────────────────────────────────────
  sectionHeader(icon, title, sub = '') {
    return `
      <div class="section-header">
        <span class="section-icon">${icon}</span>
        <span class="section-title">${title}</span>
        ${sub ? `<span class="section-sub">// ${sub}</span>` : ''}
      </div>
    `;
  },

  // ── TAGS ───────────────────────────────────────────────
  tags(arr, color = '') {
    if (!arr?.length) return '';
    return arr.map(t => `<span class="tag ${color ? 'tag-' + color : ''}">${t}</span>`).join(' ');
  },

  // ── STATUS DOT ─────────────────────────────────────────
  statusDot(status) {
    const map = {
      operational: 'green', active: 'green', done: 'green', published: 'green',
      degraded: 'yellow', in_progress: 'yellow', draft: 'yellow',
      down: 'red',
      planned: 'gray', future: 'gray', archived: 'gray', completed: 'blue',
    };
    return `<span class="dot dot-${map[status] || 'gray'}"></span>`;
  },

  // ── PROGRESS BAR ───────────────────────────────────────
  progressBar(name, level, barClass = 'bar-green', pctColor = '--green') {
    return `
      <div class="progress-wrap">
        <div class="progress-header">
          <span class="progress-name">${name}</span>
          <span class="progress-pct" style="color:var(${pctColor})">${level}%</span>
        </div>
        <div class="progress-track">
          <div class="progress-bar ${barClass}" style="width:${level}%"></div>
        </div>
      </div>
    `;
  },

  // ── SKELETON ───────────────────────────────────────────
  skeleton(lines = 4) {
    return Array.from({length: lines}, (_, i) =>
      `<div class="skeleton" style="height:14px;margin-bottom:10px;width:${60 + Math.random()*40}%"></div>`
    ).join('');
  },

  // ── EMPTY STATE ────────────────────────────────────────
  empty(msg = 'Aucun contenu pour l\'instant') {
    return `<div class="empty">${msg}</div>`;
  },

  // ── ERROR STATE ────────────────────────────────────────
  error(msg = 'Erreur de connexion à l\'API') {
    return `
      <div class="panel" style="border-color:#f8717144;text-align:center;padding:40px">
        <div style="font-family:var(--font-mono);color:var(--red);margin-bottom:8px">× API_ERROR</div>
        <div style="color:var(--muted);font-size:13px">${msg}</div>
        <div style="color:var(--muted);font-size:11px;margin-top:8px">
          Vérifie que le backend tourne sur <code>localhost:8000</code>
        </div>
      </div>
    `;
  },

  // ── CLOCK ──────────────────────────────────────────────
  startClock() {
    const el = document.getElementById('footer-clock');
    if (!el) return;
    const tick = () => {
      el.textContent = new Date().toUTCString().slice(17, 25) + ' UTC';
    };
    tick();
    setInterval(tick, 1000);
  },
};
