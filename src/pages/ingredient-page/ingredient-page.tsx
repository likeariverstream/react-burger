import React, { FC } from "react";
import styles from './ingredient-page.module.css';
import { TIngredient } from "../../utils/types";
import { useParams } from "react-router-dom";
import { useSelector } from "../../utils/hooks";

export const IngredientPage: FC = () => {

  const { id } = useParams<{ id: string }>();
  const { ingredientsList: ingredients } = useSelector(state => state.ingredients)
  const ingredient: TIngredient | undefined = React.useMemo(() => {
    return ingredients.find(item => item._id === id)
  }, [ingredients, id])

  return (
    <>{ingredient && <div className={styles.ingredient}>
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
    </div>}</>
  )
}
