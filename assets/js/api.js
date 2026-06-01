// api.js — Toutes les calls vers le backend Django
// Modifier BASE_URL selon ton environnement

const API = (() => {
  /*const BASE_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:8000/api'
    : 'https://your-app.onrender.com/api'; // ← remplacer en prod*/
    const BASE_URL = 'http://localhost:8000/api';

  async function get(endpoint) {
    const res = await fetch(`${BASE_URL}${endpoint}`);
    if (!res.ok) throw new Error(`API error ${res.status}: ${endpoint}`);
    return res.json();
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
  };
})();
