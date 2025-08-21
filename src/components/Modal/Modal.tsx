import ReactDOM from 'react-dom';

type Props = {
  children: React.ReactNode;
  hide: () => void;
};

const Modal = ({ children, hide }: Props) =>
  ReactDOM.createPortal(
    <>
      <div className="fixed inset-0 bg-black/50 z-40" />

      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        aria-modal
        tabIndex={-1}
        role="dialog"
      >
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full relative">
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

export default Modal;
