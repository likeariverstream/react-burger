import React from "react";
import styles from './BurgerIngredients.module.css';
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';

const ingredientShape = PropTypes.shape({
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
});

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientShape).isRequired
}

export default function BurgerIngredients({ data, onClick, handleOpenIngredientDetails }) {

  console.log(data)
  return (<div className={styles.scroll}>
    <p className={`${styles.title} text text_type_main-medium mt-10`}>
      Булки
    </p>
    <div className={styles.buns}>
      {data.map((element) => {
        if (element.type === 'bun') {
          return <div key={element._id} className={styles.ingredient}>
            {element.count > 0 &&
              <div className={styles.counter}>
                <Counter id={element._id} count={element.count} size="default" />
              </div>}
            <img className={styles.image}
              id={element._id}
              src={element.image}
              alt={element.name}
              onClick={handleOpenIngredientDetails}
            />
            <div className={styles.price}>
              <p className="text text_type_digits-default" >
                {element.price}
              </p>
              <CurrencyIcon type="primary" />
            </div>
            <p className={`${styles.name} text text_type_main-default`}
              onClick={onClick}
              id={element._id}
            >
              {element.name}
            </p>
          </div>
        }
      })
      }
    </div>
    <p className={`${styles.title} text text_type_main-medium mt-10 pt-5`}>
      Соусы
    </p>
    <div className={styles.sauces}>
      {data.map((element) => {
        if (element.type === 'sauce') {
          return <div key={element._id} className={styles.ingredient}>
            {element.count > 0 &&
              <div className={styles.counter}>
                <Counter id={element._id} count={element.count} size="default" />
              </div>}
            <img className={styles.image}
              id={element._id}
              src={element.image}
              alt={element.name}
              onClick={handleOpenIngredientDetails}
            />
            <div className={styles.price}>
              <p className="text text_type_digits-default">
                {element.price}
              </p>
              <CurrencyIcon type="primary" />

            </div>
            <p className={`${styles.name} text text_type_main-default`}
              onClick={onClick}
              id={element._id}
            >
              {element.name}
            </p>
          </div>
        }
      })
      }
    </div>
    <p className={`${styles.title} text text_type_main-medium mt-10`}>
      Начинки
    </p>
    <div className={styles.mains}>
      {data.map((element) => {
        if (element.type === 'main') {
          return <div key={element._id} className={styles.ingredient}>
            {element.count > 0 &&
              <div className={styles.counter}>
                <Counter id={element._id} count={element.count} size="default" />
              </div>}
            <img className={styles.image}
              id={element._id}
              src={element.image}
              alt={element.name}
              onClick={handleOpenIngredientDetails} />
            <div className={styles.price}>
              <p className="text text_type_digits-default">
                {element.price}
              </p>
              <CurrencyIcon type="primary" />

            </div>
            <p className={`${styles.name} text text_type_main-default`}
              onClick={onClick}
              id={element._id}
            >
              {element.name}
            </p>
          </div>
        }
      })
      }

    </div>

  </div>)
}