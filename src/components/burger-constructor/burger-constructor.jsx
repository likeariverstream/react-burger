import React from "react";
import styles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types'

const constructorShape = PropTypes.shape({
  calories: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_large: PropTypes.string,
  image_mobile: PropTypes.string,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  proteins: PropTypes.number,
  type: PropTypes.string.isRequired,
  __v: PropTypes.number,
  _id: PropTypes.string.isRequired
});

export default function BurgerConstructor({ data }) {
  
  const generateKey = (id, index) => {
    return `${id}_${new Date().getTime()}_${index}`
  }

  return (
    <div className={styles.container}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
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
        <div className={styles.scroll} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
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

BurgerConstructor.propTypes ={
  data: PropTypes.arrayOf(constructorShape).isRequired
}