import style from "./Modal.module.css";

const Modal = ({ isOpen, onClose, onConfirm, children }) => {
  if (!isOpen) return null;

  return (
    <div className={style.overlay} onClick={onClose}>
      <div className={style.modal} onClick={(e) => e.stopPropagation()}>
        {children || (
          <>
            <h2>Are you sure?</h2>
            <p>Do you want to delete this contact?</p>
            <button className={style.button} onClick={onConfirm}>
              Yes
            </button>
            <button className={style.button} onClick={onClose}>
              No
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
