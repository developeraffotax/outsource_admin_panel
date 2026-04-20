import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState, type ReactElement } from "react";
import LoginPage from "./pages/Login.page";
import DashboardPage from "./pages/Dashboard.page";
import BuyServicePage from "./pages/BuyService.page";
import AboutUs from "./pages/AboutUs.page";
import ContactUs from "./pages/ContactUs.page";
import Faq from "./pages/Faq.page";
import Services from "./pages/Services.page";
import OrdersPage from "./pages/Orders.page";
import UsersPage from "./pages/Users.page.tsx";
import EntryPreloader from "./components/layout/entry-preloader.component";
import { isAuthenticated, isCurrentUserAdmin } from "./utils/auth";

const SESSION_KEY_ENTRY_ANIMATION = "cms_seen_entry_animation";

type AdminOnlyRouteProps = {
  children: ReactElement;
};

type GuestOnlyRouteProps = {
  children: ReactElement;
};

type AuthenticatedRouteProps = {
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

function AuthenticatedRoute({ children }: AuthenticatedRouteProps) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
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
    const hasSeenEntry = sessionStorage.getItem(SESSION_KEY_ENTRY_ANIMATION);
    if (hasSeenEntry) {
      setShowEntry(false);
      return;
    }

    sessionStorage.setItem(SESSION_KEY_ENTRY_ANIMATION, "1");
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
          <Route
            path="/dashboard"
            element={
              <AuthenticatedRoute>
                <DashboardPage />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/buy-service"
            element={
              <AuthenticatedRoute>
                <BuyServicePage />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/about-us"
            element={
              <AuthenticatedRoute>
                <AboutUs />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/contact-us"
            element={
              <AuthenticatedRoute>
                <ContactUs />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/faq"
            element={
              <AuthenticatedRoute>
                <Faq />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/services"
            element={
              <AuthenticatedRoute>
                <Services />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <AdminOnlyRoute>
                <OrdersPage />
              </AdminOnlyRoute>
            }
          />
          <Route
            path="/users"
            element={
              <AdminOnlyRoute>
                <UsersPage />
              </AdminOnlyRoute>
            }
          />
          <Route path="*" element={<AuthLandingRoute />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
