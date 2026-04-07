import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginPage from "./pages/Login.page";
import DashboardPage from "./pages/Dashboard.page";
import BuyServicePage from "./pages/BuyService.page";
import AboutUs from "./pages/AboutUs.page";
import ContactUs from "./pages/ContactUs.page";
import Faq from "./pages/Faq.page";
import Services from "./pages/Services.page";
import EntryPreloader from "./components/layout/entry-preloader.component";

function App() {
  const [showEntry, setShowEntry] = useState(true);

  useEffect(() => {
    const hasSeenEntry = sessionStorage.getItem("cms_seen_entry_animation");
    if (hasSeenEntry) {
      setShowEntry(false);
      return;
    }

    sessionStorage.setItem("cms_seen_entry_animation", "1");
  }, []);

  return (
    <>
      {showEntry && <EntryPreloader onComplete={() => setShowEntry(false)} />}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/buy-service" element={<BuyServicePage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/services" element={<Services />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
