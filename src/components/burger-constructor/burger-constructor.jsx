import React from "react";
import styles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import { GET_CONSTRUCTOR_ITEMS } from '../../services/actions/constructor';

export default function BurgerConstructor() {
  const data = useSelector(state => state.constructorList.constructorList);
  const dispatch = useDispatch();
  const generateKey = (id, index) => {
    return `${id}_${new Date().getTime()}_${index}`
  }

  const [{ isOver }, dropTarget] = useDrop(() => ({
    accept: 'ingredient',
    drop: (item) => addConstructorElement(item.element),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }))
  
  const isElement = data.find(element => element.type === 'bun') ? false : true; 
  const addConstructorElement = (element) => {
    isElement && dispatch({ //здесь всегда true
        type: GET_CONSTRUCTOR_ITEMS,
        element
      })
  }

  return (
    <div className={styles.container} ref={dropTarget}>
        {data.map((element, index) => {
          return element.type === 'bun' &&
            <div key={generateKey(element._id, index)} className="ml-6">
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
              <div key={generateKey(element._id, index)}>
                <DragIcon type="primary" className={styles.drag} />
                <ConstructorElement
                  style={{ maxHeight: 80 }}
                  text={element.name}
                  price={element.price}
                  thumbnail={element.image}
                />
              </div>
          })}
        </div>
        {data.map((element, index) => {
          return element.type === 'bun' &&
            <div key={generateKey(element._id, index)} className="ml-6">
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
