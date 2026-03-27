type NavbarProps = {
  title: string;
};

export const Navbar = ({ title = "Dashboard" }: NavbarProps) => {
  return (
    <nav className="p-4 border-b border-slate-200 bg-white">
      <h1 className="text-lg font-semibold">{title}</h1>
    </nav>
  );
};

export default Navbar;
