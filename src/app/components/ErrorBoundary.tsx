import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-black px-4">
          <div className="max-w-2xl text-center">
            <h1 className="mb-4 text-4xl text-[#D4AF37]">Algo salió mal</h1>
            <p className="mb-6 text-lg text-white/60">
              Ha ocurrido un error en la aplicación.
            </p>
            {this.state.error && (
              <pre className="mb-6 rounded-sm bg-red-500/10 p-4 text-left text-sm text-red-400">
                {this.state.error.toString()}
              </pre>
            )}
            <button
              onClick={() => window.location.reload()}
              className="rounded-sm bg-[#D4AF37] px-6 py-3 text-black transition-all hover:bg-[#C5A028]"
            >
              Recargar página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
