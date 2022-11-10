import React from "react";
import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

export function ModalOverlay({ onMouseDown }) {

  return (
    <div className={styles.overlay} onMouseDown={onMouseDown}>
    </div>
  )
}

ModalOverlay.propTypes = {
  onMouseDown: PropTypes.func.isRequired
}
