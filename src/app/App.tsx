import { RouterProvider } from 'react-router';
import { router } from './routes';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    document.title = 'Semana de las Cuerdas';
  }, []);

  return <RouterProvider router={router} />;
}

export default App;