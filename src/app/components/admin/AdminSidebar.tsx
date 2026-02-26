import { Link, useLocation, useNavigate } from 'react-router';
import { Home, BookOpen, Users, TrendingUp, Building2, Heart, Settings, Image, ImagePlus, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface AdminSidebarProps {
  onReinitialize: () => void;
  reinitializing: boolean;
}

export default function AdminSidebar({ onReinitialize, reinitializing }: AdminSidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut, user } = useAuth();

  const navItems = [
    { path: '/admin/edit-home', label: 'Página Inicio', icon: Home },
    { path: '/admin/edit-programa', label: 'El Programa', icon: BookOpen },
    { path: '/admin/edit-maestros', label: 'Maestros', icon: Users },
    { path: '/admin/edit-galeria', label: 'Galería', icon: ImagePlus },
    { path: '/admin/edit-impacto', label: 'Nuestro Impacto', icon: TrendingUp },
    { path: '/admin/edit-fundacion', label: 'La Fundación', icon: Building2 },
    { path: '/admin/edit-apoya', label: 'Apoya', icon: Heart },
    { path: '/admin/settings', label: 'Imágenes & Config', icon: Image },
  ];

  return (
    <aside className="w-64 flex-shrink-0">
      <div className="sticky top-8 space-y-6">
        {/* CMS Navigation */}
        <div className="rounded-sm border border-white/10 bg-white/5 p-4">
          <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-[#D4AF37]">
            Panel CMS
          </h3>
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 rounded-sm px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? 'bg-[#D4AF37]/20 text-[#D4AF37]'
                      : 'text-white/60 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* System Actions */}
        <div className="rounded-sm border border-white/10 bg-white/5 p-4">
          <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-[#D4AF37]">
            Sistema
          </h3>
          <button
            onClick={onReinitialize}
            disabled={reinitializing}
            className="flex w-full items-center justify-center gap-2 rounded-sm border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-2 text-sm text-[#D4AF37] transition-colors hover:bg-[#D4AF37]/20 disabled:opacity-50"
          >
            <Settings className={`h-4 w-4 ${reinitializing ? 'animate-spin' : ''}`} />
            {reinitializing ? 'Reinicializando...' : 'Reinicializar Datos'}
          </button>
          <p className="mt-2 text-xs text-white/40">
            Restaura los valores por defecto de todas las páginas CMS
          </p>
        </div>

        {/* Quick Links */}
        <div className="rounded-sm border border-white/10 bg-white/5 p-4">
          <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-[#D4AF37]">
            Enlaces Rápidos
          </h3>
          <nav className="space-y-2">
            <Link
              to="/"
              className="block rounded-sm px-3 py-2 text-sm text-white/60 transition-colors hover:bg-white/5 hover:text-white"
            >
              Ver Sitio Web
            </Link>
            <Link
              to="/maestros"
              className="block rounded-sm px-3 py-2 text-sm text-white/60 transition-colors hover:bg-white/5 hover:text-white"
            >
              Ver Maestros
            </Link>
          </nav>
        </div>

        {/* Logout */}
        <div className="rounded-sm border border-white/10 bg-white/5 p-4">
          {user && (
            <div className="mb-3 rounded-sm bg-white/5 px-3 py-2">
              <p className="text-xs text-white/40">Sesión activa</p>
              <p className="text-sm text-white/70">{user.email}</p>
            </div>
          )}
          <button
            onClick={async () => {
              await signOut();
              navigate('/admin/login');
            }}
            className="flex w-full items-center justify-center gap-2 rounded-sm border border-red-400/30 bg-red-400/10 px-4 py-2 text-sm text-red-400 transition-colors hover:bg-red-400/20"
          >
            <LogOut className="h-4 w-4" />
            Cerrar Sesión
          </button>
        </div>
      </div>
    </aside>
  );
}