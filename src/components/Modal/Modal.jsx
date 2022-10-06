import React from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './Modal.module.css'
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import OrderDetails from "../OrderDetails/OrderDetails";
import ingredientShape from '../BurgerIngredients/BurgerIngredients.jsx';

Modal.propTypes = {
  ingredient: ingredientShape
}

export default function Modal({ ingredient, onClick, onClose }) {
  // console.log(ingredient)
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


