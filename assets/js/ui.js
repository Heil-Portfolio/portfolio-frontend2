// ui.js — Composants réutilisables du nouveau design system

const UI = {

  SITE_URL: window.location.origin,

  // ── TOPBAR ─────────────────────────────────────────────
  topbar(activePage) {
    const nav = [
      ['index.html',        'home'],
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
  // stage courant : 'origin' | 'build' | 'log'
  pipeline(currentStage) {
    const stages = [
      ['origin', 'Origin', 'index.html'],
      ['build',  'Build',  'walkthroughs.html'],
      ['log',    'Log',    'notes.html'],
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

  // ── SOCIAL ROW — réutilisé dans le hero et le footer ────
  socialRow(size = 18) {
    const icons = {
      github: `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18.92-.26 1.91-.39 2.89-.39.98 0 1.97.13 2.89.39 2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.69 5.4-5.25 5.68.41.36.78 1.06.78 2.15 0 1.55-.01 2.8-.01 3.18 0 .3.21.66.79.55A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"/></svg>`,
      linkedin: `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z"/></svg>`,
      cv: `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v12m0 0-4-4m4 4 4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg>`,
      mail: `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16v16H4z"/><path d="m4 6 8 7 8-7"/></svg>`,
    };
    return `
      <div class="social-row">
        <a href="https://github.com/HEIL-TCHAMBA-NANA" target="_blank" rel="noopener" class="social-link social-github">${icons.github}<span>GitHub</span></a>
        <a href="https://www.linkedin.com/in/heil-tchamba-866111284" target="_blank" rel="noopener" class="social-link social-linkedin">${icons.linkedin}<span>LinkedIn</span></a>
        <a href="assets/cv.pdf" target="_blank" rel="noopener" class="social-link social-cv">${icons.cv}<span>CV</span></a>
        <a href="mailto:htchamba124@gmail.com" class="social-link social-mail">${icons.mail}<span>Contact</span></a>
      </div>
    `;
  },

  // ── FOOTER ─────────────────────────────────────────────
  footer() {
    return `
      <footer class="footer">
        <span>heil tchamba nana — yaoundé, cameroun</span>
        ${UI.socialRow(16)}
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

  // ── STACK STATUS WIDGET — dérivé automatiquement des tags publiés ──
  stackWidget(data) {
    const row = (item, kind) => `
      <div class="stack-row">
        <span class="stack-dot ${kind}"></span>
        <span class="stack-service">${item.service}</span>
        <span class="stack-status-text ${kind}">${item.status}</span>
        ${item.count ? `<span class="stack-evidence">— ${item.count} ${item.unit}${item.count > 1 ? 's' : ''}</span>` : ''}
      </div>`;

    const rows = [
      ...(data.active || []).map(i => row(i, 'mastered')),
      ...(data.learning || []).map(i => row(i, 'learning')),
      ...(data.queued || []).map(i => row(i, 'queued')),
    ].join('');

    return `
      <div class="stack-widget">
        <div class="stack-cmd"><span class="prompt">$</span> systemctl status stack</div>
        ${rows}
      </div>
    `;
  },

  // ── SECTIONS DYNAMIQUES — regroupement par synonymes, ordre curriculum ──
  // curriculum = [{key, label, synonyms:[...]}]. Un item peut apparaître
  // dans plusieurs sections s'il a des tags pertinents pour plusieurs
  // sujets. À l'intérieur d'une section, sous-groupé par tag précis.
  groupBySections(items, curriculum) {
    const groups = curriculum.map(c => ({
      key: c.key, label: c.label, synonyms: c.synonyms, items: [], subgroups: {}
    }));
    const others = [];

    items.forEach(item => {
      const tags = (item.tags || []).map(t => t.toLowerCase());
      let matched = false;
      groups.forEach(g => {
        const hit = g.synonyms.find(s => tags.includes(s));
        if (hit) {
          matched = true;
          g.items.push(item);
          const subKey = hit.charAt(0).toUpperCase() + hit.slice(1);
          (g.subgroups[subKey] = g.subgroups[subKey] || []).push(item);
        }
      });
      if (!matched) others.push(item);
    });

    const nonEmpty = groups.filter(g => g.items.length > 0);
    if (others.length) nonEmpty.push({ key: 'autres', label: 'Autres', items: others, subgroups: null });
    return nonEmpty;
  },

  sectionsHtml(groups, renderItem, gridClass = 'section-grid') {
    if (!groups.length) return UI.empty();
    return groups.map((g, i) => {
      // Sous-groupes seulement si plus d'un tag précis distinct dans la section
      const subKeys = g.subgroups ? Object.keys(g.subgroups) : [];
      const useSub = subKeys.length > 1;

      const body = useSub
        ? subKeys.map(sk => `
            <div class="subgroup-label">${sk} <span class="subgroup-count">${g.subgroups[sk].length}</span></div>
            <div class="${gridClass}" style="margin-bottom:20px">
              ${g.subgroups[sk].map(renderItem).join('')}
            </div>
          `).join('')
        : `<div class="${gridClass}">${g.items.map(renderItem).join('')}</div>`;

      return `
        <details class="section-group" ${i === 0 ? 'open' : ''}>
          <summary class="section-summary">
            <span class="section-caret">▾</span>
            <span class="section-title">${g.label}</span>
            <span class="section-count">${g.items.length}</span>
          </summary>
          <div style="margin-top:16px">${body}</div>
        </details>
      `;
    }).join('');
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
