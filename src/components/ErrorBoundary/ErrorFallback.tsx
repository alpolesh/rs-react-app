import { Component } from 'react';

class ErrorFallback extends Component {
  handleReload() {
    window.location.reload();
  }

  render() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-gray-100 text-center px-4">
        <div className="bg-white p-8 rounded-2xl shadow-md max-w-md w-full">
          <h1 className="text-2xl font-semibold text-red-600 mb-4">
            Oops! Something went wrong.
          </h1>
          <p className="text-gray-600 mb-6">
            An unexpected error occurred. Please try again or reload the page.
          </p>
          <button
            onClick={this.handleReload}
            className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
          >
            Reload App
          </button>
        </div>
      </div>
    );
  }
}

export default ErrorFallback;
