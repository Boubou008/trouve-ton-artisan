// src/pages/Category.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ArtisanCard from "../components/ArtisanCard";
import { getCategories, getArtisans } from "../services/api";

function Category() {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [artisans, setArtisans] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Charger la catégorie (nom) depuis l’API
  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const cats = await getCategories(); // GET /api/categories
        const found = cats.find((c) => c.slug === slug);
        if (!found) {
          if (alive) {
            setError("Catégorie introuvable.");
            setCategory(null);
          }
        } else if (alive) {
          setCategory(found);
          setError("");
        }
      } catch (e) {
        console.error("Erreur chargement catégories :", e);
        if (alive) setError("Erreur lors du chargement des catégories.");
      }
    })();

    return () => {
      alive = false;
    };
  }, [slug]);

  // Charger les artisans de cette catégorie + filtre de recherche
  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        const data = await getArtisans({
          categorySlug: slug,
          q: query,
        }); // GET /api/artisans?category=slug&q=...
        if (alive) {
          setArtisans(data);
        }
      } catch (e) {
        console.error("Erreur chargement artisans catégorie :", e);
        if (alive) setError("Erreur lors du chargement des artisans.");
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [slug, query]);

  if (error && !category && !loading) {
    return <p>{error}</p>;
  }

  return (
    <section className="container py-4">
      <h1 className="mb-4">
        Catégorie : {category ? category.name : "Chargement…"}
      </h1>

      {/* Barre de recherche dans la catégorie */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Rechercher un artisan dans cette catégorie…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {loading && <p>Chargement…</p>}

      <div className="row">
        {!loading && artisans.length === 0 && !error && (
          <p>Aucun artisan trouvé dans cette catégorie.</p>
        )}

        {artisans.map((artisan) => (
          <div className="col-md-4 mb-3" key={artisan.id}>
            <ArtisanCard artisan={artisan} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Category;
