import { NavLink } from "react-router-dom";
import categories from "../data/categories.json";

function Header() {
  return (
    <header className="bg-light shadow-sm">
      <nav className="container navbar navbar-expand-lg navbar-light">
        <NavLink to="/" className="navbar-brand fw-bold text-primary">
          Trouve ton artisan
        </NavLink>
        <ul className="navbar-nav ms-auto">
          {categories.map((cat) => (
            <li className="nav-item" key={cat.id}>
              <NavLink className="nav-link" to={`/categorie/${cat.slug}`}>
                {cat.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
