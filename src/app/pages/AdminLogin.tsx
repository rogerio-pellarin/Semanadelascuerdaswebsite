import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router';
import { Lock, Mail, AlertCircle } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/admin/edit-home';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      setError('Email o contraseña incorrectos');
      setLoading(false);
    } else {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <Lock className="h-12 w-12 text-[#D4AF37]" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-white">Panel de Administración</h1>
          <p className="text-white/60">Semana de las Cuerdas</p>
        </div>

        {/* Login Form */}
        <div className="rounded-sm border border-white/10 bg-white/5 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="flex items-center gap-2 rounded-sm bg-red-500/10 p-4 text-red-400">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="email" className="mb-2 block text-sm text-white/70">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="w-full rounded-sm border border-white/20 bg-black/50 py-3 pl-11 pr-4 text-white placeholder:text-white/40 focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                  placeholder="admin@semanadelascuerdas.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm text-white/70">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full rounded-sm border border-white/20 bg-black/50 py-3 pl-11 pr-4 text-white placeholder:text-white/40 focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-sm bg-[#D4AF37] py-3 font-semibold text-black transition-all hover:bg-[#B8941F] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>

          <div className="mt-6 border-t border-white/10 pt-6">
            <p className="text-center text-xs text-white/40">
              Si no tienes acceso, contacta al administrador del sistema
            </p>
          </div>
        </div>

        {/* Back to site */}
        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-sm text-white/60 transition-colors hover:text-[#D4AF37]"
          >
            ← Volver al sitio web
          </a>
        </div>
      </div>
    </div>
  );
}
