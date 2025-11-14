// src/services/api.js

// On utilise un chemin relatif : le proxy Vite /api s'occupe du reste
const API_BASE = "/api";

async function getJSON(path) {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) {
    throw new Error(`Erreur API GET ${path} : ${res.status}`);
  }
  return res.json();
}

async function postJSON(path, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`Erreur API POST ${path} : ${res.status}`);
  }
  return res.json();
}

// 🔹 catégories
export async function getCategories() {
  return getJSON(`/categories`);
}

// 🔹 liste artisans (optionnellement filtrée)
export async function getArtisans({ categorySlug, q = "" } = {}) {
  const params = new URLSearchParams();
  if (categorySlug) params.set("category", categorySlug);
  if (q.trim()) params.set("q", q.trim());
  const qs = params.toString();
  const path = qs ? `/artisans?${qs}` : `/artisans`;
  return getJSON(path);
}

// 🔹 un artisan
export async function getArtisanBySlug(slug) {
  return getJSON(`/artisans/${slug}`);
}

// 🔹 contact
export async function postContact({ artisanSlug, name, email, subject, message }) {
  return postJSON(`/contact`, {
    artisanSlug,
    name,
    email,
    subject,
    message,
  });
}
