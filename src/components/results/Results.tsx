import { Component } from 'react';
import ErrorResults from '@components/results/ErrorResults';
import ResultItem from '@components/results/ResultItem';

interface SearchResult {
  name?: string;
  description?: string;
  id: string;
}

interface ResultsProps {
  results: SearchResult[];
  error: string | null;
}

interface ResultsState {
  simulateCrash: boolean;
}

class Results extends Component<ResultsProps, ResultsState> {
  state: ResultsState = {
    simulateCrash: false,
  };

  handleErrorButtonClick = () => {
    this.setState({ simulateCrash: true });
  };

  componentDidUpdate() {
    if (this.state.simulateCrash) {
      throw new Error('Simulated render error');
    }
  }

  render() {
    const { results, error } = this.props;

    return (
      <div className="bg-white rounded-xl shadow-md p-6 mx-auto mt-8 space-y-6 w-full">
        <h3 className="text-xl text-center font-semibold text-gray-800">
          Search Results
        </h3>

        {error ? (
          <div className="text-red-600">
            <ErrorResults error={error} />
          </div>
        ) : results.length === 0 ? (
          <p className="text-gray-500 italic">No results found.</p>
        ) : (
          <ul className="space-y-2">
            {results.map((item) => {
              return (
                <ResultItem
                  key={item.id}
                  name={item.name}
                  description={item.description}
                />
              );
            })}
          </ul>
        )}

        <div>
          <button
            onClick={this.handleErrorButtonClick}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Simulate Error
          </button>
        </div>
      </div>
    );
  }
}

export default Results;
