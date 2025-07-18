import { Component } from 'react';

interface SearchbarProps {
  onSearch: (term: string) => void;
  searchTerm: string;
}

interface SearchbarState {
  input: string;
}

class Searchbar extends Component<SearchbarProps, SearchbarState> {
  state = {
    input: this.props.searchTerm || '',
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ input: event.target.value });
  };

  handleSearchClick = () => {
    this.props.onSearch(this.state.input.trim());
    this.setState((prevState) => ({ input: prevState.input.trim() }));
  };

  render() {
    return (
      <div className="flex items-center justify-center space-x-4 p-4 max-w-sm mx-auto">
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ease-in-out duration-200"
          type="text"
          value={this.state.input}
          onChange={this.handleInputChange}
          placeholder="Search..."
        />
        <button onClick={this.handleSearchClick}>Search</button>
      </div>
    );
  }
}

export default Searchbar;
