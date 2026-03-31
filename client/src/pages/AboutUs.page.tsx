import Navbar from "../components/layout/navbar.component";
import AboutUS from "../components/ContentManager/aboutUS/AboutUS";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar title="Buy Service" />
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <AboutUS />
      </main>
    </div>
  );
};

export default AboutUs;
