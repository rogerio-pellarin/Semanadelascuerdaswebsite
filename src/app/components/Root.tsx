import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import { LanguageProvider } from "../contexts/LanguageContext";
import { AuthProvider } from "../contexts/AuthContext";

export default function Root() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <ScrollToTop />
        <div className="min-h-screen bg-[#0a0a0a] text-white">
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
      </LanguageProvider>
    </AuthProvider>
  );
}