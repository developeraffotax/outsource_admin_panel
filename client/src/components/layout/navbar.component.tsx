import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import faviconWhite from "../../assets/FaviconWhite.svg";
import { isCurrentUserAdmin } from "../../utils/auth";

type NavbarProps = {
  title?: string;
};

const BASE_NAV_LINKS = [
  { to: "/dashboard", label: "Homepage" },
  { to: "/services", label: "Services" },
  { to: "/about-us", label: "About Us" },
  { to: "/faq", label: "FAQs" },
  { to: "/contact-us", label: "Contact Us" },
  { to: "/buy-service", label: "Prices" },
];

export const Navbar = ({ title = "Dashboard" }: NavbarProps) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = isCurrentUserAdmin()
    ? [
        { to: "/orders", label: "Orders" },
        { to: "/users", label: "Users" },
        { to: "/", label: "Break" },
        ...BASE_NAV_LINKS,
      ]
    : BASE_NAV_LINKS;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  // Utility logic for active links using your theme colors
  const getNavClass = ({ isActive }: { isActive: boolean }) => {
    const baseClass =
      "rounded-lg border px-3 py-2 text-[0.85rem] font-semibold no-underline transition-colors duration-150";
    return isActive
      ? `${baseClass} bg-gradient-to-br from-cms-primary to-[#5f4aea] text-white border-transparent shadow-[0_4px_12px_-5px_rgba(70,50,218,0.4)]`
      : `${baseClass} text-[#405871] border-transparent hover:bg-cms-primary-soft hover:text-[#3f3486] hover:border-[#d9d2ff]`;
  };

  return (
    <>
      {/* Mobile Top Header - Fixed utility bar */}
      <header className="fixed top-0 left-0 right-0 z-40 flex h-14 items-center gap-3 px-4 border-b bg-cms-surface/95 backdrop-blur-md border-cms-border md:hidden">
        <button
          className="flex items-center justify-center h-9 w-9 rounded-lg border border-slate-200 bg-cms-surface text-slate-700 hover:bg-cms-primary-soft hover:border-cms-border-strong focus:outline-none transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
        <div className="flex items-center gap-2">
          <img
            src={faviconWhite}
            alt="CMS logo"
            className="h-5 w-5 object-contain"
          />
          <span className="font-display text-[0.95rem] font-bold text-cms-text tracking-tight">
            {title}
          </span>
        </div>
      </header>

      {/* Mobile Backdrop - Closes panel on background click (Instant transition-none block) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-[1px] md:hidden transition-none"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Side Navigation Drawer - Responsive states handled via display utilities */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex w-64 flex-col border-r bg-cms-surface border-cms-border transition-none ${
          isOpen ? "flex" : "hidden md:flex"
        }`}
      >
        <div className="flex h-full flex-col p-4">
          {/* Brand/Header */}
          <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-cms-border-strong">
            <img
              src={faviconWhite}
              alt="CMS logo"
              className="h-6 w-6 object-contain"
            />
            <span className="font-display text-[0.95rem] font-bold text-cms-text tracking-tight">
              {title}
            </span>
          </div>

          {/* Navigation Links (Stacked Layout) */}
          <nav className="flex flex-1 flex-col gap-1 overflow-y-auto">
            {navLinks.map((link) => {
              if (link.label === "Break") {
                return (
                  <span className="w-full my-2 border-t border-cms-border-strong"></span>
                );
              }

              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={getNavClass}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </NavLink>
              );
            })}
          </nav>

          {/* Sidebar Footer Action */}
          <div className="pt-3 mt-auto border-t border-cms-border-strong">
            <button
              onClick={handleLogout}
              className="w-full rounded-lg border bg-cms-surface px-3 py-2 text-[0.82rem] font-bold text-center border-[#f2d1cc] text-cms-danger hover:bg-[#fff3f1] hover:border-[#eebcb4] transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
