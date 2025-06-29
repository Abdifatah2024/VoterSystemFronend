import { Outlet } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="header">
        <Header />
      </header>

      {/* Main Content */}
      <main className="flex-1 content p-4">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="footer mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
