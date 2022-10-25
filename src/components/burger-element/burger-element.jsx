import React from 'react';
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-element.module.css'
import { useDrop, useDrag } from "react-dnd";
import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/types';

export default function BurgerElement({ element, id, index, deleteElement, moveElement }) {

  const [{ handlerId }, drop] = useDrop({
    accept: 'item',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index;
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      moveElement(dragIndex, hoverIndex)
      item.index = hoverIndex
    }
  })

  const [{ isDragging }, drag] = useDrag({
    type: 'item',
    item: () => {
      return { id, index }
    },

    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    }),

  })
  const ref = React.useRef(null);

  drag(drop(ref));

  return (
    <div className={styles.box}
      style={{
        opacity: isDragging ? 0.5 : 1
      }}
      ref={ref}
      id={element.id}
      data-handler-id={handlerId}
    >
      <div className={styles.drag}><DragIcon type="primary" /></div>
      <div className={styles.element} >
        <ConstructorElement
          text={element.name}
          price={element.price}
          thumbnail={element.image}
          handleClose={() => deleteElement(element)}
        />
      </div>
    </div>
  )
}

BurgerElement.propTypes = {
  element: ingredientType.isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  deleteElement: PropTypes.func.isRequired,
  moveElement: PropTypes.func.isRequired
}