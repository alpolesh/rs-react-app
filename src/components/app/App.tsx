import { Component } from 'react';
import SearchBar from '@components/searchbar/Searchbar';
import Results from '@components/results/Results';
import Spinner from '@components/spinner/Spinner';
import { calculateWaitTime } from '@src/helpers';
import './App.css';

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
    const minSpinnerTime = 500;
    const startTime = Date.now();

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
        const waitTime = calculateWaitTime(minSpinnerTime, startTime);
        setTimeout(() => {
          this.setState({ isLoading: false });
        }, waitTime);
      });
  };

  componentDidMount() {
    this.loadData(this.state.searchTerm);
  }

  render() {
    return (
      <div className="app-container max-w-2xl mx-auto px-4 py-4">
        {this.state.isLoading && <Spinner />}
        <SearchBar
          onSearch={this.handleSearch}
          searchTerm={this.state.searchTerm}
        />
        <Results results={this.state.results} error={this.state.error} />
      </div>
    );
  }
}

export default App;
