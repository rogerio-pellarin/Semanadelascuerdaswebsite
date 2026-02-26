import { Link } from "react-router";
import { Award, Heart, Users, Globe } from "lucide-react";

const values = [
  {
    icon: Award,
    title: "Excelencia sin excusas",
    description: "Creemos en estándares internacionales. No bajamos el nivel: creamos las condiciones para que los músicos lo alcancen."
  },
  {
    icon: Heart,
    title: "Acceso equitativo",
    description: "El talento está distribuido democráticamente, pero las oportunidades no. Trabajamos para cerrar esa brecha con becas y apoyo integral."
  },
  {
    icon: Users,
    title: "Comunidad y colaboración",
    description: "Formamos músicos que tocan juntos, aprenden juntos y se apoyan mutuamente. La música es un acto colectivo."
  },
  {
    icon: Globe,
    title: "Identidad latinoamericana",
    description: "Somos rigurosos en técnica europea, pero conscientes de nuestra identidad. Celebramos el repertorio y la sensibilidad de nuestra región."
  }
];

const programs = [
  {
    title: "Semana de las Cuerdas",
    description: "Programa intensivo anual de formación con maestros internacionales para cuerdas y piano. Clases individuales, masterclasses, música de cámara y conciertos."
  },
  {
    title: "Programa de Becas",
    description: "85% de nuestros participantes reciben apoyo financiero total o parcial. Evaluamos mérito artístico y necesidad económica sin comprometer el nivel de exigencia."
  },
  {
    title: "Red de Exalumnos",
    description: "Mantenemos contacto y apoyo continuo. Facilitamos conexiones profesionales, cartas de recomendación y orientación para estudios superiores."
  }
];

const team = [
  {
    name: "María Fernanda López",
    role: "Directora Artística y Fundadora",
    bio: "Violinista. Estudios en Juilliard y Conservatorio de París. Ex miembro de Ensemble Intercontemporain."
  },
  {
    name: "Carlos Andrés Gómez",
    role: "Coordinador Académico",
    bio: "Pianista y pedagogo. Especialista en cámara. Docente del Conservatorio de Medellín desde 2012."
  },
  {
    name: "Lucía Ramírez",
    role: "Directora Administrativa",
    bio: "Gestora cultural. MBA con enfoque en organizaciones sin ánimo de lucro. 15 años en sector artístico."
  }
];

export default function Fundacion() {
  return (
    <div>
      {/* Header */}
      <section className="relative flex min-h-[60vh] items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1759426080881-a48d26d02c57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmNoZXN0cmElMjByZWhlYXJzYWwlMjBjaGFtYmVyJTIwbXVzaWN8ZW58MXx8fHwxNzcxOTkwNTkyfDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Fundación Vivat"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="mb-6 text-5xl md:text-6xl">Fundación Vivat</h1>
            <p className="text-2xl text-white/80">
              Transformando vidas a través de la música.
              <br />
              Construyendo un ecosistema de excelencia artística y movilidad social.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-black py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center text-4xl">
            Nuestra <span className="text-[#D4AF37]">misión</span>
          </h2>
          <p className="mb-6 text-center text-xl text-white/70">
            Democratizar el acceso a formación musical de élite para jóvenes talentos
            latinoamericanos, creando oportunidades de transformación artística, personal
            y social a través de programas intensivos con maestros internacionales.
          </p>
          <p className="text-center text-lg text-white/60">
            Creemos que el arte de alto nivel no es un privilegio: es un derecho
            de quienes tienen el talento, el compromiso y la pasión, independientemente
            de su origen socioeconómico.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#0a0a0a] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-16 text-center text-4xl">
            Nuestros <span className="text-[#D4AF37]">valores</span>
          </h2>

          <div className="grid gap-8 md:grid-cols-2">
            {values.map((value, idx) => (
              <div
                key={idx}
                className="rounded-sm border border-white/10 bg-white/5 p-8"
              >
                <value.icon className="mb-4 h-10 w-10 text-[#D4AF37]" />
                <h3 className="mb-4 text-2xl">{value.title}</h3>
                <p className="text-white/70">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="bg-black py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-16 text-center text-4xl">
            Nuestros <span className="text-[#D4AF37]">programas</span>
          </h2>

          <div className="space-y-6">
            {programs.map((program, idx) => (
              <div
                key={idx}
                className="rounded-sm border border-white/10 bg-white/5 p-8"
              >
                <h3 className="mb-3 text-2xl text-[#D4AF37]">{program.title}</h3>
                <p className="text-lg text-white/70">{program.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="bg-[#0a0a0a] py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-4xl">
            Nuestra <span className="text-[#D4AF37]">historia</span>
          </h2>

          <div className="space-y-6 text-lg text-white/70">
            <p>
              Fundación Vivat nació en 2018 de una pregunta simple: ¿por qué los jóvenes
              músicos latinoamericanos con talento excepcional deben emigrar para acceder
              a formación de élite?
            </p>
            <p>
              María Fernanda López, violinista colombiana con experiencia internacional,
              decidió traer el nivel de exigencia y pedagogía de los grandes conservatorios
              europeos a Medellín. No como una copia, sino como una propuesta propia: intensidad
              artística con calidez humana, rigor técnico con respeto a la individualidad.
            </p>
            <p>
              La primera edición de Semana de las Cuerdas tuvo 20 participantes. La séptima
              edición (2025) reunió a más de 35 músicos de 8 países, con maestros de orquestas
              como Berlin Philharmonic, Royal Concertgebouw, y Chicago Symphony Orchestra.
            </p>
            <p>
              Hoy, Fundación Vivat es una referencia en formación musical de alto nivel en
              Latinoamérica. Nuestros exalumnos estudian en Juilliard, Curtis, Conservatorio
              de París. Otros tocan en orquestas profesionales. Todos llevan consigo la certeza
              de que la excelencia es posible desde aquí.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-black py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-16 text-center text-4xl">
            Nuestro <span className="text-[#D4AF37]">equipo</span>
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            {team.map((member, idx) => (
              <div
                key={idx}
                className="rounded-sm border border-white/10 bg-white/5 p-8 text-center"
              >
                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#D4AF37]/10 text-4xl text-[#D4AF37]">
                  {member.name.charAt(0)}
                </div>
                <h3 className="mb-2 text-xl">{member.name}</h3>
                <p className="mb-4 text-sm text-[#D4AF37]">{member.role}</p>
                <p className="text-sm text-white/60">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="border-t border-white/10 bg-[#0a0a0a] py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-4xl">
            Aliados <span className="text-[#D4AF37]">institucionales</span>
          </h2>
          
          <p className="mb-12 text-center text-white/60">
            Trabajamos con organizaciones que comparten nuestra visión de democratizar
            el acceso a la excelencia artística y construir un ecosistema musical sostenible.
          </p>

          <div className="rounded-sm border border-white/10 bg-white/5 p-8">
            <h3 className="mb-4 text-center text-xl text-[#D4AF37]">
              ¿Tu organización quiere ser aliada?
            </h3>
            <p className="mb-6 text-center text-white/70">
              Buscamos empresas, fundaciones, gobiernos locales y organizaciones culturales
              interesadas en invertir en la formación de jóvenes talentos.
            </p>
            <div className="text-center">
              <Link
                to="/contacto"
                className="inline-block rounded-sm bg-[#D4AF37] px-8 py-3 text-black transition-all hover:bg-[#C5A028]"
              >
                Contáctanos
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 text-4xl">
            Únete a la <span className="text-[#D4AF37]">transformación</span>
          </h2>
          <p className="mb-10 text-xl text-white/60">
            Ya sea como donante, aliado institucional o voluntario,
            tu apoyo hace posible esta misión.
          </p>
          <Link
            to="/apoya"
            className="inline-block rounded-sm bg-[#D4AF37] px-10 py-4 text-lg text-black transition-all hover:bg-[#C5A028]"
          >
            Cómo apoyar
          </Link>
        </div>
      </section>
    </div>
  );
}