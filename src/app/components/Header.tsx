import { Link, useLocation } from "react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import LanguageSelector from "./LanguageSelector";

const navItems = [
  { path: "/", label: "Home" },
  { path: "/audiciona", label: "Audiciona" },
  { path: "/programa", label: "El Programa" },
  { path: "/maestros", label: "Maestros" },
  { path: "/galeria", label: "Galería" },
  { path: "/impacto", label: "Impacto" },
  { path: "/fundacion", label: "Fundación Vivat" },
  { path: "/apoya", label: "Apoya" },
  { path: "/ediciones-anteriores", label: "Ediciones Anteriores" },
  { path: "/noticias", label: "Noticias" },
  { path: "/contacto", label: "Contacto" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/95 backdrop-blur-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link to="/" className="flex-shrink-0">
            <div className="flex items-center gap-2">
              <img 
                src="https://tjbdedlujgjrnxazvpxa.supabase.co/storage/v1/object/public/semana-cuerdas-assets/logo.png" 
                alt="Semana de las Cuerdas" 
                className="h-12 w-auto"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-6">
            {navItems.slice(1, 6).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-montserrat text-sm transition-colors hover:text-[#D4AF37] ${
                  location.pathname === item.path
                    ? "text-[#D4AF37]"
                    : "text-white/80"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/apoya"
              className="rounded-sm bg-[#D4AF37] px-5 py-2.5 font-montserrat text-sm text-black transition-all hover:bg-[#C5A028]"
            >
              Apoya
            </Link>
            <LanguageSelector />
          </div>

          {/* Mobile menu button and language selector */}
          <div className="flex items-center gap-4 lg:hidden">
            <LanguageSelector />
            <button
              type="button"
              className=""
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="border-t border-white/10 py-4 lg:hidden">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 text-sm transition-colors hover:bg-white/5 ${
                  location.pathname === item.path
                    ? "text-[#D4AF37]"
                    : "text-white/80"
                }`}
              >
                {item.label}
              </Link>
            ))
            }
          </div>
        )}
      </nav>
    </header>
  );
}