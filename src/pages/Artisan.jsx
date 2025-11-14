import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArtisanBySlug, postContact } from "../services/api";

// Mapping spécialité → image
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
  const [artisan, setArtisan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  // 🔁 Chargement de l'artisan depuis l'API
  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        const data = await getArtisanBySlug(slug); // GET /api/artisans/:slug
        if (alive) {
          setArtisan(data);
        }
      } catch (e) {
        console.error("Erreur chargement artisan :", e);
        if (alive) setArtisan(null);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [slug]);

  if (loading) return <p>Chargement…</p>;
  if (!artisan) return <p>Artisan introuvable.</p>;

  // URL du site si présente
  const siteUrl = artisan.website_url?.trim();

  // 📩 Envoi du formulaire de contact via API
  async function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      setSending(true);
      await postContact({
        artisanSlug: slug,
        name: payload.name,
        email: payload.email,
        subject: payload.subject,
        message: payload.message,
      });
      alert("Votre message a bien été envoyé !");
      e.currentTarget.reset();
    } catch (error) {
      console.error("Erreur envoi message :", error);
      alert("Une erreur est survenue lors de l’envoi du message.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="container py-4">
      <h1 className="mb-3">{artisan.name}</h1>

      {images[artisan.speciality_name] && (
        <img
          src={images[artisan.speciality_name]}
          alt={artisan.speciality_name}
          className="img-fluid rounded mb-4"
          style={{ maxHeight: "350px", objectFit: "cover", width: "100%" }}
        />
      )}

      <p>
        <strong>Spécialité :</strong> {artisan.speciality_name}
      </p>
      <p>
        <strong>Ville :</strong> {artisan.city}
      </p>
      <p>
        <strong>Note :</strong> {artisan.rating} ★
      </p>
      <p className="mb-4">{artisan.about}</p>

      {/* Bouton site web : actif ou grisé */}
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
        <textarea
          name="message"
          className="form-control"
          rows="4"
          required
        ></textarea>

        <button
          type="submit"
          className="btn btn-primary mt-3"
          disabled={sending}
        >
          {sending ? "Envoi en cours…" : "Envoyer"}
        </button>
      </form>
    </section>
  );
}

export default Artisan;
