import React from "react";
import styles from './BurgerConstructor.module.css';
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export default function BurgerConstructor({ data }) {

  return (
    <div className={styles.container}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {data.map((element, index) => {
          return element.type === 'bun' &&
            <div className="ml-6">
              <ConstructorElement
                key={index}
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
              <div>
                <DragIcon type="primary" className={styles.drag} />
                <ConstructorElement
                  style={{ maxHeight: 80 }}
                  key={index}
                  text={element.name}
                  price={element.price}
                  thumbnail={element.image}
                />
              </div>
          })}
        </div>
        {data.map((element, index) => {
          return element.type === 'bun' &&
            <div className="ml-6">
              <ConstructorElement
                key={index}
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