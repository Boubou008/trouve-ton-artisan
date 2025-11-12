import { Link } from "react-router-dom";

function ArtisanCard({ artisan }) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{artisan.name}</h5>
        <p className="card-text">
          {artisan.city} — {artisan.rating} ★
        </p>
        <p className="card-text">
          <small className="text-muted">{artisan.speciality_name}</small>
        </p>
        <Link to={`/artisan/${artisan.slug}`} className="btn btn-primary">
          Voir le profil
        </Link>
      </div>
    </div>
  );
}

export default ArtisanCard;
