import Navbar from "../components/layout/navbar.component";
import Servicess from "../components/ContentManager/servicess/Services";

const Services = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar title="Buy Service" />
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <Servicess />
      </main>
    </div>
  );
};

export default Services;
