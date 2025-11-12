import { useParams } from "react-router-dom";
import { useState, useMemo } from "react";
import categories from "../data/categories.json";
import specialities from "../data/specialities.json";
import artisans from "../data/artisans.json";
import ArtisanCard from "../components/ArtisanCard";

function Category() {
  const { slug } = useParams();
  const [q, setQ] = useState("");

  const category = categories.find(c => c.slug === slug);
  if (!category) return <p>Catégorie introuvable.</p>;

  const specialityIds = useMemo(
    () => specialities.filter(s => s.category_id === category.id).map(s => s.id),
    [category.id]
  );

  const list = useMemo(() => {
    return artisans
      .filter(a => {
        // on relie par le nom de spécialité si tu n’as pas de speciality_id dans artisans.json
        const spec = specialities.find(s => s.name === a.speciality_name);
        const inCategory = spec ? spec.category_id === category.id : false;
        const matchName = a.name.toLowerCase().includes(q.toLowerCase());
        return inCategory && matchName;
      });
  }, [q, category.id]);

  return (
    <section>
      <h1 className="mb-4">Catégorie : {category.name}</h1>

      <input
        type="text"
        className="form-control mb-4"
        placeholder="Rechercher un artisan..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
        aria-label="Rechercher un artisan par nom"
      />

      <div className="row">
        {list.length ? (
          list.map(a => (
            <div className="col-md-4" key={a.id}>
              <ArtisanCard artisan={a} />
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
