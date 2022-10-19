import React from "react";
import styles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "react-redux";
import { useDrop, useDrag } from "react-dnd";
import { GET_CONSTRUCTOR_ITEM, DELETE_CONSTRUCTOR_ITEM, GET_BUN_ITEM } from '../../services/actions/constructor';
import { INGREDIENT_COUNT_INCREASE, INGREDIENT_COUNT_DECREASE, BUN_COUNT_REPLACE } from "../../services/actions/ingredient-counts";
import { nanoid } from "nanoid";
import BurgerElement from "../burger-element/burger-element";

export default function BurgerConstructor() {
  const data = useSelector(state => state.constructorList.constructorList);
  const dispatch = useDispatch();

  const [, dropTarget] = useDrop(() => ({
    accept: 'ingredient',
    hasOver: () => console.log('цель'),
    drop: (item) => addConstructorElement(item.element),
    collect: (monitor) => ({
      hasOver: monitor.isOver()
    })
  }))

  const addConstructorElement = (element) => {
    dispatch({
      type: GET_CONSTRUCTOR_ITEM,
      data: [].push(element),
      element
    })
    dispatch({
      type: INGREDIENT_COUNT_INCREASE,
      element
    })

    dispatch({
      type: GET_BUN_ITEM,
      element
    })
    dispatch({
      type: BUN_COUNT_REPLACE,
      element
    })

  }
  const deleteElement = (element, index) => {
    dispatch({
      type: DELETE_CONSTRUCTOR_ITEM,
      element,
      index
    })
    dispatch({
      type: INGREDIENT_COUNT_DECREASE,
      element
    })
  }

  const handleDropElement = React.useCallback ((element) => {
    console.log(element.element);
  }, [])

  return (
    <div className={styles.container} ref={dropTarget} >
      {data.map((element) => {
        return element.type === 'bun' &&
          <div key={nanoid()} className="ml-8">
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${element.name} (верх)`}
              price={element.price}
              thumbnail={element.image}
            />
          </div>
      })}
      <div className={styles.scroll}  >
        {data.map((element, index) => {
          return element.type !== 'bun' &&
            <div key={nanoid()}>
              <BurgerElement
                onDrop={(item) => handleDropElement(item)}
                id={nanoid()}
                element={element}
                deleteElement={() => deleteElement(element, index)} />
            </div>
        })}
      </div>
      {data.map((element) => {
        return element.type === 'bun' &&
          <div key={nanoid()} className="ml-8">
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${element.name} (низ)`}
              price={element.price}
              thumbnail={element.image}
            />
          </div>
      })}
    </div>
  )
}
