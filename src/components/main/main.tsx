import React, { FC } from 'react';
import styles from './main.module.css';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { PriceCount } from '../price-count/price-count';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useTypedSelector } from '../../utils/constants';
import { Tingredient } from '../../utils/types'

type TMain = {
  handleOpenIngredientDetails: (element: Tingredient) => void,
  handleButtonClick: () => void
}

export const Main: FC<TMain> = ({
  handleOpenIngredientDetails,
  handleButtonClick }) => {

  const { constructorList: data } = useTypedSelector(state => state.constructorList);

  return (
    <main className={styles.content}>
      <section className={styles.ingredients}>
        <p className={`${styles.title} text text_type_main-large mt-10 mb-5`} >
          Соберите бургер
        </p>
        <BurgerIngredients
          handleOpenIngredientDetails={handleOpenIngredientDetails} />
      </section>
      <section className={styles.order} >
        <BurgerConstructor />
        {data.length > 0 ? <div className={styles.count}>
          <PriceCount />
          <Button
            type="primary" size="medium"
            htmlType='submit'
            onClick={handleButtonClick}>
            Оформить заказ
          </Button>
        </div> : null}
      </section>
    </main>
  )
}
