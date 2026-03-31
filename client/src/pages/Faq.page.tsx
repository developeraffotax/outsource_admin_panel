import Navbar from "../components/layout/navbar.component";
import FaqContent from "../components/ContentManager/faq/Faq";

const Faq = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar title="Buy Service" />
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <FaqContent />
      </main>
    </div>
  );
};

export default Faq;
