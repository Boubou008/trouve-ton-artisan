import { Router } from "express";
import { artisans, categories, specialities } from "../db.js";

const router = Router();

/**
 * GET /api/artisans
 * Query :
 *   - category (slug de catégorie)
 *   - q (texte recherche)
 */
router.get("/", (req, res) => {
  const { category, q } = req.query;

  let list = [...artisans];

  // filtre catégorie : slug de catégorie (alimentation, batiment…)
  if (category) {
    const cat = categories.find((c) => c.slug === category);
    if (cat) {
      const specNames = specialities
        .filter((s) => s.category_id === cat.id)
        .map((s) => s.name);
      list = list.filter((a) => specNames.includes(a.speciality_name));
    } else {
      list = [];
    }
  }

  // filtre texte
  if (q && q.trim()) {
    const search = q.toLowerCase();
    list = list.filter((a) =>
      (a.name + " " + a.speciality_name + " " + a.city)
        .toLowerCase()
        .includes(search)
    );
  }

  res.json(list);
});

/**
 * GET /api/artisans/:slug
 */
router.get("/:slug", (req, res) => {
  const { slug } = req.params;
  const artisan = artisans.find((a) => a.slug === slug);
  if (!artisan) return res.status(404).json({ error: "NOT_FOUND" });
  res.json(artisan);
});

export default router;
