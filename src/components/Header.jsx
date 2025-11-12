import { NavLink } from "react-router-dom";
import categories from "../data/categories.json";
import logo from "../assets/images/logo.png";

function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-white shadow-sm navbar-compact">
        <div className="container-fluid px-0">

          {/* === Brand : conteneur fin, logo en absolute === */}
          <NavLink to="/" className="navbar-brand me-auto ms-0">
            <span className="brand-wrap">
              <img src={logo} alt="Logo" className="brand-logo" />
            </span>
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
            <ul className="navbar-nav ms-auto pe-3">
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
