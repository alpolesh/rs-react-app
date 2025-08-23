import useModal from '@src/hooks/useModal';
import { useSelector } from 'react-redux';
import type { RootState } from '@src/store/index';
import InfoCard from '@components/InfoCard/InfoCard';
import Modal from '@components/Modal/Modal';
import ModalButton from '@components/ModalButton/ModalButton';
import UncontrolledForm from '@components/UncontrolledForm/UncontrolledForm';
import ReactHookForm from '@components/ReactHookForm/ReactHookForm';
import type { FormsData } from '@src/types/FormDataState';

function App() {
  const [, modalType, openModal, closeModal] = useModal();
  const formsData = useSelector<RootState, FormsData>(
    (state) => state.formsData
  );
  return (
    <div className="min-h-screen flex gap-4 px-4 py-4">
      <div className="w-1/2">
        <ModalButton modalType="uncontrolled" openModal={openModal} />
        <InfoCard
          title="Uncontrolled form"
          formData={formsData.uncontrolledFormData}
        />
      </div>

      <div className="w-1/2">
        <ModalButton modalType="react-hook-form" openModal={openModal} />
        <InfoCard
          title="React Hook Form"
          formData={formsData.reactHookFormData}
        />
      </div>

      {modalType && (
        <Modal hide={closeModal}>
          {modalType === 'uncontrolled' && (
            <UncontrolledForm hide={closeModal} />
          )}
          {modalType === 'react-hook-form' && (
            <ReactHookForm hide={closeModal} />
          )}
        </Modal>
      )}
    </div>
  );
}

export default App;
