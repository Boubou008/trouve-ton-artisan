import { Link } from "react-router-dom";

function ArtisanCard({ artisan }) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{artisan.name}</h5>
        <p className="card-text">
          {artisan.city} ({artisan.zip})<br />
          Note : {artisan.rating} ★<br />
          Spécialité : {artisan.speciality_name}
        </p>
        <Link to={`/artisan/${artisan.slug}`} className="btn btn-primary">
          Voir le profil
        </Link>
      </div>
    </div>
  );
}

export default ArtisanCard;
