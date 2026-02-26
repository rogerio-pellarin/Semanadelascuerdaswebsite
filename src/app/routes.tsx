import { createBrowserRouter, Navigate } from "react-router";
import Root from "./components/Root";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Audiciona from "./pages/Audiciona";
import ElPrograma from "./pages/ElPrograma";
import Maestros from "./pages/Maestros";
import Galeria from "./pages/Galeria";
import Impacto from "./pages/Impacto";
import Fundacion from "./pages/Fundacion";
import Apoya from "./pages/Apoya";
import EdicionesAnteriores from "./pages/EdicionesAnteriores";
import Noticias from "./pages/Noticias";
import Contacto from "./pages/Contacto";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminSetup from "./pages/AdminSetup";
import EditHome from "./pages/admin/EditHome";
import EditPrograma from "./pages/admin/EditPrograma";
import EditMaestros from "./pages/admin/EditMaestros";
import EditImpacto from "./pages/admin/EditImpacto";
import EditFundacion from "./pages/admin/EditFundacion";
import EditApoya from "./pages/admin/EditApoya";
import EditSettings from "./pages/admin/EditSettings";
import EditGaleria from "./pages/admin/EditGaleria";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "audiciona", Component: Audiciona },
      { path: "programa", Component: ElPrograma },
      { path: "maestros", Component: Maestros },
      { path: "galeria", Component: Galeria },
      { path: "impacto", Component: Impacto },
      { path: "fundacion", Component: Fundacion },
      { path: "apoya", Component: Apoya },
      { path: "ediciones-anteriores", Component: EdicionesAnteriores },
      { path: "noticias", Component: Noticias },
      { path: "contacto", Component: Contacto },
      { path: "admin/login", Component: AdminLogin },
      { path: "admin/setup", Component: AdminSetup },
      {
        path: "admin",
        element: (
          <ProtectedRoute>
            <Navigate to="/admin/edit-home" replace />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/edit-home",
        element: (
          <ProtectedRoute>
            <EditHome />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/edit-programa",
        element: (
          <ProtectedRoute>
            <EditPrograma />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/edit-maestros",
        element: (
          <ProtectedRoute>
            <EditMaestros />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/edit-galeria",
        element: (
          <ProtectedRoute>
            <EditGaleria />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/edit-impacto",
        element: (
          <ProtectedRoute>
            <EditImpacto />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/edit-fundacion",
        element: (
          <ProtectedRoute>
            <EditFundacion />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/edit-apoya",
        element: (
          <ProtectedRoute>
            <EditApoya />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/settings",
        element: (
          <ProtectedRoute>
            <EditSettings />
          </ProtectedRoute>
        ),
      },
      { path: "*", Component: NotFound },
    ],
  },
]);