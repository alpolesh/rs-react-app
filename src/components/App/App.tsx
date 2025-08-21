import useModal from '@src/hooks/useModal';
import InfoCard from '@components/InfoCard/InfoCard';
import Modal from '@components/Modal/Modal';
import ModalButton from '@components/ModalButton/ModalButton';

function App() {
  const [, modalType, openModal, closeModal] = useModal();
  return (
    <div className="min-h-screen flex gap-4 px-4 py-4">
      <div className="w-1/2">
        <ModalButton modalType="uncontrolled" openModal={openModal} />
        <InfoCard title="Uncontrolled form" />
      </div>

      <div className="w-1/2">
        <ModalButton modalType="react-hook-form" openModal={openModal} />
        <InfoCard title="React Hook Form" />
      </div>

      {modalType && (
        <Modal hide={closeModal}>
          {modalType === 'uncontrolled' && <h1>Uncontrolled form</h1>}
          {modalType === 'react-hook-form' && <h1>React hook form</h1>}
        </Modal>
      )}
    </div>
  );
}

export default App;
