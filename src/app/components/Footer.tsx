import { Link } from "react-router";
import { Instagram, Youtube, Mail, Facebook } from "lucide-react";
import { useSiteConfig } from "../hooks/useSiteConfig";

export default function Footer() {
  const { config } = useSiteConfig();
  
  // Default values in case config is loading
  const socialMedia = config?.social_media || {
    instagram: 'https://www.instagram.com/semanadelascuerdasmed/',
    facebook: 'https://www.facebook.com/semanadelascuerdas',
    youtube: 'https://www.youtube.com/@semanadelascuerdas',
    email: 'info@semanadelascuerdas.com'
  };

  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-[#D4AF37]">Semana de las Cuerdas</h3>
            </div>
            <p className="text-sm text-white/60">
              Acelerador de formación musical de élite para jóvenes talentos de cuerdas y piano.
            </p>
          </div>

          {/* Navigation Columns */}
          <div>
            <h3 className="mb-4 text-sm uppercase tracking-wider text-[#D4AF37]">
              Participantes
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/audiciona" className="text-sm text-white/60 transition-colors hover:text-white">
                  Audiciona
                </Link>
              </li>
              <li>
                <Link to="/programa" className="text-sm text-white/60 transition-colors hover:text-white">
                  El Programa
                </Link>
              </li>
              <li>
                <Link to="/maestros" className="text-sm text-white/60 transition-colors hover:text-white">
                  Maestros
                </Link>
              </li>
              <li>
                <Link to="/galeria" className="text-sm text-white/60 transition-colors hover:text-white">
                  Galería
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm uppercase tracking-wider text-[#D4AF37]">
              Institucional
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/impacto" className="text-sm text-white/60 transition-colors hover:text-white">
                  Impacto
                </Link>
              </li>
              <li>
                <Link to="/fundacion" className="text-sm text-white/60 transition-colors hover:text-white">
                  Fundación Vivat
                </Link>
              </li>
              <li>
                <Link to="/apoya" className="text-sm text-white/60 transition-colors hover:text-white">
                  Apoya
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="text-sm text-white/60 transition-colors hover:text-white">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media & Newsletter */}
          <div>
            <h3 className="mb-4 text-sm uppercase tracking-wider text-[#D4AF37]">
              Síguenos
            </h3>
            <div className="mb-6 flex gap-4">
              <a
                href={socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37]"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37]"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={socialMedia.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37]"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href={`mailto:${socialMedia.email}`}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37]"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <p className="text-sm text-white/60">
              Medellín, Colombia
              <br />
              {socialMedia.email}
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-white/40">
              © 2026 Semana de las Cuerdas. Fundación Vivat.
            </p>
            <div className="flex gap-6 text-sm text-white/40">
              <button className="hover:text-white/60">Español</button>
              <button className="hover:text-white/60">English</button>
              <button className="hover:text-white/60">Português</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}