import { Component } from 'react';

type MyState = { hasError: boolean; error: any };

class ErrorBoundary extends Component<any, MyState> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    console.log(error);
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong. Please try to reload again.</h1>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
