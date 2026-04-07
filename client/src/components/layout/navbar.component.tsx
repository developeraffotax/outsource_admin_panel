import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import faviconWhite from "../../assets/FaviconWhite.svg";

type NavbarProps = {
  title: string;
};

const navLinks = [
  { to: "/dashboard", label: "Landing page" },
  { to: "/buy-service", label: "Prices" },
  { to: "/about-us", label: "About Us" },
  { to: "/contact-us", label: "Contact Us" },
  { to: "/faq", label: "FAQ" },
  { to: "/services", label: "Services" },
];

export const Navbar = ({ title = "Dashboard" }: NavbarProps) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "cms-nav-link cms-nav-link-active" : "cms-nav-link";

  return (
    <nav className="cms-navbar">
      <div className="cms-navbar-inner">
        {/* Brand */}
        <div className="cms-navbar-brand">
          <img
            src={faviconWhite}
            alt="CMS logo"
            className="h-6 w-6 object-contain"
          />

          <span className="cms-navbar-title">{title}</span>
        </div>

        {/* Desktop nav links */}
        <div className="cms-navbar-links">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={getNavClass}>
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Logout + mobile toggle */}
        <div className="flex items-center gap-2">
          <button onClick={handleLogout} className="cms-logout-btn">
            Logout
          </button>

          {/* Mobile hamburger */}
          <button
            className="cms-mobile-toggle"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="cms-mobile-menu md:hidden">
          <div className="cms-mobile-menu-inner">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={getNavClass}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            <button onClick={handleLogout} className="cms-mobile-logout">
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
