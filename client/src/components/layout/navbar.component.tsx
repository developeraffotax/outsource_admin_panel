import { NavLink } from "react-router-dom";

type NavbarProps = {
  title: string;
};

export const Navbar = ({ title = "Dashboard" }: NavbarProps) => {
  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
      isActive
        ? "bg-slate-900 text-white"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  return (
    <nav className="border-b border-slate-200 bg-white px-4 py-4">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between">
        <h1 className="text-lg font-semibold">{title}</h1>

        <div className="flex items-center gap-2">
          <NavLink to="/dashboard" className={getNavClass}>
            Landing page
          </NavLink>
          <NavLink to="/buy-service" className={getNavClass}>
            Buy Service
          </NavLink>
          <NavLink to="/about-us" className={getNavClass}>
            About Us
          </NavLink>
          <NavLink to="/contact-us" className={getNavClass}>
            Contact Us
          </NavLink>
          <NavLink to="/faq" className={getNavClass}>
            Faq
          </NavLink>
          <NavLink to="/services" className={getNavClass}>
            Services
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
