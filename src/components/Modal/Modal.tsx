import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

type Props = {
  children: React.ReactNode;
  hide: () => void;
};

const Modal = ({ children, hide }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    previouslyFocusedElement.current = document.activeElement as HTMLElement;
    modalRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') hide();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocusedElement.current?.focus();
    };
  }, [hide]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) hide();
  };

  return ReactDOM.createPortal(
    <>
      <div className="fixed inset-0 bg-black/50 z-40" />

      <div
        ref={modalRef}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 outline-none"
        aria-modal="true"
        role="dialog"
        tabIndex={-1}
        onClick={handleOverlayClick}
      >
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full relative overflow-y-auto max-h-[95vh]">
          <button
            type="button"
            className="absolute top-2 !py-[3px] !px-[7px] right-2 bg-black"
            aria-label="Close"
            onClick={hide}
          >
            <span aria-hidden="true" className="text-2xl leading-none">
              &times;
            </span>
          </button>

          <div className="p-6">{children}</div>
        </div>
      </div>
    </>,
    document.body
  );
};

export default Modal;
