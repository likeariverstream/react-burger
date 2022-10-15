import React from "react";
import styles from './burger-ingredients.module.css';
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";


export default function BurgerIngredients({ onClick, handleOpenIngredientDetails }) {
  const data = useSelector(state => state.ingredients.ingredientsList);
  return (
    data && <div className={styles.scroll}>
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
                onClick={(e) => handleOpenIngredientDetails(e, element)} />
              <div className={styles.price}>
                <p className="text text_type_digits-default" >
                  {element.price}
                </p>
                <CurrencyIcon type="primary" />
              </div>
              <p className={`${styles.name} text text_type_main-default`}
                onClick={(e) => onClick(e, element)}
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
                onClick={(e) => handleOpenIngredientDetails(e, element)}
              />
              <div className={styles.price}>
                <p className="text text_type_digits-default">
                  {element.price}
                </p>
                <CurrencyIcon type="primary" />

              </div>
              <p className={`${styles.name} text text_type_main-default`}
                onClick={(e) => onClick(e, element)}
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
                onClick={(e) => handleOpenIngredientDetails(e, element)} />
              <div className={styles.price}>
                <p className="text text_type_digits-default">
                  {element.price}
                </p>
                <CurrencyIcon type="primary" />

              </div>
              <p className={`${styles.name} text text_type_main-default`}
                onClick={(e) => onClick(e, element)}
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
