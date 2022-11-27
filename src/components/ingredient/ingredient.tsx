import React, { FC, MouseEventHandler } from 'react';
import styles from './ingredient.module.css';
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { useSelector, useDispatch } from '../../utils/hooks';
import { TIngredient } from '../../utils/types';
import { useLocation, useHistory, Link } from 'react-router-dom';
import { setIngredientDetails } from '../../services/actions/ingredient-details'

type TIngredientComponent = {
  element: TIngredient,
}

export const Ingredient: FC<TIngredientComponent> = ({ element }) => {
  const dispatch = useDispatch();
  const { constructorList: data } = useSelector(state => state.constructorList);
  const history = useHistory();
  const location = useLocation();
  const countValue = React.useMemo(() => {
    return data.filter((item) => item._id === element._id).length
  }, [data, element._id]);

  const count = element.type !== 'bun'
    ? countValue
    : countValue * 2;

  const [didDrop, dragRef] = useDrag(() => ({
    type: 'ingredient',
    item: {
      id: element._id,
      element,
      type: element.type,
    },
    collect: monitor => ({
      didDrop: !!monitor.didDrop()
    })
  }), []);
  const handleOpenIngredientDetails = React.useCallback((element: TIngredient): void => {
    const { _id } = element;
    const url = `/ingredients/:${_id}`;
    history.push({
      pathname: url,
      state: {
        background: location,
        element: element
      }
    })

    dispatch(setIngredientDetails(element))
  }, [dispatch, history, location]);
  const options = {
    onClick: () => handleOpenIngredientDetails(element),
    id: element._id,
    src: element.image,
    ref: dragRef,
    price: element.price,
    name: element.name,
  }

  return (

    <div className={styles.ingredient}>
      {count > 0 &&
        <div className={styles.counter}>
          <Counter count={count} size="default" />
        </div>}
      {/* <Link to={{
        pathname: `/ingredients/:${element._id}`,
        state: { background: location }
      }}> */}
        <img className={styles.image}
          style={{ cursor: didDrop ? 'grab' : 'default' }}
          {...options}
          alt={element.name}
        />
      {/* </Link> */}
      <div className={styles.price}>
        <p className="text text_type_digits-default mr-2" >
          {element.price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.name} text text_type_main-default`}>
        {element.name}
      </p>
    </div>
  )
}
