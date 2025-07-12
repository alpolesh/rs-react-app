import { Component } from 'react';

interface ErrorResultsProps {
  error: string;
}

class ErrorResults extends Component<ErrorResultsProps> {
  render() {
    return (
      <h3 className="text-red-600">
        {this.props.error || 'Something went wrong'}
      </h3>
    );
  }
}

export default ErrorResults;
