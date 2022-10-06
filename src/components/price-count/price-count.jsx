import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './price-count.module.css';
import PropTypes from 'prop-types';



const priceCountShape = PropTypes.shape({
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

export default function PriceCount({data}) {
  data.reduce((acc, item) => acc + item.price, 0);
  return (
    <div className={styles.count}>
      <p className="text text_type_digits-medium mr-3">{ data.reduce((acc, item) => acc + item.price, 0) }</p>
      <CurrencyIcon type="primary" />
    </div>
  )
}


PriceCount.propTypes = {
  data: PropTypes.arrayOf(priceCountShape).isRequired
}