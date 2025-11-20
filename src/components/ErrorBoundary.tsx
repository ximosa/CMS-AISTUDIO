import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8 border-l-4 border-red-500">
            <h1 className="text-2xl font-bold text-red-700 mb-4">¡Ups! Algo salió mal</h1>
            <p className="text-gray-600 mb-4">
              Se ha producido un error que impide cargar la aplicación. Por favor, envía una captura de pantalla de este error al desarrollador.
            </p>
            
            <div className="bg-gray-900 rounded-md p-4 overflow-x-auto">
              <p className="text-red-400 font-mono text-sm font-bold mb-2">
                {this.state.error && this.state.error.toString()}
              </p>
              <pre className="text-gray-400 font-mono text-xs whitespace-pre-wrap">
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </pre>
            </div>

            <button 
              onClick={() => window.location.reload()}
              className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Recargar Página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
