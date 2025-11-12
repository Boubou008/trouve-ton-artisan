import { NavLink } from "react-router-dom";
import categories from "../data/categories.json";

function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          <NavLink to="/" className="navbar-brand fw-bold text-primary">
            Trouve ton artisan
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {categories.map((cat) => (
                <li className="nav-item" key={cat.id}>
                  <NavLink
                    to={`/categorie/${cat.slug}`}
                    className={({ isActive }) =>
                      isActive ? "nav-link active text-primary" : "nav-link"
                    }
                  >
                    {cat.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
