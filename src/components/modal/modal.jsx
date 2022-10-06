import React from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './modal.module.css'
import ModalOverlay from "../modal-overlay/modal-overlay";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import PropTypes from 'prop-types';



const modalShape = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string,
  image_large: PropTypes.string,
  __v: PropTypes.number,
  count: PropTypes.number
});



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

Modal.propTypes = {
  ingredient: modalShape
}