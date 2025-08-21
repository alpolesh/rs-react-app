import useModal from '@src/hooks/useModal';
import InfoCard from '@components/InfoCard/InfoCard';
import Modal from '@components/Modal/Modal';

function App() {
  const [isModalOpen, toggleModalState] = useModal();
  return (
    <div className="min-h-screen flex gap-4 px-4 py-4">
      <div className="w-1/2">
        <button
          onClick={toggleModalState}
          className="bg-purple-600"
          aria-label="Open modal"
        >
          Open modal
        </button>
        <InfoCard title="Uncontrolled form" />
      </div>

      <div className="w-1/2">
        <InfoCard title="React Hook Form" />
      </div>

      {isModalOpen && <Modal hide={toggleModalState} />}
    </div>
  );
}

export default App;
