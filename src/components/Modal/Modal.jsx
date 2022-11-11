import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';

const Modal = ({ active, onClose, children }) => {
  const [domReady, setDomReady] = React.useState(false);

  useEffect(() => {
    setDomReady(true);
  }, [setDomReady]);

  return domReady
    ? createPortal(
        <div
          className={
            active ? `${styles.modal} ${styles.active}` : `${styles.modal}`
          }
          onClick={onClose}
        >
          <div
            className={
              active
                ? `${styles.modal__content} ${styles.active}`
                : `${styles.modal__content}`
            }
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>,
        document.getElementById('overlay-root')
      )
    : null;
};

export default Modal;
