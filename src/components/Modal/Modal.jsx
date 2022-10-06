import React from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './modal.module.css'
import ModalOverlay from "../modal-overlay/modal-overlay";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import ingredientShape from '../burger-ingredients/burger-ingredients.jsx';

Modal.propTypes = {
  ingredient: ingredientShape
}

export default function Modal({ ingredient, onClick, onClose }) {
  const closeByEsc = ((e) => {
    if (e.key === 'Escape') {
      onClose()
    }
  });

  React.useEffect(() => {
    document.addEventListener('keydown', closeByEsc);

    return () => document.removeEventListener('keydown', closeByEsc)
  }, []);

  return createPortal(
    <>
      <ModalOverlay onMouseDown={onClick} />
      <div className={styles.modal}>
        <div className={styles.icon}><CloseIcon onClick={onClick} /></div>
        {ingredient ? <IngredientDetails ingredient={ingredient} /> : <OrderDetails />}
      </div>
    </>,
    document.getElementById('root')
  )
}


