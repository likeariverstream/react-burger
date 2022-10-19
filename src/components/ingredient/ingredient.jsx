import React from 'react';
import styles from './ingredient.module.css';
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector, useDispatch } from 'react-redux';
import { GET_CONSTRUCTOR_ITEMS } from '../../services/actions/constructor';


export default function Ingredient({ element, handleOpenIngredientDetails }) {
  const counts = useSelector(state => state.ingredientCounts.ingredientsList);
  const countValue = counts.filter((item) => item._id === element._id).length
  const count = element.type !== 'bun'
    ? countValue
    : countValue * 2;

  const [didDrop, dragRef] = useDrag(() => ({
    type: 'ingredient',
    item: {
      id: element._id,
      element,
      type: element.type,
    },
    collect: monitor => ({
      didDrop: !!monitor.didDrop()
    })
  }), []);

  return (
    <div className={styles.ingredient}>
      {count > 0 &&
        <div className={styles.counter}>
          <Counter id={element._id} count={count} size="default" />
        </div>}
      <img className={styles.image}
        style={{cursor: didDrop ? 'grab' : 'default'}}
        ref={dragRef}
        id={element._id}
        src={element.image}
        alt={element.name}
        onClick={(e) => handleOpenIngredientDetails(e, element)} />
      <div className={styles.price}>
        <p className="text text_type_digits-default mr-2" >
          {element.price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.name} text text_type_main-default`}>
        {element.name}
      </p>
    </div>
  )
}