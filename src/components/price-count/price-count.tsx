import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './price-count.module.css';
import { useSelector } from '../../utils/hooks';
import { Tingredient } from "../../utils/types";


export const PriceCount = () => {
  const {constructorList: data} = useSelector(state => state.constructorList)

    
  const bun: Tingredient[] = React.useMemo(() =>  {
    return data.filter((element) => element.type === 'bun');
  }, [data]) 

  const totalPrice = React.useMemo(() => {
    return [...data, ...bun].reduce((acc, item) => acc + item.price, 0); 
  }, [data, bun])

  return (
    <div className={styles.count}>
      <p className="text text_type_digits-medium mr-3">{totalPrice}</p>
      <CurrencyIcon type="primary" />
    </div>
  )
}


