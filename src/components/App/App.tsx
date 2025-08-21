import InfoCard from '@components/InfoCard/InfoCard';

function App() {
  return (
    <div className="min-h-screen flex gap-4 px-4 py-4">
      <div className="w-1/2">
        <InfoCard />
      </div>

      <div className="w-1/2">
        <InfoCard />
      </div>
    </div>
  );
}

export default App;
