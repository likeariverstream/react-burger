import React from "react";
import styles from './BurgerIngredients.module.css';
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export default function BurgerIngredients({ data, onClick }) {

  return (<div className={styles.scroll}>
    <p className={`${styles.title} text text_type_main-medium mt-10`}>
      Булки
    </p>
    <div className={styles.buns}>
      {data.map((element) => {
        if (element[1].type === 'bun') {
          return <div key={element[1]._id} className={styles.ingredient}>
           { element[1].count > 0 && <Counter id={element[1]._id} count={element[1].count} size="default" />}
            <img className={styles.image}
              id={element[1]._id}
              src={element[1].image}
              alt={element[1].name}
              onClick={onClick}
            />
            <div>
              <p className="text text_type_digits-medium">
                {element[1].price}<CurrencyIcon type="primary" />
              </p>

            </div>
            <p className="text text_type_main-default">
              {element[1].name}
            </p>
          </div>
        }
      })
      }
    </div>
    <p className={`${styles.title} text text_type_main-medium mt-10`}>
      Соусы
    </p>
    <div className={styles.sauces}>
      {data.map((element) => {
        if (element[1].type === 'sauce') {
          return <div key={element[1]._id} className={styles.ingredient}>
           { element[1].count > 0 && <Counter id={element[1]._id} count={element[1].count} size="default" />}
            <img className={styles.image}
              id={element[1]._id}
              src={element[1].image}
              alt={element[1].name}
              onClick={onClick}
            />
            <div>
              <p className="text text_type_digits-medium">
                {element[1].price}<CurrencyIcon type="primary" />
              </p>

            </div>
            <p className="text text_type_main-default">
              {element[1].name}
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
        if (element[1].type === 'main') {
          return <div key={element[1]._id} className={styles.ingredient}>
           { element[1].count > 0 && <Counter id={element[1]._id} count={element[1].count} size="default" />}
            <img className={styles.image}
              id={element[1]._id}
              src={element[1].image}
              alt={element[1].name}
              onClick={onClick} />
            <div>
              <p className="text text_type_digits-medium">
                {element[1].price}<CurrencyIcon type="primary" />
              </p>

            </div>
            <p className="text text_type_main-default">
              {element[1].name}
            </p>
          </div>
        }
      })
      }

    </div>

  </div>)
}