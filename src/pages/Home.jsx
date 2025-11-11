import artisans from "../data/artisans.json";
import ArtisanCard from "../components/ArtisanCard";

function Home() {
  const featured = artisans
    .filter((a) => a.is_featured)
    .sort((a, b) => a.featured_rank - b.featured_rank);

  return (
    <section>
      <h1 className="text-center mb-4">Trouve ton artisan !</h1>

      <div className="mb-5">
        <h2>Comment trouver mon artisan ?</h2>
        <ol>
          <li>Choisir la catégorie d’artisan dans le menu.</li>
          <li>Choisir un artisan.</li>
          <li>Le contacter via le formulaire.</li>
          <li>Recevoir une réponse sous 48h.</li>
        </ol>
      </div>

      <h2>Les artisans du mois</h2>
      <div className="row">
        {featured.map((a) => (
          <div className="col-md-4" key={a.id}>
            <ArtisanCard artisan={a} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Home;
