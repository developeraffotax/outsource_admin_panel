import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState, type ReactElement } from "react";
import LoginPage from "./pages/Login.page";
import DashboardPage from "./pages/Dashboard.page";
import BuyServicePage from "./pages/BuyService.page";
import AboutUs from "./pages/AboutUs.page";
import ContactUs from "./pages/ContactUs.page";
import Faq from "./pages/Faq.page";
import Services from "./pages/Services.page";
import UsersPage from "./pages/Users.page.tsx";
import EntryPreloader from "./components/layout/entry-preloader.component";
import { isAuthenticated, isCurrentUserAdmin } from "./utils/auth";

type AdminOnlyRouteProps = {
  children: ReactElement;
};

type GuestOnlyRouteProps = {
  children: ReactElement;
};

function AuthLandingRoute() {
  return isAuthenticated() ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/login" replace />
  );
}

function GuestOnlyRoute({ children }: GuestOnlyRouteProps) {
  if (isAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

function AdminOnlyRoute({ children }: AdminOnlyRouteProps) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (!isCurrentUserAdmin()) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

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
          <Route path="/" element={<AuthLandingRoute />} />
          <Route
            path="/login"
            element={
              <GuestOnlyRoute>
                <LoginPage />
              </GuestOnlyRoute>
            }
          />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/buy-service" element={<BuyServicePage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/services" element={<Services />} />
          <Route
            path="/users"
            element={
              <AdminOnlyRoute>
                <UsersPage />
              </AdminOnlyRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
