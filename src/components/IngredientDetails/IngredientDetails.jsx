import React from "react";
import styles from './IngredientDetails.module.css';


export default function IngredientDetails({ ingredient }) {
  
  return (
    <div className={styles.ingredient}>
      <h2 className={`${styles.title} text text_type_main-large`}>Детали ингредиента</h2>
      <img className={styles.image}
        id={ingredient._id}
        src={ingredient.image_large}
        alt={ingredient.name}
      />
      <h3 className={`${styles.title} text text_type_main-medium`}>{ingredient.name}</h3>
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
        <p className="text text_type_main-small">
          {ingredient.calories}
        </p>
        <p className="text text_type_main-small">
          {ingredient.proteins}
        </p>
        <p className="text text_type_main-small">
          {ingredient.fat}
        </p>
        <p className="text text_type_main-small">
          {ingredient.carbohydrates}
        </p>
      </div>
    </div>
  )
}

