function Spinner() {
  return (
    <div
      className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50"
      role="status"
      aria-label="Loading"
    >
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default Spinner;
