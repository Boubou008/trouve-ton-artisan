import { useParams } from "react-router-dom";
import artisans from "../data/artisans.json";
import specialities from "../data/specialities.json";
import categories from "../data/categories.json";
import ArtisanCard from "../components/ArtisanCard";
import { useState } from "react";

function Category() {
  const { slug } = useParams();
  const [search, setSearch] = useState("");

  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    return <p>Catégorie introuvable.</p>;
  }

  // Trouver les spécialités associées à cette catégorie
  const specialityIds = specialities
    .filter((s) => s.category_id === category.id)
    .map((s) => s.id);

  // Filtrer les artisans de la catégorie + recherche
  const filteredArtisans = artisans.filter(
    (a) =>
      specialityIds.includes(a.speciality_id) &&
      a.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section>
      <h1 className="mb-4">Catégorie : {category.name}</h1>

      <input
        type="text"
        className="form-control mb-4"
        placeholder="Rechercher un artisan..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="row">
        {filteredArtisans.length > 0 ? (
          filteredArtisans.map((artisan) => (
            <div className="col-md-4" key={artisan.id}>
              <ArtisanCard artisan={artisan} />
            </div>
          ))
        ) : (
          <p>Aucun artisan trouvé dans cette catégorie.</p>
        )}
      </div>
    </section>
  );
}

export default Category;
