import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './PriceCount.module.css';

export default function PriceCount({data}) {
  data.reduce((acc, item) => acc + item.price, 0);
  return (
    <div className={styles.count}>
      <p className="text text_type_digits-medium">{ data.reduce((acc, item) => acc + item.price, 0) }</p>
      <CurrencyIcon type="primary" />
    </div>
  )
}