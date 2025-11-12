import { useParams } from "react-router-dom";
import artisans from "../data/artisans.json";

const images = {
  Boucher: "/src/assets/images/specialities/boucher.jpg",
  Boulanger: "/src/assets/images/specialities/boulanger.jpg",
  Chocolatier: "/src/assets/images/specialities/chocolatier.jpg",
  Traiteur: "/src/assets/images/specialities/traiteur.jpg",
  Chauffagiste: "/src/assets/images/specialities/chauffagiste.jpg",
  Electricien: "/src/assets/images/specialities/electricien.jpg",
  Menuisier: "/src/assets/images/specialities/menuisier.jpg",
  Plombier: "/src/assets/images/specialities/plombier.jpg",
  Bijoutier: "/src/assets/images/specialities/bijoutier.jpg",
  Couturier: "/src/assets/images/specialities/couturier.jpg",
  Ferronier: "/src/assets/images/specialities/ferronier.jpg",
  Coiffeur: "/src/assets/images/specialities/coiffeur.jpg",
  Fleuriste: "/src/assets/images/specialities/fleuriste.jpg",
  Toiletteur: "/src/assets/images/specialities/toiletteur.jpg",
  Webdesign: "/src/assets/images/specialities/webdesign.jpg",
};


function Artisan() {
  const { slug } = useParams();
  const artisan = artisans.find((a) => a.slug === slug);

  if (!artisan) return <p>Artisan introuvable.</p>;

  // ⚙️ on garde la variable pour le bouton
  const siteUrl = artisan.website_url?.trim();

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
      
      {images[artisan.speciality_name] && (
  <img
    src={images[artisan.speciality_name]}
    alt={artisan.speciality_name}
    className="img-fluid rounded mb-4"
    style={{ maxHeight: "350px", objectFit: "cover", width: "100%" }}
  />
)}
      <p><strong>Spécialité :</strong> {artisan.speciality_name}</p>
      <p><strong>Ville :</strong> {artisan.city}</p>
      <p><strong>Note :</strong> {artisan.rating} ★</p>
      <p className="mb-4">{artisan.about}</p>

      {/* ✅ le bouton reste visible mais ne fait rien si l’URL est vide */}
      <p>
        {siteUrl ? (
          <a
            href={siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Visiter le site web
          </a>
        ) : (
          <button
            type="button"
            className="btn btn-secondary"
            disabled
            title="Site web non disponible"
          >
            Site web non disponible
          </button>
        )}
      </p>

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
