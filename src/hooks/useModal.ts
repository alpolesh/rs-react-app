import { useState } from 'react';

export default function useModal(): [
  boolean,
  string,
  (modalType: string) => void,
  () => void,
] {
  const [isModalOpen, setIsmodalOpen] = useState(false);
  const [modalType, setModalType] = useState('');

  const openModal = (modalType: string) => {
    setIsmodalOpen(true);
    setModalType(modalType);
  };

  const closeModal = () => {
    setIsmodalOpen(false);
    setModalType('');
  };

  return [isModalOpen, modalType, openModal, closeModal];
}
