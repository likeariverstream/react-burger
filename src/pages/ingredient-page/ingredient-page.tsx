import React, { FC } from "react";
import styles from './ingredient-page.module.css';
import { TIngredient } from "../../utils/types";

export const IngredientPage: FC = () => {

  const ingredient: TIngredient = JSON.parse(sessionStorage.getItem('ingredient') as string);

  return (
    <div className={styles.ingredient}>
      <h2 className={`${styles.title} text text_type_main-large`}>Детали ингредиента</h2>
      <img className={styles.image}
        id={ingredient._id}
        src={ingredient.image}
        alt={ingredient.name}
      />
      <h3 className={`${styles.subtitle} text text_type_main-medium`}>{ingredient.name}</h3>
      <div className={styles.caption}>
        <p className="text text_type_main-small">
          Калории,ккал
        </p>
        <p className="text text_type_main-small">
          Белки, г
        </p>
        <p className="text text_type_main-small">
          Жиры, г
        </p>
        <p className="text text_type_main-small">
          Углеводы, г
        </p>
        <p className="text text_type_digits-default">
          {ingredient.calories}
        </p>
        <p className="text text_type_digits-default">
          {ingredient.proteins}
        </p>
        <p className="text text_type_digits-default">
          {ingredient.fat}
        </p>
        <p className="text text_type_digits-default">
          {ingredient.carbohydrates}
        </p>
      </div>
    </div>
  )
}