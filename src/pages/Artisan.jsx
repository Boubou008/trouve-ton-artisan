import { useParams } from "react-router-dom";
import artisans from "../data/artisans.json";

function Artisan() {
  const { slug } = useParams();
  const artisan = artisans.find((a) => a.slug === slug);

  if (!artisan) {
    return <p>Artisan introuvable.</p>;
  }

  return (
    <section>
      <h1>{artisan.name}</h1>
      <p><strong>Spécialité :</strong> {artisan.speciality_name}</p>
      <p><strong>Ville :</strong> {artisan.city}</p>
      <p><strong>Note :</strong> {artisan.rating} ★</p>
      <p>{artisan.about}</p>

      {artisan.website_url && (
        <p>
          <a
            href={artisan.website_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Visiter le site web
          </a>
        </p>
      )}

      <hr />
      <h2>Contacter cet artisan</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>Nom</label>
        <input type="text" className="form-control" required />

        <label>Email</label>
        <input type="email" className="form-control" required />

        <label>Objet</label>
        <input type="text" className="form-control" required />

        <label>Message</label>
        <textarea className="form-control" rows="4" required></textarea>

        <button type="submit" className="btn btn-primary mt-3">
          Envoyer
        </button>
      </form>
    </section>
  );
}

export default Artisan;
