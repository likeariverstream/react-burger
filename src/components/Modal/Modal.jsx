import React from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './Modal.module.css'
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import OrderDetails from "../OrderDetails/OrderDetails";

export default function Modal({ingredient, onClick}) {
  return createPortal(
    <>
      <ModalOverlay onMouseDown={onClick}/>
      <div className={styles.modal}>
        <div className={styles.icon}><CloseIcon onClick={onClick} /></div>
        {ingredient ? <IngredientDetails ingredient={ingredient} /> : <OrderDetails/>}
      </div>
    </>,
    document.getElementById('root')
  )
}