// api.js — Toutes les calls vers le backend Django
// Modifier BASE_URL selon ton environnement

const API = (() => {
  // En prod, chemin relatif : Vercel proxifie /backend/* vers Render côté
  // serveur (voir vercel.json) pour que le navigateur du visiteur ne contacte
  // jamais directement onrender.com — certains FAI bloquent ce domaine côté
  // réseau. Le préfixe évite tout mot "api" dans le chemin : /api/* est
  // réservé par Vercel (Serverless Functions), et /backend-api/* échouait
  // aussi — Vercel semble aussi réserver "api" comme mot isolé (séparé par
  // un tiret), pas seulement comme préfixe exact /api/.
  const BASE_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:8000/api'
    : '/backend';

  // Cache résilient : si le backend (Render) est endormi ou en panne, on sert
  // la dernière réponse connue plutôt que de bloquer/casser l'affichage.
  const CACHE_PREFIX = 'api_cache:';
  const STALE_TIMEOUT_MS = 5000;
  const MAX_CACHE_AGE_MS = 30 * 24 * 60 * 60 * 1000; // 30 jours

  function cacheGet(endpoint) {
    try {
      const raw = localStorage.getItem(CACHE_PREFIX + endpoint);
      if (!raw) return null;
      const entry = JSON.parse(raw);
      if (Date.now() - entry.ts > MAX_CACHE_AGE_MS) return null;
      return entry;
    } catch {
      return null;
    }
  }

  function cacheSet(endpoint, data) {
    try {
      localStorage.setItem(CACHE_PREFIX + endpoint, JSON.stringify({ data, ts: Date.now() }));
    } catch {
      // storage indisponible (navigation privée, quota...) : on continue sans cache
    }
  }

  async function fetchFresh(endpoint) {
    const res = await fetch(`${BASE_URL}${endpoint}`);
    if (!res.ok) throw new Error(`API error ${res.status}: ${endpoint}`);
    const data = await res.json();
    // DRF pagine les listes ({count, next, previous, results}) : on déballe results
    const unwrapped = (data && typeof data === 'object' && !Array.isArray(data) && Array.isArray(data.results))
      ? data.results
      : data;
    cacheSet(endpoint, unwrapped);
    return unwrapped;
  }

  async function get(endpoint) {
    const cached = cacheGet(endpoint);

    if (!cached) {
      // Pas de filet : on attend le réseau normalement (erreur propagée si ça échoue).
      return fetchFresh(endpoint);
    }

    // On a un filet : ne jamais faire attendre l'utilisateur plus de STALE_TIMEOUT_MS,
    // et retomber sur le cache aussi bien en cas de lenteur que d'échec réseau immédiat.
    // Si le réseau finit par répondre après coup, le cache est mis à jour en tâche de
    // fond pour la prochaine visite — pas de re-render forcé ici.
    return new Promise(resolve => {
      let settled = false;
      const timer = setTimeout(() => {
        if (!settled) {
          settled = true;
          console.warn(`[API] ${endpoint} : pas de réponse sous ${STALE_TIMEOUT_MS}ms, contenu en cache servi (du ${new Date(cached.ts).toLocaleString('fr-FR')}). La requête continue en tâche de fond.`);
          resolve(cached.data);
        }
      }, STALE_TIMEOUT_MS);

      fetchFresh(endpoint).then(data => {
        if (!settled) { settled = true; clearTimeout(timer); resolve(data); }
      }).catch(err => {
        if (!settled) {
          settled = true;
          clearTimeout(timer);
          console.warn(`[API] ${endpoint} : échec réseau, contenu en cache servi (du ${new Date(cached.ts).toLocaleString('fr-FR')}).`, err);
          resolve(cached.data);
        } else {
          // Le fallback avait déjà été servi via le timeout ; on log quand même
          // l'échec du refresh en tâche de fond pour qu'il reste visible en debug.
          console.warn(`[API] ${endpoint} : le rafraîchissement en tâche de fond a aussi échoué, cache inchangé.`, err);
        }
      });
    });
  }

  return {
    skills: {
      all: ()            => get('/skills/'),
      byCategory: ()     => get('/skills/by_category/'),
    },
    projects: {
      all: (status = '') => get('/projects/' + (status ? `?status=${status}` : '')),
      one: (slug)        => get(`/projects/${slug}/`),
    },
    walkthroughs: {
      all: (status = '') => get('/walkthroughs/' + (status ? `?status=${status}` : '')),
      one: (slug)        => get(`/walkthroughs/${slug}/`),
    },
    labs: {
      all: (status = '') => get('/labs/' + (status ? `?status=${status}` : '')),
    },
    journal: {
      all: ()            => get('/journal/'),
      one: (slug)        => get(`/journal/${slug}/`),
    },
    roadmap: {
      byHorizon: ()      => get('/roadmap/by_horizon/'),
    },
    stack: {
      status: ()         => get('/stack/'),
    },
    curriculum: {
      order: ()          => get('/curriculum/'),
    },
  };
})();
