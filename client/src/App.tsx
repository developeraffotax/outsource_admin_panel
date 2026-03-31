import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login.page";
import DashboardPage from "./pages/Dashboard.page";
import BuyServicePage from "./pages/BuyService.page";
import AboutUs from "./pages/AboutUs.page";
import ContactUs from "./pages/ContactUs.page";
import Faq from "./pages/Faq.page";
import Services from "./pages/Services.page";

function App() {
  return (
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
  );
}

export default App;
