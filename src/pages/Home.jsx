import { useState, useMemo } from "react";
import artisans from "../data/artisans.json";
import { Link } from "react-router-dom";
import Stars from "../components/Stars";


function Home() {
  const [query, setQuery] = useState("");

  // 🔎 Recherche globale (nom + spécialité + ville)
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return artisans.filter((a) =>
      (a.name + " " + a.speciality_name + " " + a.city).toLowerCase().includes(q)
    );
  }, [query]);

  // ⭐ Top 3 via is_featured + featured_rank
  const topArtisans = useMemo(() => {
    return artisans
      .filter((a) => a.is_featured)
      .sort((a, b) => (a.featured_rank ?? 99) - (b.featured_rank ?? 99))
      .slice(0, 3);
  }, []);

  return (
    <section className="container py-5">
      <h1 className="text-center mb-4">Trouve ton artisan</h1>

      {/* Barre de recherche */}
      <div className="mb-4 text-center">
        <input
          type="text"
          className="form-control form-control-lg w-75 mx-auto"
          placeholder="Rechercher un artisan (nom, spécialité ou ville)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Résultats si recherche en cours */}
      {query.trim() ? (
        results.length ? (
          <div className="row g-3">
            {results.map((a) => (
              <div key={a.id} className="col-md-4">
                <div className="card h-100 p-3">
                  <h5 className="card-title">{a.name}</h5>
                  <p className="card-text mb-1"><strong>Spécialité :</strong> {a.speciality_name}</p>
                  <p className="card-text mb-1"><strong>Ville :</strong> {a.city}</p>
                  <p className="card-text"><Stars rating={a.rating} /></p>

                  <Link to={`/artisan/${a.slug}`} className="btn btn-primary mt-auto">
                    Voir le profil
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center mt-3">Aucun artisan trouvé.</p>
        )
      ) : (
        <>
          {/* Top 3 quand pas de recherche */}
          <h2 className="text-center mb-3">Nos artisans du moment</h2>
          <div className="row g-3">
            {topArtisans.map((a) => (
              <div key={a.id} className="col-md-4">
                <div className="card h-100 p-3">
                  <h5 className="card-title">{a.name}</h5>
                  <p className="card-text mb-1"><strong>Spécialité :</strong> {a.speciality_name}</p>
                  <p className="card-text mb-1"><strong>Ville :</strong> {a.city}</p>
                  <p className="card-text"><Stars rating={a.rating} /></p>
                  <Link to={`/artisan/${a.slug}`} className="btn btn-primary mt-auto">
                    Voir le profil
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default Home;
