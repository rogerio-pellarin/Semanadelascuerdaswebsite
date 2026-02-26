import { useState } from 'react';
import { useNavigate } from 'react-router';
import { projectId, publicAnonKey } from '/utils/supabase/info';
import { Shield, Check, AlertCircle } from 'lucide-react';

export default function AdminSetup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-65077a1f/auth/create-admin`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ email, password, name }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al crear usuario');
      }

      setSuccess(true);
      setTimeout(() => {
        navigate('/admin/login');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Error al crear el usuario administrador');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black px-4">
        <div className="w-full max-w-md text-center">
          <div className="mb-6 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20">
              <Check className="h-10 w-10 text-green-400" />
            </div>
          </div>
          <h1 className="mb-4 text-3xl font-bold text-white">¡Usuario Creado!</h1>
          <p className="mb-6 text-white/60">
            El usuario administrador ha sido creado exitosamente.
            <br />
            Redirigiendo al login...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <Shield className="h-12 w-12 text-[#D4AF37]" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-white">Configuración Inicial</h1>
          <p className="text-white/60">Crea tu usuario administrador</p>
        </div>

        {/* Setup Form */}
        <div className="rounded-sm border border-white/10 bg-white/5 p-8">
          <div className="mb-6 rounded-sm bg-[#D4AF37]/10 p-4">
            <p className="text-sm text-[#D4AF37]">
              <strong>Importante:</strong> Este formulario es solo para crear el primer usuario
              administrador. Después de esto, puedes administrar usuarios adicionales desde el
              panel de Supabase.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="flex items-center gap-2 rounded-sm bg-red-500/10 p-4 text-red-400">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="name" className="mb-2 block text-sm text-white/70">
                Nombre
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-sm border border-white/20 bg-black/50 px-4 py-3 text-white placeholder:text-white/40 focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                placeholder="Administrador"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm text-white/70">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-sm border border-white/20 bg-black/50 px-4 py-3 text-white placeholder:text-white/40 focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                placeholder="admin@semanadelascuerdas.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm text-white/70">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full rounded-sm border border-white/20 bg-black/50 px-4 py-3 text-white placeholder:text-white/40 focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                placeholder="Mínimo 6 caracteres"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="mb-2 block text-sm text-white/70">
                Confirmar Contraseña
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                className="w-full rounded-sm border border-white/20 bg-black/50 px-4 py-3 text-white placeholder:text-white/40 focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                placeholder="Repite la contraseña"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-sm bg-[#D4AF37] py-3 font-semibold text-black transition-all hover:bg-[#B8941F] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Creando usuario...' : 'Crear Usuario Administrador'}
            </button>
          </form>
        </div>

        {/* Back to site */}
        <div className="mt-6 text-center">
          <a href="/" className="text-sm text-white/60 transition-colors hover:text-[#D4AF37]">
            ← Volver al sitio web
          </a>
        </div>
      </div>
    </div>
  );
}
