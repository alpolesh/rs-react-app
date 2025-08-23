type Props = {
  modalType: string;
  openModal: (modalType: string) => void;
};

export default function ModalButton({ modalType, openModal }: Props) {
  return (
    <button
      onClick={() => openModal(modalType)}
      className="bg-purple-600"
      aria-label="Open modal"
    >
      Open modal
    </button>
  );
}
