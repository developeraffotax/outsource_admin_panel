import Navbar from "../components/layout/navbar.component";
import Users from "../components/ContentManager/users/Users";

const UsersPage = () => {
  return (
    <div className="cms-admin-page">
      <Navbar title="Users" />
      <main className="cms-admin-main">
        <Users />
      </main>
    </div>
  );
};

export default UsersPage;
