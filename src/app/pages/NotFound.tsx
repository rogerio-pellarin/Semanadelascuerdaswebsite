import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-black px-4">
      <div className="text-center">
        <h1 className="mb-4 text-9xl text-[#D4AF37]">404</h1>
        <h2 className="mb-6 text-4xl">Página no encontrada</h2>
        <p className="mb-8 text-xl text-white/60">
          La página que buscas no existe o ha sido movida.
        </p>
        <Link
          to="/"
          className="inline-block rounded-sm bg-[#D4AF37] px-8 py-3 text-black transition-all hover:bg-[#C5A028]"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
