import { Component } from 'react';

interface SearchbarProps {
  onSearch: (term: string) => void;
  searchTerm: string;
}

class Searchbar extends Component<SearchbarProps> {
  state = {
    input: this.props.searchTerm || '',
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ input: event.target.value });
  };

  handleSearchClick = () => {
    this.props.onSearch(this.state.input);
  };

  render() {
    return (
      <div>
        <input
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
