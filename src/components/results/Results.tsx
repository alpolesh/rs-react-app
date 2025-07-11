import { Component } from 'react';

interface SearchResult {
  name: string;
  description: string;
}

interface ResultsProps {
  results: SearchResult[];
}

class Results extends Component<ResultsProps> {
  render() {
    const { results } = this.props;

    return (
      <div>
        <h3>Search Results:</h3>
        {results.length === 0 ? (
          <p>No results found.</p>
        ) : (
          <ul>
            {results.map((item, index) => (
              <li key={index}>
                <strong>{item.name}</strong>: {item.description}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default Results;
