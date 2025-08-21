import { useState } from 'react';

export default function useModal(): [boolean, () => void] {
  const [isModalOpen, setIsmodalOpen] = useState(false);

  const toggleModalState = () => {
    setIsmodalOpen(!isModalOpen);
  };

  return [isModalOpen, toggleModalState];
}
