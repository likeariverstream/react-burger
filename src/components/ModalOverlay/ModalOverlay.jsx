import React from "react";
import styles from './ModalOverlay.module.css';

export default function ModalOverlay({onMouseDown}) {

  return (
    <div className={styles.overlay} onMouseDown={onMouseDown}>
    </div>
  )
}