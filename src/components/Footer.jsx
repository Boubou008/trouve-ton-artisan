import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <p>© 2025 Trouve ton artisan</p>
      <p>101 cours Charlemagne, 69269 LYON CEDEX 02 — +33 (0)4 26 73 40 00</p>
      <p>
        <NavLink to="/mentions-legales" className="text-decoration-none">
          Mentions légales
        </NavLink>{" "}
        |{" "}
        <NavLink to="/contact" className="text-decoration-none">
          Contact
        </NavLink>
      </p>
    </footer>
  );
}

export default Footer;
