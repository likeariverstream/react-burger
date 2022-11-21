import React, { FC } from "react";
import styles from './burger-constructor.module.css';
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import { useSelector } from "../../utils/hooks";
import {
  getConstructorItem,
  deleteConstructorItem,
  getBunItem,
} from '../../services/actions/constructor';
import { nanoid } from "nanoid";
import { BurgerElement } from "../burger-element/burger-element";
import { TIngredient } from "../../utils/types";

type Titem = {
  id: string,
  element: TIngredient,
  type: string,
}

export const BurgerConstructor: FC = () => {
  const { constructorList: data } = useSelector(state => state.constructorList);
  const dispatch = useDispatch();
  const [, dropTarget] = useDrop(() => ({
    accept: 'ingredient',
    drop: (item: Titem) => addConstructorElement(item.element)
  }))
  const addConstructorElement = (element: TIngredient) => {
    element = { ...element, id: nanoid() }
    dispatch(getConstructorItem(element))
    dispatch(getBunItem(element))
  }
  const deleteElement = (element: TIngredient) => {
    dispatch(deleteConstructorItem(element))
  }

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
