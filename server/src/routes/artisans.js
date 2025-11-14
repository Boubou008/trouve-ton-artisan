// server/src/routes/artisans.js
import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

/**
 * GET /api/artisans
 * Query (optionnels) :
 *   - category : slug de la catégorie (alimentation, batiment, services, fabrication…)
 *   - q        : recherche texte (nom, ville, spécialité)
 */
router.get("/", async (req, res) => {
  const { category, q } = req.query;

  // base de la requête
  let sql = `
    SELECT 
      a.id,
      a.name,
      a.slug,
      a.city,
      a.rating,
      a.about,
      a.email,
      a.website_url,
      a.is_featured,
      a.featured_rank,
      sp.name AS speciality_name,
      c.name AS category_name,
      c.slug AS category_slug
    FROM artisans a
    JOIN specialities sp ON sp.id = a.speciality_id
    JOIN categories c ON c.id = sp.category_id
    WHERE 1=1
  `;
  const params = [];

  // filtre catégorie si fourni
  if (category) {
    sql += " AND c.slug = ? ";
    params.push(category);
  }

  // filtre texte si fourni
  if (q && q.trim()) {
    sql += " AND (a.name LIKE ? OR a.city LIKE ? OR sp.name LIKE ?) ";
    const like = `%${q.trim()}%`;
    params.push(like, like, like);
  }

  // tri par nom
  sql += " ORDER BY a.name ASC";

  try {
    const [rows] = await pool.query(sql, params);
    res.json(rows);
  } catch (err) {
    console.error("ERREUR /api/artisans :", err);
    res.status(500).json({ error: "DB_ERROR" });
  }
});

/**
 * GET /api/artisans/:slug
 */
router.get("/:slug", async (req, res) => {
  const { slug } = req.params;

  const sql = `
    SELECT 
      a.id,
      a.name,
      a.slug,
      a.city,
      a.rating,
      a.about,
      a.email,
      a.website_url,
      a.is_featured,
      a.featured_rank,
      sp.name AS speciality_name,
      sp.slug AS speciality_slug,
      c.name AS category_name,
      c.slug AS category_slug
    FROM artisans a
    JOIN specialities sp ON sp.id = a.speciality_id
    JOIN categories c ON c.id = sp.category_id
    WHERE a.slug = ?
    LIMIT 1
  `;

  try {
    const [rows] = await pool.query(sql, [slug]);
    if (!rows.length) {
      return res.status(404).json({ error: "NOT_FOUND" });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error("ERREUR /api/artisans/:slug :", err);
    res.status(500).json({ error: "DB_ERROR" });
  }
});

export default router;
