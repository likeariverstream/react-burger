import React, { Fragment, ReactNode, FC } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './modal.module.css'
import {ModalOverlay} from "../modal-overlay/modal-overlay";
import PropTypes from 'prop-types';

type TModal = {
  onClick: () => void,
  onClose: () => void,
  children: ReactNode,
  TIconTypes?: 'secondary' | 'primary' | 'error' | 'success' 
}

export const Modal: FC<TModal> = ({ onClick, onClose, children }) => {
  React.useEffect(() => {
    const closeByEsc = ((e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    });
    document.addEventListener('keydown', closeByEsc);
    return () => document.removeEventListener('keydown', closeByEsc)
  }, [onClose]);
  return createPortal(
    <>
      <ModalOverlay onMouseDown={onClick} />
      <div className={styles.modal}>
        {children}
        <div className={styles.icon}>
          <CloseIcon type='primary' onClick={onClick} /> 
        </div>
      </div>
    </>,
    document.getElementById('modals') as HTMLDivElement
  )
}

Modal.propTypes = {
  onClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
}
