import Navbar from "../components/layout/navbar.component";
import ContactUS from "../components/ContentManager/ContactUS/ContactUS";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar title="Buy Service" />
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <ContactUS />
      </main>
    </div>
  );
};

export default ContactUs;
