import { Component } from 'react';
import SearchBar from '@components/searchbar/Searchbar';
import Results from '@components/results/Results';

class App extends Component {
  state = {
    searchTerm: '',
    results: [],
  };

  handleSearch = (term: string) => {
    const mockResults = [
      { name: 'Zelda', description: 'The main princess.' },
      {
        name: 'Link',
        description: 'The main warrior who needs to find Zelda.',
      },
    ];

    this.setState({ searchTerm: term, results: mockResults });
  };

  render() {
    return (
      <div>
        <SearchBar onSearch={this.handleSearch} />
        <Results results={this.state.results} />
      </div>
    );
  }
}

export default App;
