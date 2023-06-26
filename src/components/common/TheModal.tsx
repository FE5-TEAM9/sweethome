import { useEffect, useRef } from "react";
import styles from "~/styles/TheModal.module.scss";

const TheModal = ({ setModalOpen, id, title, content, writer }: PropsType) => {
  const closeModal = () => {
    setModalOpen(false);
  };
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <div
      ref={modalRef}
      className={styles.modal}>
      <button
        type="button"
        className={styles.close}
        onClick={closeModal}>
        X
      </button>
      <div>
        {id}
      </div>
    </div>
  );
};

export default TheModal;
