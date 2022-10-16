import React from "react";
import styles from './order-details.module.css';
import image from '../../images/done.png';

export default function OrderDetails() {
  const generateId = () => {
    const value = `${new Date().getTime()}`
    return `${value.substring(value.length - 6)}`
  }
  
  return (
    <div className={styles.order}>
      <h2 className={`${styles.title} text text_type_digits-large`}>{generateId()}</h2>
      <h3 className={`${styles.subtitle} text text_type_main-medium`}>идентификатор заказа</h3>
      <img className={styles.image}
        src={image}
        alt='Заказ готовится'
      />
      <p className="text text_type_main-small">
        Ваш заказ начали готовить
      </p>
      <p className={`${styles.message} text text_type_main-small`} >
        Дождитесь готовности на орбитальной станции
      </p>
    </div>

  )
}