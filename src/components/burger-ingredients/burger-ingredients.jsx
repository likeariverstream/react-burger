import React from "react";
import styles from './burger-ingredients.module.css';
import { useSelector } from "react-redux";
import Ingredient from '../ingredient/ingredient';


export default function BurgerIngredients({ handleOpenIngredientDetails }) {
  const data = useSelector(state => state.ingredients.ingredientsList);

  return (
    data && <div className={styles.scroll}>
      <p className={`${styles.title} text text_type_main-medium mt-10`}>
        Булки
      </p>
      <div className={styles.buns}>
        {data.map((element) => {
          if (element.type === 'bun') {
            return <Ingredient
              key={element._id}
              element={element}
              handleOpenIngredientDetails={handleOpenIngredientDetails} />
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
            return <Ingredient
              key={element._id}
              element={element}
              handleOpenIngredientDetails={handleOpenIngredientDetails} />
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
            return <Ingredient
              key={element._id}
              element={element}
              handleOpenIngredientDetails={handleOpenIngredientDetails} />
          }
        })
        }
      </div>
    </div>)
}
