import React, { FC } from "react";
import styles from './modal-overlay.module.css';

type TModalOverlay = {
  onMouseDown: () => void
}

export const ModalOverlay: FC<TModalOverlay> = ({ onMouseDown }) => {

  return (
    <div className={styles.overlay} onMouseDown={onMouseDown}>
    </div>
  )
}
