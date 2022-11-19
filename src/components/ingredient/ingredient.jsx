import React from 'react';
import styles from './ingredient.module.css';
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { useSelector } from 'react-redux';

export default function Ingredient({ element, handleOpenIngredientDetails }) {
  const data = useSelector(state => state.constructorList.constructorList);
  const countValue = React.useMemo(() => {
    return data.filter((item) => item._id === element._id).length
  }, [data, element._id]);
  
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
  const options = {
    id: element._id,
    src: element.image,
    ref: dragRef,
    onClick: () => handleOpenIngredientDetails(element),
    price: element.price,
    name: element.name,
  }

  return (
    <div className={styles.ingredient}>
      {count > 0 &&
        <div className={styles.counter}>
          <Counter count={count} size="default" />
        </div>}

      <img className={styles.image}
        style={{ cursor: didDrop ? 'grab' : 'default' }}
        {...options}
        alt={element.name}
        />
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
