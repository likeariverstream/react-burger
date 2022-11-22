import React from "react";
import styles from './burger-constructor.module.css';
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import {
  getConstructorItem,
  deleteConstructorItem,
  getBunItem,
} from '../../services/actions/constructor';
import { nanoid } from "nanoid";
import BurgerElement from "../burger-element/burger-element";

export default function BurgerConstructor() {
  const data = useSelector(state => state.constructorList.constructorList);
  const dispatch = useDispatch();

  const [, dropTarget] = useDrop(() => ({
    accept: 'ingredient',
    drop: (item) => addConstructorElement(item.element)
  }))

  const addConstructorElement = (element) => {
    element = { ...element, id: nanoid() }
    dispatch(getConstructorItem(element))
    dispatch(getBunItem(element))
  }
  const deleteElement = (element) => {
    dispatch(deleteConstructorItem(element))
  }

  const handleDropElement = React.useCallback((element) => {
    console.log(element.element);
  }, [])

  return (
    <div className={styles.container} ref={dropTarget} >
      <div className={styles.top}>
        {data.map((element) => {
          return element.type === 'bun' &&
            (<div key={element.id} >
              <ConstructorElement
                type="top"
                isLocked={true}
                text={`${element.name} (верх)`}
                price={element.price}
                thumbnail={element.image}
              />
            </div>)
        })}
      </div>
      <div className={styles.scroll}>
        {data.map((element, index) => {
          return element.type !== 'bun' &&
            (<BurgerElement
              index={index}
              key={element.id}
              onDrop={(item) => handleDropElement(item)}
              id={element.id}
              element={element}
              deleteElement={() => deleteElement(element)} />)
        })}
      </div>
      <div className={styles.bottom}>{data.map((element) => {
        return element.type === 'bun' &&
          (<div key={element.id}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${element.name} (низ)`}
              price={element.price}
              thumbnail={element.image}
            />
          </div>)
      })}
      </div>
    </div>
  )
}