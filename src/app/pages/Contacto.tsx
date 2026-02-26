import { useState } from "react";
import { Mail, Phone, MapPin, Send, Check, AlertCircle } from "lucide-react";
import { projectId, publicAnonKey } from '/utils/supabase/info';
import { Link } from 'react-router';

export default function Contacto() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-65077a1f/contacto/submit`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            ...formData,
            submittedAt: new Date().toISOString()
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Error al enviar el mensaje');
      }

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        country: '',
        subject: '',
        message: ''
      });
      
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err: any) {
      console.error('Error submitting contact form:', err);
      setError('Hubo un error al enviar tu mensaje. Por favor intenta nuevamente o escríbenos directamente a info@semanadelascuerdas.com');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <section className="bg-black py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-6 text-5xl md:text-6xl">Contacto</h1>
          <p className="text-xl text-white/70">
            ¿Tienes preguntas sobre audiciones, becas, alianzas institucionales o el programa?
            <br />
            Estamos aquí para ayudarte.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="bg-[#0a0a0a] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="rounded-sm border border-white/10 bg-white/5 p-8 text-center">
              <Mail className="mx-auto mb-4 h-10 w-10 text-[#D4AF37]" />
              <h3 className="mb-3 text-xl">Email</h3>
              <a
                href="mailto:info@semanadelascuerdas.com"
                className="text-white/70 transition-colors hover:text-[#D4AF37]"
              >
                info@semanadelascuerdas.com
              </a>
              <p className="mt-2 text-sm text-white/50">
                Respuesta en menos de 48 horas
              </p>
            </div>

            <div className="rounded-sm border border-white/10 bg-white/5 p-8 text-center">
              <Phone className="mx-auto mb-4 h-10 w-10 text-[#D4AF37]" />
              <h3 className="mb-3 text-xl">Teléfono</h3>
              <a
                href="tel:+573001234567"
                className="text-white/70 transition-colors hover:text-[#D4AF37]"
              >
                +57 300 123 4567
              </a>
              <p className="mt-2 text-sm text-white/50">
                Lunes a viernes, 9am - 6pm
              </p>
            </div>

            <div className="rounded-sm border border-white/10 bg-white/5 p-8 text-center">
              <MapPin className="mx-auto mb-4 h-10 w-10 text-[#D4AF37]" />
              <h3 className="mb-3 text-xl">Ubicación</h3>
              <p className="text-white/70">
                Medellín, Colombia
              </p>
              <p className="mt-2 text-sm text-white/50">
                Fundación Vivat
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="bg-black py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl">Envíanos un mensaje</h2>
            <p className="text-white/60">
              Completa el formulario y nos pondremos en contacto contigo pronto.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Info */}
            <div className="rounded-sm border border-white/10 bg-white/5 p-8">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-white/80">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-sm border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/40 focus:border-[#D4AF37] focus:outline-none"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-white/80">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-sm border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/40 focus:border-[#D4AF37] focus:outline-none"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-white/80">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-sm border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/40 focus:border-[#D4AF37] focus:outline-none"
                    placeholder="+57 300 000 0000"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-white/80">
                    País
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full rounded-sm border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/40 focus:border-[#D4AF37] focus:outline-none"
                    placeholder="Colombia"
                  />
                </div>
              </div>
            </div>

            {/* Subject */}
            <div className="rounded-sm border border-white/10 bg-white/5 p-8">
              <label className="mb-2 block text-sm text-white/80">
                Asunto *
              </label>
              <select
                required
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full rounded-sm border border-white/20 bg-white/5 px-4 py-3 text-white focus:border-[#D4AF37] focus:outline-none"
              >
                <option value="">Selecciona un tema...</option>
                <option value="audition">Consulta sobre audiciones</option>
                <option value="scholarship">Información sobre becas</option>
                <option value="program">Detalles del programa</option>
                <option value="donation">Donaciones y apoyo</option>
                <option value="partnership">Alianzas institucionales</option>
                <option value="press">Prensa y medios</option>
                <option value="other">Otro</option>
              </select>
            </div>

            {/* Message */}
            <div className="rounded-sm border border-white/10 bg-white/5 p-8">
              <label className="mb-2 block text-sm text-white/80">
                Mensaje *
              </label>
              <textarea
                required
                rows={8}
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full rounded-sm border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/40 focus:border-[#D4AF37] focus:outline-none"
                placeholder="Escribe tu mensaje aquí..."
              />
            </div>

            {/* Submit */}
            <div className="text-center">
              {error && (
                <div className="mb-4 inline-flex items-center gap-2 rounded-sm bg-red-500/20 px-6 py-3 text-red-400">
                  <AlertCircle className="h-5 w-5" />
                  <span className="text-sm">{error}</span>
                </div>
              )}
              
              {submitted ? (
                <div className="inline-flex items-center gap-2 rounded-sm bg-green-600/20 px-8 py-4 text-green-400">
                  <Check className="h-5 w-5" />
                  Mensaje enviado. Te responderemos pronto.
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-sm bg-[#D4AF37] px-12 py-4 text-lg text-black transition-all hover:bg-[#C5A028] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? 'Enviando...' : 'Enviar mensaje'}
                  <Send className="h-5 w-5" />
                </button>
              )}
            </div>
          </form>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-t border-white/10 bg-[#0a0a0a] py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-4xl">
            Preguntas <span className="text-[#D4AF37]">frecuentes</span>
          </h2>

          <div className="space-y-6">
            <div className="rounded-sm border border-white/10 bg-white/5 p-8">
              <h3 className="mb-3 text-xl text-[#D4AF37]">
                ¿Cuándo son las próximas audiciones?
              </h3>
              <p className="text-white/70">
                Las audiciones para la edición 2026 están abiertas ahora. Fecha límite: 30 de abril 2026.
                Visita nuestra{" "}
                <Link to="/audiciona" className="text-[#D4AF37] hover:underline">
                  página de audiciones
                </Link>{" "}
                para más información.
              </p>
            </div>

            <div className="rounded-sm border border-white/10 bg-white/5 p-8">
              <h3 className="mb-3 text-xl text-[#D4AF37]">
                ¿Cómo funcionan las becas?
              </h3>
              <p className="text-white/70">
                El 85% de nuestros participantes recibe becas totales o parciales. Evaluamos mérito
                artístico y necesidad económica. No dejes que la situación financiera te impida aplicar.
              </p>
            </div>

            <div className="rounded-sm border border-white/10 bg-white/5 p-8">
              <h3 className="mb-3 text-xl text-[#D4AF37]">
                ¿Mi empresa puede ser patrocinador?
              </h3>
              <p className="text-white/70">
                Sí. Trabajamos con empresas, fundaciones y gobiernos locales para ampliar nuestro
                impacto. Contáctanos para conocer opciones de alianza y beneficios institucionales.
              </p>
            </div>

            <div className="rounded-sm border border-white/10 bg-white/5 p-8">
              <h3 className="mb-3 text-xl text-[#D4AF37]">
                ¿Puedo visitar el programa como observador?
              </h3>
              <p className="text-white/70">
                Ofrecemos masterclasses públicas abiertas a la comunidad. También aceptamos visitas
                de maestros, directores de conservatorios y profesionales interesados en nuestro
                modelo pedagógico. Escríbenos para coordinar.
              </p>
            </div>

            <div className="rounded-sm border border-white/10 bg-white/5 p-8">
              <h3 className="mb-3 text-xl text-[#D4AF37]">
                ¿Tienen programa para instrumentos de viento o canto?
              </h3>
              <p className="text-white/70">
                Actualmente nos enfocamos en cuerdas y piano. Exploramos expandir a otros instrumentos
                en el futuro según capacidad y recursos. Suscríbete a nuestro newsletter para actualizaciones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social & Links */}
      <section className="bg-black py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h3 className="mb-8 text-2xl">También puedes encontrarnos en:</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm border border-white/20 px-8 py-3 transition-all hover:border-[#D4AF37] hover:text-[#D4AF37]"
            >
              Instagram
            </a>
            <a
              href="https://youtube.com/watch?v=aK-Xg6MTf1Q"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm border border-white/20 px-8 py-3 transition-all hover:border-[#D4AF37] hover:text-[#D4AF37]"
            >
              YouTube
            </a>
            <a
              href="mailto:info@semanadelascuerdas.com"
              className="rounded-sm border border-white/20 px-8 py-3 transition-all hover:border-[#D4AF37] hover:text-[#D4AF37]"
            >
              Email
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}