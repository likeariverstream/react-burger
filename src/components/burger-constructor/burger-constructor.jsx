import React from "react";
import styles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import { priceCountType } from "../../utils/types";

export default function BurgerConstructor({ data }) {
  const generateKey = (id, index) => {
    return `${id}_${new Date().getTime()}_${index}`
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
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
    </div>)

}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(priceCountType).isRequired
}