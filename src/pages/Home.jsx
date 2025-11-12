import artisans from "../data/artisans.json";
import ArtisanCard from "../components/ArtisanCard";

function Home() {
  const featured = artisans
    .filter(a => a.is_featured)
    .sort((a, b) => (a.featured_rank ?? 99) - (b.featured_rank ?? 99))
    .slice(0, 3);

  return (
    <section>
      <h1 className="text-center mb-4">Trouve ton artisan</h1>

      <div className="mb-5">
        <h2>Comment trouver mon artisan ?</h2>
        <ol>
          <li>Choisis une catégorie dans le menu.</li>
          <li>Parcours la liste et filtre par nom.</li>
          <li>Ouvre une fiche artisan.</li>
          <li>Envoie le formulaire de contact.</li>
        </ol>
      </div>

      <h2 className="mb-3">Les artisans du mois</h2>
      <div className="row">
        {featured.map(a => (
          <div className="col-md-4" key={a.id}>
            <ArtisanCard artisan={a} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Home;
