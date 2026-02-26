import { useState } from 'react';
import { Link } from 'react-router';
import { Heart, Users, Building2, Award, Check, DollarSign, CreditCard } from 'lucide-react';

const donationOptions = [
  {
    amount: "$50",
    description: "Cubre materiales de estudio para un músico",
  },
  {
    amount: "$150",
    description: "Financia un día completo de alimentación",
  },
  {
    amount: "$500",
    description: "Apoya el alojamiento de un becado",
  },
  {
    amount: "$1,500",
    description: "Beca parcial (50%) para un participante",
  },
  {
    amount: "$3,000",
    description: "Beca completa para un joven músico",
  },
];

const waysToDonate = [
  {
    icon: DollarSign,
    title: "Donación única",
    description: "Aporta lo que puedas. Cada contribución, sin importar el monto, hace la diferencia.",
  },
  {
    icon: Award,
    title: "Apadrina una beca",
    description: "Financia la participación completa de un músico. Recibe actualizaciones sobre su progreso.",
  },
  {
    icon: Users,
    title: "Donación recurrente",
    description: "Aportes mensuales o anuales que nos permiten planear con estabilidad y ampliar el alcance.",
  },
  {
    icon: Building2,
    title: "Alianza institucional",
    description: "Tu empresa o fundación puede ser patrocinador oficial, con beneficios de visibilidad y tax deductions.",
  },
];

const impact = [
  {
    stat: "85%",
    label: "de nuestros músicos recibe becas totales o parciales",
  },
  {
    stat: "$2,500",
    label: "costo promedio por participante (matrícula, alojamiento, alimentación)",
  },
  {
    stat: "100%",
    label: "de las donaciones se destina directamente al programa",
  },
];

export default function Apoya() {
  const [selectedAmount, setSelectedAmount] = useState<string | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [donationType, setDonationType] = useState<"general" | "scholarship">("general");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div>
      {/* Header */}
      <section className="bg-black py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-6 text-5xl md:text-6xl">Apoya</h1>
          <p className="text-xl text-white/70">
            Tu generosidad hace posible que jóvenes talentos con recursos limitados
            accedan a formación musical de élite que transformará sus vidas.
          </p>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="border-y border-white/10 bg-[#0a0a0a] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {impact.map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="mb-2 text-5xl text-[#D4AF37]">{item.stat}</div>
                <p className="text-white/60">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Options */}
      <section className="bg-black py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-16 text-center text-4xl">
            Opciones de <span className="text-[#D4AF37]">donación</span>
          </h2>

          <div className="grid gap-8 md:grid-cols-2">
            {waysToDonate.map((way, idx) => (
              <div
                key={idx}
                className="rounded-sm border border-white/10 bg-white/5 p-8 transition-all hover:border-[#D4AF37]/50"
              >
                <way.icon className="mb-4 h-10 w-10 text-[#D4AF37]" />
                <h3 className="mb-3 text-2xl">{way.title}</h3>
                <p className="text-white/70">{way.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="bg-[#0a0a0a] py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl">Haz tu donación</h2>
            <p className="text-white/60">
              Proceso seguro. Tax-deductible en Colombia y EE.UU.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Donation Type */}
            <div className="rounded-sm border border-white/10 bg-white/5 p-8">
              <h3 className="mb-6 text-xl text-[#D4AF37]">Tipo de donación</h3>
              
              <div className="grid gap-4 md:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setDonationType("general")}
                  className={`rounded-sm border p-6 text-left transition-all ${
                    donationType === "general"
                      ? "border-[#D4AF37] bg-[#D4AF37]/10"
                      : "border-white/20 hover:border-white/40"
                  }`}
                >
                  <h4 className="mb-2 text-lg">Apoyo general</h4>
                  <p className="text-sm text-white/60">
                    Para el fondo general del programa
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setDonationType("scholarship")}
                  className={`rounded-sm border p-6 text-left transition-all ${
                    donationType === "scholarship"
                      ? "border-[#D4AF37] bg-[#D4AF37]/10"
                      : "border-white/20 hover:border-white/40"
                  }`}
                >
                  <h4 className="mb-2 text-lg">Beca específica</h4>
                  <p className="text-sm text-white/60">
                    Para financiar directamente a un músico
                  </p>
                </button>
              </div>
            </div>

            {/* Amount Selection */}
            <div className="rounded-sm border border-white/10 bg-white/5 p-8">
              <h3 className="mb-6 text-xl text-[#D4AF37]">Monto</h3>
              
              <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-3">
                {donationOptions.map((option, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSelectedAmount(option.amount);
                      setCustomAmount("");
                    }}
                    className={`rounded-sm border p-4 text-center transition-all ${
                      selectedAmount === option.amount
                        ? "border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]"
                        : "border-white/20 hover:border-white/40"
                    }`}
                  >
                    <div className="mb-1 text-2xl">{option.amount}</div>
                    <div className="text-xs text-white/60">{option.description}</div>
                  </button>
                ))}
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/80">
                  O ingresa otro monto (USD)
                </label>
                <input
                  type="number"
                  min="1"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(null);
                  }}
                  placeholder="Monto personalizado"
                  className="w-full rounded-sm border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/40 focus:border-[#D4AF37] focus:outline-none"
                />
              </div>
            </div>

            {/* Personal Information */}
            <div className="rounded-sm border border-white/10 bg-white/5 p-8">
              <h3 className="mb-6 text-xl text-[#D4AF37]">Tu información</h3>
              
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-white/80">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    required
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
                    className="w-full rounded-sm border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/40 focus:border-[#D4AF37] focus:outline-none"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-white/80">
                    País
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-sm border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/40 focus:border-[#D4AF37] focus:outline-none"
                    placeholder="Colombia"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-white/80">
                    Teléfono (opcional)
                  </label>
                  <input
                    type="tel"
                    className="w-full rounded-sm border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/40 focus:border-[#D4AF37] focus:outline-none"
                    placeholder="+57 300 000 0000"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="mb-2 block text-sm text-white/80">
                  Mensaje (opcional)
                </label>
                <textarea
                  rows={4}
                  className="w-full rounded-sm border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/40 focus:border-[#D4AF37] focus:outline-none"
                  placeholder="¿Te gustaría compartir por qué apoyas este proyecto?"
                />
              </div>

              <div className="mt-6">
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    className="mt-1 h-5 w-5 rounded border-white/20 bg-white/5 text-[#D4AF37] focus:ring-[#D4AF37]"
                  />
                  <span className="text-sm text-white/70">
                    Deseo recibir actualizaciones sobre el impacto de mi donación y noticias
                    de Semana de las Cuerdas
                  </span>
                </label>
              </div>
            </div>

            {/* Submit */}
            <div className="text-center">
              {submitted ? (
                <div className="inline-flex items-center gap-2 rounded-sm bg-green-600/20 px-8 py-4 text-green-400">
                  <Check className="h-5 w-5" />
                  ¡Gracias por tu generosidad!
                </div>
              ) : (
                <button
                  type="submit"
                  className="rounded-sm bg-[#D4AF37] px-12 py-4 text-lg text-black transition-all hover:bg-[#C5A028]"
                >
                  Procesar donación
                </button>
              )}
              <p className="mt-4 text-sm text-white/60">
                Pago seguro procesado por Stripe. Tax-deductible.
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* Other Ways to Help */}
      <section className="bg-black py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-4xl">
            Otras formas de <span className="text-[#D4AF37]">ayudar</span>
          </h2>

          <div className="space-y-6">
            <div className="rounded-sm border border-white/10 bg-white/5 p-8">
              <h3 className="mb-3 text-2xl text-[#D4AF37]">Voluntariado</h3>
              <p className="text-white/70">
                Necesitamos apoyo logístico, fotógrafos, documentalistas, traductores,
                y profesionales dispuestos a ofrecer talleres complementarios
                (salud del músico, manejo de ansiedad, construcción de carrera).
              </p>
            </div>

            <div className="rounded-sm border border-white/10 bg-white/5 p-8">
              <h3 className="mb-3 text-2xl text-[#D4AF37]">Donación en especie</h3>
              <p className="text-white/70">
                Alojamiento, transporte, alimentación, instrumentos, partituras, equipos
                de grabación. Si puedes donar servicios o productos, contáctanos.
              </p>
            </div>

            <div className="rounded-sm border border-white/10 bg-white/5 p-8">
              <h3 className="mb-3 text-2xl text-[#D4AF37]">Difusión</h3>
              <p className="text-white/70">
                Comparte nuestra misión en redes sociales, conecta a jóvenes talentos
                con nosotros, ayuda a identificar potenciales donantes o aliados.
                Tu red puede abrir puertas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Transparency */}
      <section className="border-t border-white/10 bg-[#0a0a0a] py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-4xl">
            Compromiso con la <span className="text-[#D4AF37]">transparencia</span>
          </h2>

          <div className="rounded-sm border border-[#D4AF37]/30 bg-[#D4AF37]/5 p-8">
            <ul className="space-y-4 text-white/70">
              <li className="flex items-start gap-3">
                <span className="text-[#D4AF37]">✓</span>
                <span>
                  Publicamos reportes anuales detallados sobre ingresos, gastos y resultados
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#D4AF37]">✓</span>
                <span>
                  Los donantes de becas específicas reciben actualizaciones del músico beneficiado
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#D4AF37]">✓</span>
                <span>
                  100% de las donaciones se destina al programa (costos administrativos cubiertos
                  por Fundación Vivat)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#D4AF37]">✓</span>
                <span>
                  Auditoría externa anual de todas las finanzas de la fundación
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-black py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 text-4xl">¿Preguntas sobre donaciones?</h2>
          <p className="mb-10 text-xl text-white/60">
            Estamos aquí para responder cualquier inquietud sobre cómo tu aporte
            marca la diferencia.
          </p>
          <Link
            to="/contacto"
            className="inline-block rounded-sm border border-white/20 px-10 py-4 text-lg transition-all hover:border-white/40 hover:bg-white/5"
          >
            Contáctanos
          </Link>
        </div>
      </section>
    </div>
  );
}