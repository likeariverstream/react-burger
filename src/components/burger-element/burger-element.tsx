import React, { FC } from 'react';
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-element.module.css'
import { useDrop, useDrag, DropTargetMonitor, XYCoord } from "react-dnd";
import { useDispatch } from '../../utils/hooks';
import {
  moveConstructorItem
} from '../../services/actions/constructor';
import { TIngredient } from '../../utils/types';

type TBurgerElement = {
  element: TIngredient,
  id: string | undefined,
  index: number,
  deleteElement: (element: TIngredient) => void,
  handlerId?: string | null
}


export const BurgerElement: FC<TBurgerElement> = ({ element, id, index, deleteElement }) => {
  const dispatch = useDispatch();
  const moveElement = React.useCallback((dragIndex: number, hoverIndex: number) => {
    dispatch(moveConstructorItem(dragIndex, hoverIndex))
    console.log(dragIndex)
    console.log(hoverIndex)
  }, [dispatch])

  const [{ handlerId }, drop] = useDrop<TBurgerElement, TBurgerElement, { handlerId: symbol | string | null }>({
    accept: 'item',
    collect(monitor: DropTargetMonitor<TBurgerElement, TBurgerElement>) {
      return {
        handlerId: monitor.getHandlerId()
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex: number = item.index;
      const hoverIndex: number = index
      if (dragIndex === hoverIndex) {
        return
      }
      const rect: HTMLElement = ref.current
      const hoverBoundingRect: DOMRect = rect?.getBoundingClientRect();
      const hoverMiddleY: number = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset: XYCoord | null = monitor.getClientOffset()
      const hoverClientY: number = clientOffset!.y - hoverBoundingRect.top
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
  const options = {
    text: element.name,
    price: element.price,
    thumbnail: element.image,
    id: element.id,
  }

  return (
    <div className={styles.box}
      ref={ref}
      style={{
        opacity: isDragging ? 0.5 : 1
      }}
      {...options}
      data-handler-id={handlerId}
    >
      <div className={styles.drag}><DragIcon type="primary" /></div>
      <div className={styles.element} >
        <ConstructorElement
          handleClose={() => deleteElement(element)}
          {...options}
        />
      </div>
    </div>
  )
}
