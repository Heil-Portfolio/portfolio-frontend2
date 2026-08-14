// ui.js — Composants réutilisables du nouveau design system

const UI = {

  SITE_URL: window.location.origin,

  // ── TOPBAR ─────────────────────────────────────────────
  topbar(activePage) {
    const nav = [
      ['index.html',        'home'],
      ['about.html',        'about'],
      ['walkthroughs.html', 'walkthroughs'],
      ['notes.html',        'notes'],
    ];
    return `
      <div class="grid-bg"></div>
      <header class="topbar">
        <a href="index.html" class="brand"><span class="brand-dot"></span>heil@devsecops:~$</a>
        <nav class="nav">
          ${nav.map(([href, label]) => `
            <a href="${href}" class="${activePage === href ? 'active' : ''}">${label}</a>
          `).join('')}
        </nav>
      </header>
    `;
  },

  // ── PIPELINE — le fil conducteur du site ────────────────
  // stage courant : 'origin' | 'profile' | 'build' | 'log'
  pipeline(currentStage) {
    const stages = [
      ['origin',  'Origin',  'index.html'],
      ['profile', 'Profile', 'about.html'],
      ['build',   'Build',   'walkthroughs.html'],
      ['log',     'Log',     'notes.html'],
    ];
    const order = stages.map(s => s[0]);
    const currentIdx = order.indexOf(currentStage);

    const stageHtml = (key, label, href, idx) => {
      const state = idx < currentIdx ? 'done' : idx === currentIdx ? 'current' : '';
      return `
        <a href="${href}" class="stage ${state} stage-link">
          <div class="stage-node"></div>
          <div class="stage-label">${label}</div>
        </a>`;
    };
    const connector = (idx) => {
      const done = idx < currentIdx;
      return `<div class="connector ${done ? 'done' : ''}"></div>`;
    };

    let track = '';
    stages.forEach(([key, label, href], idx) => {
      track += stageHtml(key, label, href, idx);
      if (idx < stages.length - 1) track += connector(idx);
    });

    return `
      <nav class="pipeline" aria-label="Progression du site">
        <div class="pipeline-track">${track}</div>
      </nav>
    `;
  },

  // ── NARRATIVE THREAD CARD — lien vers la page suivante ──
  threadCard(eyebrow, title, sub, href, direction = 'forward') {
    const arrow = direction === 'forward' ? '→' : '←';
    const cls = direction === 'forward' ? '' : 'back';
    return `
      <a href="${href}" class="thread-card">
        <div class="thread-text ${cls}">
          <div class="eyebrow">${arrow} ${eyebrow}</div>
          <div class="title">${title}</div>
          ${sub ? `<div class="sub">${sub}</div>` : ''}
        </div>
        <div class="thread-arrow">${arrow}</div>
      </a>
    `;
  },

  thread(cards) {
    return `<div class="thread">${cards.join('')}</div>`;
  },

  // ── FOOTER ─────────────────────────────────────────────
  footer() {
    return `
      <footer class="footer">
        <span>heil tchamba nana — yaoundé, cameroun</span>
        <div class="footer-links">
          <a href="https://github.com/DREAMHOUSE-237" target="_blank">github</a>
          <a href="mailto:htchamba124@gmail.com">contact</a>
          <a href="assets/cv.pdf" target="_blank">cv ↓</a>
        </div>
      </footer>
    `;
  },

  // ── WALKTHROUGH CARD (listing) ──────────────────────────
  walkthroughCard(w) {
    const tags = (w.tags || []).slice(0, 2)
      .map(t => `<span class="badge infra">${t}</span>`).join('');
    const date = w.published_at
      ? new Date(w.published_at).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })
      : '';
    return `
      <a href="walkthroughs/${w.slug}" class="card">
        <div class="card-top">
          ${tags}
          <span class="card-date">${date}</span>
        </div>
        <h3>${w.title}</h3>
        <p>${w.objective || ''}</p>
        <div class="card-foot">
          <span>${w.reading_time || 0} min de lecture</span>
          <span class="read">lire →</span>
        </div>
      </a>
    `;
  },

  // ── NOTE / LOG ENTRY (listing) ──────────────────────────
  noteEntry(n) {
    const d = new Date(n.entry_date);
    const day = d.toLocaleDateString('fr-FR', { day: '2-digit' });
    const month = d.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' });
    const tags = (n.tags || []).map(t => `<span class="log-tag">${t}</span>`).join('');
    return `
      <a href="notes/${n.slug}" style="display:block;color:inherit">
        <div class="log-entry">
          <div class="log-date"><span class="day">${day}</span>${month}</div>
          <div class="log-body">
            <h3>${n.title}</h3>
            <div class="log-tags">${tags}</div>
          </div>
        </div>
      </a>
    `;
  },

  // ── SKELETON ───────────────────────────────────────────
  skeleton(lines = 3) {
    return `<div class="card-list">${Array.from({length: lines}, () =>
      `<div class="card" style="opacity:.4">
         <div style="height:12px;width:40%;background:var(--line);border-radius:4px;margin-bottom:14px"></div>
         <div style="height:18px;width:70%;background:var(--line);border-radius:4px;margin-bottom:10px"></div>
         <div style="height:12px;width:90%;background:var(--line);border-radius:4px"></div>
       </div>`
    ).join('')}</div>`;
  },

  // ── EMPTY / ERROR STATES ─────────────────────────────────
  empty(msg = 'Rien à afficher pour l\'instant.') {
    return `<div class="empty-state">${msg}</div>`;
  },

  error(msg = 'Impossible de contacter le serveur.') {
    return `
      <div class="error-state">
        <div style="color:var(--pulse);margin-bottom:8px">connexion échouée</div>
        <div>${msg}</div>
      </div>
    `;
  },

  // ── MOUNT HELPERS ────────────────────────────────────────
  mountChrome(activePage, pipelineStage) {
    const topbarEl = document.getElementById('ui-topbar');
    const pipelineEl = document.getElementById('ui-pipeline');
    const footerEl = document.getElementById('ui-footer');
    if (topbarEl) topbarEl.outerHTML = UI.topbar(activePage);
    if (pipelineEl) pipelineEl.outerHTML = UI.pipeline(pipelineStage);
    if (footerEl) footerEl.outerHTML = UI.footer();
  },
};
