import React from "react";
import styles from './burger-ingredients.module.css';
import { useSelector } from "react-redux";
import Ingredient from '../ingredient/ingredient';

export default function BurgerIngredients({ handleOpenIngredientDetails }) {
  const data = useSelector(state => state.ingredients.ingredientsList);
  const bunsRef = React.useRef()
  const saucesRef = React.useRef()
  const mainsRef = React.useRef()


  const currentTab = useSelector(state => state.scroll.currentTab);
  
  if (currentTab === 'one') {
    bunsRef.current.scrollIntoView()
  }
  if (currentTab === 'two') {
    saucesRef.current.scrollIntoView()
  }
  if (currentTab === 'three') {
    mainsRef.current.scrollIntoView()
  }

  return (
    data && <div className={styles.scroll}>
      <p className={`${styles.title} text text_type_main-medium mt-10`} ref={bunsRef}>
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
      <p className={`${styles.title} text text_type_main-medium mt-10 pt-5`} ref={saucesRef}>
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
      <p className={`${styles.title} text text_type_main-medium mt-10`} ref={mainsRef}>
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