import React from "react";
import styles from './OrderDetails.module.css';
import image from '../../images/done.png';

export default function OrderDetails() {

  return (
    <div>
      <h2 className={`${styles.title} text text_type_main-large`}>034536</h2>
      <h3 className={`${styles.title} text text_type_main-medium`}>идентификатор заказа</h3>
      <img className={styles.image}
        src={image}
        alt='Заказ готовится'
      />
      <p className="text text_type_main-small">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-small">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>

  )
}