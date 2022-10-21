import React from "react";
import styles from './burger-constructor.module.css';
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import {
  GET_CONSTRUCTOR_ITEM,
  DELETE_CONSTRUCTOR_ITEM,
  GET_BUN_ITEM,
  MOVE_CONSTRUCTOR_ITEM
} from '../../services/actions/constructor';
import { nanoid } from "nanoid";
import BurgerElement from "../burger-element/burger-element";
import update from 'immutability-helper'

export default function BurgerConstructor() {
  const data = useSelector(state => state.constructorList.constructorList);
  const dispatch = useDispatch();

  const moveElement = React.useCallback((dragIndex, hoverIndex) => {
    dispatch({
      type: MOVE_CONSTRUCTOR_ITEM,
      dragIndex,
      hoverIndex
    })
  }, [])
  
  const [, dropTarget] = useDrop(() => ({
    accept: 'ingredient',
    hasOver: () => console.log('цель'),
    drop: (item) => addConstructorElement(item.element)
  }))

  const addConstructorElement = (element) => {
    element = { ...element, id: nanoid() }
    dispatch({
      type: GET_CONSTRUCTOR_ITEM,
      element
    })
    dispatch({
      type: GET_BUN_ITEM,
      element
    })
  }
  const deleteElement = (element) => {
    dispatch({
      type: DELETE_CONSTRUCTOR_ITEM,
      element
    })
  }

  const handleDropElement = React.useCallback((element) => {
    console.log(element.element);
  }, [])

  return (
    <div className={styles.container} ref={dropTarget} >
      {data.map((element) => {
        return element.type === 'bun' &&
          <div key={element.id} className="ml-8">
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${element.name} (верх)`}
              price={element.price}
              thumbnail={element.image}
            />
          </div>
      })}
      <div className={styles.scroll}>
        {data.map((element, index) => {
          return element.type !== 'bun' &&
            <BurgerElement
              moveElement={moveElement}
              index={index}
              key={element.id}
              onDrop={(item) => handleDropElement(item)}
              id={element.id}
              element={element}
              deleteElement={() => deleteElement(element)} />
        })}
      </div>
      {data.map((element) => {
        return element.type === 'bun' &&
          <div key={element.id} className="ml-8">
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
