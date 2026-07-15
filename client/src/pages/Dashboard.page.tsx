import Navbar from "../components/layout/navbar.component";
import Home from "../components/ContentManager/home/Home";

const DashboardPage = () => {
  return (
    <div className="cms-admin-page min-h-screen bg-slate-50/60 font-sans antialiased">
      <Navbar title="Dashboard" />
      <main className="  cms-admin-main px-4 py-8 sm:px-6 lg:px-8">
        <Home />
      </main>
    </div>
  );
};









// const DashboardPage = () => {
//   return (
//     <div className="cms-admin-page min-h-screen bg-slate-50/60 font-sans antialiased">
//       <Navbar title="Dashboard" />
//       <main className="ml-[260px] cms-admin-main px-4 py-8 sm:px-6 lg:px-8">
//         <Home />
//       </main>
//     </div>
//   );
// };

export default DashboardPage;