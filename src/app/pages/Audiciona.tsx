import { CheckCircle, Video, AlertCircle } from "lucide-react";
import { useSiteImages } from "../hooks/useSiteImages";
import { useSiteConfig } from "../hooks/useSiteConfig";
import MailchimpForm from "../components/MailchimpForm";
import SEO, { getBreadcrumbStructuredData } from "../components/SEO";

export default function Audiciona() {
  const { images } = useSiteImages();
  const { config } = useSiteConfig();

  const headerImage = images?.audiciona?.headerImage || "https://images.unsplash.com/photo-1767998569881-003f30728849?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG11c2ljaWFuJTIwcHJhY3RpY2luZyUyMGludGVuc2V8ZW58MXx8fHwxNzcxOTkwNTkzfDA&ixlib=rb-4.1.0&q=80&w=1080";
  const auditionsOpen = config?.auditions_open || false;

  return (
    <div>
      <SEO 
        title="Audiciones Abiertas - Aplica para Semana de las Cuerdas 2026"
        description="Audiciones abiertas para músicos de cuerdas y piano de 15-25 años. Envía tu video de audición para participar en clases intensivas con maestros internacionales del 5-10 de octubre 2026. Becas disponibles para talentos excepcionales."
        keywords="audiciones música clásica, aplicación masterclass, audiciones violín cello, becas música, audiciones músicos jóvenes, clases maestros internacionales, audición video música, festival música Colombia"
        image={headerImage}
        structuredData={getBreadcrumbStructuredData([
          { name: "Inicio", url: "/" },
          { name: "Audiciona", url: "/audiciona" }
        ])}
      />
      
      {/* Header */}
      <section className="relative flex min-h-[50vh] items-center">
        <div className="absolute inset-0 z-0">
          <img
            src={headerImage}
            alt="Musician audition"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8">
          <h1 className="mb-6 text-5xl md:text-6xl">Audiciona</h1>
          <p className="mx-auto max-w-2xl text-xl text-white/80">
            El proceso de selección busca identificar músicos con alto potencial artístico,
            capacidad de trabajo intenso, y compromiso con la excelencia.
          </p>
        </div>
      </section>

      {/* Coming Soon / Open Notice */}
      <section className={`border-b border-white/10 py-8 ${
        auditionsOpen ? 'bg-green-500/10' : 'bg-[#D4AF37]/10'
      }`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3 text-center">
            <AlertCircle className={`h-6 w-6 ${auditionsOpen ? 'text-green-400' : 'text-[#D4AF37]'}`} />
            <p className={`text-lg ${auditionsOpen ? 'text-green-400' : 'text-[#D4AF37]'}`}>
              {auditionsOpen ? (
                'Las audiciones están ABIERTAS. ¡Envía tu video ahora!'
              ) : (
                'Las audiciones para la edición 2026 se abrirán en septiembre. Mientras tanto, revisa los requisitos y prepara tu video.'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Basic Requirements Section */}
      <section className="bg-black py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center text-3xl">Requisitos básicos</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-sm border border-white/10 bg-white/5 p-6">
              <h3 className="mb-3 text-xl text-[#D4AF37]">Edad</h3>
              <p className="text-white/70">Entre 15 y 25 años</p>
            </div>
            <div className="rounded-sm border border-white/10 bg-white/5 p-6">
              <h3 className="mb-3 text-xl text-[#D4AF37]">Instrumentos</h3>
              <p className="text-white/70">
                Violín, viola, cello, contrabajo, piano
              </p>
            </div>
            <div className="rounded-sm border border-white/10 bg-white/5 p-6">
              <h3 className="mb-3 text-xl text-[#D4AF37]">Nivel</h3>
              <p className="text-white/70">
                Avanzado o pre-profesional
              </p>
            </div>
            <div className="rounded-sm border border-white/10 bg-white/5 p-6">
              <h3 className="mb-3 text-xl text-[#D4AF37]">Compromiso</h3>
              <p className="text-white/70">
                Disponibilidad completa durante los 6 días (5-10 octubre 2026)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Audition Requirements */}
      <section className="bg-[#0a0a0a] py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl">Requisitos para el video de audición</h2>
            <p className="text-lg text-white/60">
              Para participar en la Semana de las Cuerdas debes presentar una audición con un video 
              con una pieza de tu elección, que refleje claramente tu nivel actual con el instrumento 
              (idealmente la última obra que hayas montado).
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4 rounded-sm border border-white/10 bg-white/5 p-6">
              <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-[#D4AF37]" />
              <div>
                <h3 className="mb-1 text-lg">Visibilidad de las manos</h3>
                <p className="text-white/70">
                  Ambas manos deben estar visibles en todo momento durante la interpretación.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-sm border border-white/10 bg-white/5 p-6">
              <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-[#D4AF37]" />
              <div>
                <h3 className="mb-1 text-lg">Presentación inicial</h3>
                <p className="text-white/70">
                  El video debe comenzar con una breve presentación que incluya nombre, edad y 
                  tiempo que llevas tocando el instrumento.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-sm border border-white/10 bg-white/5 p-6">
              <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-[#D4AF37]" />
              <div>
                <h3 className="mb-1 text-lg">Fondo neutro</h3>
                <p className="text-white/70">
                  El fondo debe ser lo más neutro posible, de ser posible no delante de una ventana.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-sm border border-white/10 bg-white/5 p-6">
              <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-[#D4AF37]" />
              <div>
                <h3 className="mb-1 text-lg">Sin ruido de fondo</h3>
                <p className="text-white/70">
                  Evita cualquier ruido de fondo que pueda interferir con la audición de tu interpretación.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-sm border border-white/10 bg-white/5 p-6">
              <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-[#D4AF37]" />
              <div>
                <h3 className="mb-1 text-lg">Cámara trasera</h3>
                <p className="text-white/70">
                  No grabes con la cámara frontal (selfie). Usa la cámara trasera de tu dispositivo 
                  o una cámara convencional.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-sm border border-white/10 bg-white/5 p-6">
              <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-[#D4AF37]" />
              <div>
                <h3 className="mb-1 text-lg">Sin edición</h3>
                <p className="text-white/70">
                  El video debe ser sin cortes ni edición (excepto si incluye más de una pieza).
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-sm border border-white/10 bg-white/5 p-6">
              <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-[#D4AF37]" />
              <div>
                <h3 className="mb-1 text-lg">Duración mínima</h3>
                <p className="text-white/70">
                  El video debe tener una duración mínima de 3 minutos.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-sm border border-white/10 bg-white/5 p-6">
              <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-[#D4AF37]" />
              <div>
                <h3 className="mb-1 text-lg">Envío simultáneo</h3>
                <p className="text-white/70">
                  Procura enviar el video al mismo tiempo que el formulario de inscripción. Si lo envías después, 
                  debes remitir el enlace a <a href="mailto:info@semanadelascuerdas.co" className="text-[#D4AF37] hover:underline">info@semanadelascuerdas.co</a> y 
                  esperar confirmación de recepción.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-sm border border-white/10 bg-white/5 p-6">
              <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-[#D4AF37]" />
              <div>
                <h3 className="mb-1 text-lg">Plataforma de alojamiento</h3>
                <p className="text-white/70">
                  El video debe quedar en un enlace a YouTube, Vimeo o Google Drive con permisos de visualización.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-sm border border-white/10 bg-white/5 p-6">
              <Video className="mt-1 h-6 w-6 flex-shrink-0 text-[#D4AF37]" />
              <div>
                <h3 className="mb-1 text-lg">Lo que realmente importa</h3>
                <p className="text-white/70">
                  No se evaluará la calidad de producción del video, sino la interpretación musical.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advice Video */}
      <section className="border-t border-white/10 bg-black py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="mb-4 text-3xl">Consejos para preparar tu video</h2>
            <p className="text-white/60">
              Mira estos consejos útiles para grabar tu video de audición de manera profesional
            </p>
          </div>

          <div className="overflow-hidden rounded-sm bg-black">
            <div className="relative aspect-video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/tBKYNdHZi8Q"
                title="Consejos para preparar tu video de audición"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="border-t border-white/10 bg-[#0a0a0a] py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl">Proceso de selección</h2>
          
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-[#D4AF37] text-[#D4AF37]">
                1
              </div>
              <div>
                <h3 className="mb-2 text-xl">Aplicación</h3>
                <p className="text-white/60">
                  Completa el formulario y envía tu video de audición antes de la fecha límite.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-[#D4AF37] text-[#D4AF37]">
                2
              </div>
              <div>
                <h3 className="mb-2 text-xl">Evaluación</h3>
                <p className="text-white/60">
                  Un comité de maestros internacionales revisa cada video con criterios de excelencia artística.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-[#D4AF37] text-[#D4AF37]">
                3
              </div>
              <div>
                <h3 className="mb-2 text-xl">Notificación</h3>
                <p className="text-white/60">
                  Los seleccionados reciben confirmación con detalles sobre becas, logística y programa.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-[#D4AF37] text-[#D4AF37]">
                4
              </div>
              <div>
                <h3 className="mb-2 text-xl">Confirmación</h3>
                <p className="text-white/60">
                  Confirma tu participación y prepárate para una semana de transformación artística.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-white/10 bg-black py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 text-4xl">¿Listo para audicionar?</h2>
          <p className="mb-8 text-xl text-white/60">
            Prepara tu video siguiendo estos requisitos. El formulario de audición estará 
            disponible a partir de septiembre 2026.
          </p>
          
          {/* Mailchimp Form - Hidden for now, will be shown when auditions open */}
          <MailchimpForm hidden={true} />
          
          <a
            href="mailto:info@semanadelascuerdas.co"
            className="inline-block rounded-sm border border-[#D4AF37] px-8 py-4 text-lg text-[#D4AF37] transition-all hover:bg-[#D4AF37] hover:text-black"
          >
            Contáctanos para más información
          </a>
        </div>
      </section>
    </div>
  );
}