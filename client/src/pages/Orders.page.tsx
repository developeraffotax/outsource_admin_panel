import Navbar from "../components/layout/navbar.component";
import Orders from "../components/ContentManager/orders/Orders";

const OrdersPage = () => {
  return (
    <div className="cms-admin-page">
      <Navbar title="Orders" />
      <main className="cms-admin-main">
        <Orders />
      </main>
    </div>
  );
};

export default OrdersPage;
