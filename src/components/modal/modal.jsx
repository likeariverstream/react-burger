import React from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './modal.module.css'
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from 'prop-types';

export default function Modal({ onClick, onClose, children}) {
  
  React.useEffect(() => {
    const closeByEsc = ((e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    });
    document.addEventListener('keydown', closeByEsc);
    return () => document.removeEventListener('keydown', closeByEsc)
  }, []);

  return createPortal(
     <>
      <ModalOverlay onMouseDown={onClick} />
      <div  className={styles.modal}>
        {children}
        <div className={styles.icon}>
          <CloseIcon onClick={onClick} />
        </div>
      </div>
    </>,
    document.getElementById('modals')
  )
}

Modal.propTypes = {
  onClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
}