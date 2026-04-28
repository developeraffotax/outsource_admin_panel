import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import { useState } from "react";

// Page Imports
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

const GuestRoute = () => {
  return isAuthenticated() ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

const PrivateRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

const AdminRoute = () => {
  if (!isAuthenticated()) return <Navigate to="/login" replace />;
  if (!isCurrentUserAdmin()) return <Navigate to="/dashboard" replace />;
  return <Outlet />;
};

function App() {
  const [showEntry, setShowEntry] = useState(() => {
    const hasSeenEntry = sessionStorage.getItem(SESSION_KEY_ENTRY_ANIMATION);
    if (!hasSeenEntry) {
      sessionStorage.setItem(SESSION_KEY_ENTRY_ANIMATION, "1");
    }
    return !hasSeenEntry;
  });

  return (
    <>
      {showEntry && <EntryPreloader onComplete={() => setShowEntry(false)} />}

      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Navigate
                to={isAuthenticated() ? "/dashboard" : "/login"}
                replace
              />
            }
          />

          {/* 3. Guest Only Routes (Login, etc.) */}
          <Route element={<GuestRoute />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>

          {/* 4. Authenticated User Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/buy-service" element={<BuyServicePage />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/services" element={<Services />} />
          </Route>

          {/* 5. Admin Only Routes */}
          <Route element={<AdminRoute />}>
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/users" element={<UsersPage />} />
          </Route>

          {/* 6. Catch-all Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
