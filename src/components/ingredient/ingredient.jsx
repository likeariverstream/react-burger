import React from 'react';
import styles from './ingredient.module.css';
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector, useDispatch } from 'react-redux';
import { GET_CONSTRUCTOR_ITEMS } from '../../services/actions/constructor';


export default function Ingredient({ element, handleOpenIngredientDetails }) {
  const [count, setCount] = React.useState(0);
  const [{ isDragging, didDrop }, dragRef] = useDrag({
    type: 'ingredient',
    item: {
      id: element._id,
      element,
      type: element.type
    },
    end: (item) => handleCount(item),
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
      didDrop: monitor.didDrop()
    })
  });

  const handleCount = (item) => {
   return ((item.type !== 'bun') || count === 0) ? setCount(count + 1) : false;
  }
  return (
    <div className={styles.ingredient}>

      {count > 0 &&
        <div className={styles.counter} id={element._id}>
          <Counter id={element._id} count={count} size="default" />
        </div>}
      <img className={styles.image}
        ref={dragRef}
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
        id={element._id}
      >
        {element.name}
      </p>
    </div>
  )
}