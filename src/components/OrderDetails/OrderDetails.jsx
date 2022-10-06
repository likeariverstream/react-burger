import React from "react";
import styles from './OrderDetails.module.css';
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
      <p className="text text_type_main-small" 
      style={{marginTop: 12,
         marginBottom: 120}}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>

  )
}