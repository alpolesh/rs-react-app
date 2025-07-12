import { Component } from 'react';
import SearchBar from '@components/searchbar/Searchbar';
import Results from '@components/results/Results';

interface Game {
  name: string;
  description: string;
}
interface AppState {
  searchTerm: string;
  results: Game[];
  isLoading: boolean;
  error: string | null;
}
class App extends Component {
  state: AppState = {
    searchTerm: localStorage.getItem('searchTerm') || '',
    results: [],
    isLoading: false,
    error: null,
  };

  handleSearch = (term: string) => {
    this.loadData(term);
  };

  loadData = (term: string) => {
    this.setState({ isLoading: true, error: null });

    fetch(`https://zelda.fanapis.com/api/games?name=${term}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        this.setState({
          results: data.data,
          searchTerm: term,
        });
        localStorage.setItem('searchTerm', term);
      })
      .catch((error) => {
        this.setState({ error: error.message });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  componentDidMount() {
    this.loadData(this.state.searchTerm);
  }

  render() {
    return (
      <div>
        <SearchBar
          onSearch={this.handleSearch}
          searchTerm={this.state.searchTerm}
        />
        <Results results={this.state.results} />
      </div>
    );
  }
}

export default App;
