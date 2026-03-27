import Navbar from "./components/layout/navbar.component";
import Login from "./components/login/Login.component";

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar title="Dashboard" />
      <Login />
    </div>
  );
}

export default App;
