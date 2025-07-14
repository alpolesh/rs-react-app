import { Component } from 'react';

interface ResultItemProps {
  name: string;
  description: string;
}

class ResultItem extends Component<ResultItemProps> {
  render() {
    const { name, description } = this.props;

    return (
      <li className="border border-gray-200 rounded-lg p-3 hover:shadow-sm transition">
        <strong className="text-gray-800">{name}</strong>
        <span className="text-gray-600">: {description}</span>
      </li>
    );
  }
}

export default ResultItem;
