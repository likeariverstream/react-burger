import React from 'react';
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { nanoid } from 'nanoid';
import { useSelector } from "react-redux";

import styles from './burger-element.module.css'
import { useDrop, useDrag } from "react-dnd";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


export default function BurgerElement({ element, deleteElement, index, id, onDrop}) {
  
  const data = useSelector(state => state.constructorList.constructorList);

  const [{ isOver, canDrop, getItem }, dropElement] = useDrop(() => ({
    accept: 'item',
    onDrop: onDrop,
    canDrop: () => console.log(),
    isOver: () => console.log(),
    // drop: (element) => handleDropElement(element),
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver()
    })
  }), [])


  const [{ isDragging }, dragElement] = useDrag(() => ({
    type: 'item',
    isDragging: console.log('11'),
    item: {
      id,
      element
    },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      console.log(dropResult)
      if(item && dropResult) {
        console.log('бросок!')
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })

  }), [])
  return (
      <div className={styles.box} key={nanoid()}
        style={{
          opacity: isDragging ? 0.5 : 1
        }}
        ref={(node) => dragElement(dropElement(node))}
        id={id}
        onDrop={onDrop}
        >
        <div className={styles.drag}><DragIcon type="primary" /></div>
        <div className={styles.element} >
          <ConstructorElement
            text={element.name}
            price={element.price}
            thumbnail={element.image}
            handleClose={() => deleteElement(element, index)}
          />
        </div>
      </div>

  )
}


