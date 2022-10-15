import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './price-count.module.css';
import { useSelector } from "react-redux";

export default function PriceCount() {
  const data = useSelector(state => state.constructorList.constructorList)
  const bun = data.filter(element => element.type === 'bun');
  const totalPrice = [...data, ...bun].reduce((acc, item) => acc + item.price, 0);
  return (
    <div className={styles.count}>
      <p className="text text_type_digits-medium mr-3">{totalPrice}</p>
      <CurrencyIcon type="primary" />
    </div>
  )
}