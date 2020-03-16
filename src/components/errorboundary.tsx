import React from 'react';

import { Error } from './error';

type ErrorBoundaryProps = {};
type ErrorBoundaryState = {
  hasError: boolean;
};

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error | null) {
    console.error(error);
    this.setState({ hasError: true });
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return <Error />;
    }
    return children;
  }
}
