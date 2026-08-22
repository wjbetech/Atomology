import React from "react";
import ErrorFallback from "./ErrorFallback";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  /** Injectable for tests; defaults to a full page reload. */
  onReloadPage?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * App-wide crash guard. When any child throws during render, shows a
 * fallback with two manual recovery paths instead of a white screen.
 */
export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): Partial<ErrorBoundaryState> {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, errorInfo: React.ErrorInfo) {
    // Single catch point for the whole app; see issue #36 for wiring real
    // production error reporting here.
    console.error("Unhandled render error:", error, errorInfo);
  }

  reset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback
          onReset={this.reset}
          onReloadPage={this.props.onReloadPage}
        />
      );
    }
    return this.props.children;
  }
}
