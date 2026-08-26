import { Outlet } from "react-router-dom";
import { Footer, Navbar } from "../components";

function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-aurelia-ivory">
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default PublicLayout;
