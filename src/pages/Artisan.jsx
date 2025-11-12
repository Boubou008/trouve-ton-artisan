import { useParams } from "react-router-dom";
import artisans from "../data/artisans.json";

function Artisan() {
  const { slug } = useParams();
  const artisan = artisans.find(a => a.slug === slug);

  if (!artisan) return <p>Artisan introuvable.</p>;

  function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    console.log("Message envoyé (mock) :", { to: artisan.email || "(non fourni)", ...payload });
    alert("Votre message a été préparé (simulation). L’API sera branchée plus tard.");
    e.currentTarget.reset();
  }

  return (
    <section>
      <h1 className="mb-3">{artisan.name}</h1>
      <p><strong>Spécialité :</strong> {artisan.speciality_name}</p>
      <p><strong>Ville :</strong> {artisan.city}</p>
      <p><strong>Note :</strong> {artisan.rating} ★</p>
      <p className="mb-4">{artisan.about}</p>

      {artisan.website_url && (
        <p>
          <a href={artisan.website_url} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary">
            Visiter le site web
          </a>
        </p>
      )}

      <hr className="my-4" />
      <h2 className="mb-3">Contacter cet artisan</h2>
      <form onSubmit={handleSubmit}>
        <label className="form-label">Nom</label>
        <input name="name" type="text" className="form-control" required />

        <label className="form-label mt-3">Email</label>
        <input name="email" type="email" className="form-control" required />

        <label className="form-label mt-3">Objet</label>
        <input name="subject" type="text" className="form-control" required />

        <label className="form-label mt-3">Message</label>
        <textarea name="message" className="form-control" rows="4" required></textarea>

        <button type="submit" className="btn btn-primary mt-3">Envoyer</button>
      </form>
    </section>
  );
}

export default Artisan;
