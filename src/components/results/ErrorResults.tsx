interface ErrorResultsProps {
  error: string;
}

function ErrorResults({ error }: ErrorResultsProps) {
  return <h3 className="text-red-600">{error || 'Something went wrong'}</h3>;
}

export default ErrorResults;
