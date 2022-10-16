import React from 'react';
import styles from './ingredient.module.css';
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector, useDispatch } from 'react-redux';
import { GET_CONSTRUCTOR_ITEMS } from '../../services/actions/constructor';


export default function Ingredient({ element, onClick, handleOpenIngredientDetails }) {

  const [{ isDragging }, dragRef] = useDrag({
    type: 'ingredient',
    item: {
      id: element._id,
      element
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  });
  return (
    <div className={styles.ingredient} ref={dragRef}
      style={{ outline: isDragging ? '5px solid pink' : '0px' }}>

      {element.count > 0 &&
        <div className={styles.counter} id={element._id}>
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
  )
}