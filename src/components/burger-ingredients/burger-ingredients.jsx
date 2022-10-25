import React from 'react';
import styles from './burger-ingredients.module.css';
import { useSelector } from 'react-redux';
import Ingredient from '../ingredient/ingredient';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

export default function BurgerIngredients({ handleOpenIngredientDetails }) {
  const data = useSelector(state => state.ingredients.ingredientsList);
  const bunsRef = React.useRef();
  const saucesRef = React.useRef();
  const mainsRef = React.useRef();
  const scrollRef = React.useRef()
  const [current, setCurrent] = React.useState('one');

  const handleClick = React.useCallback((value) => {
    value === 'one'
      ? bunsRef.current.scrollIntoView({ behavior: 'smooth' })
      : value === 'two'
        ? saucesRef.current.scrollIntoView({ behavior: 'smooth' })
        : mainsRef.current.scrollIntoView({ behavior: 'smooth' })
    setCurrent(value)
  }, [])

  React.useEffect(() => {
    const ref = scrollRef.current;
    const toggleTab = () => {
      const targets = {
        buns: bunsRef.current.getBoundingClientRect().top,
        sauces: saucesRef.current.getBoundingClientRect().top,
        mains: mainsRef.current.getBoundingClientRect().top,
        scroll: ref.scrollTop,
      }
      targets.scroll < targets.buns ?
        setCurrent('one')
        :
        targets.buns < targets.scroll < targets.sauces ?
          setCurrent('two')
          : targets.sauces < targets.scroll
            ? setCurrent('three') : setCurrent(false)
    }
    ref.addEventListener('scroll', toggleTab)
    return () => ref.removeEventListener('scroll', toggleTab);
  }, [])

  return (
    data && <>
      <div className={styles.container}>
        <Tab value='one' active={current === 'one'}
          onClick={() => handleClick('one')}>
          Булки
        </Tab>
        <Tab value='two' active={current === 'two'}
          onClick={() => handleClick('two')}>
          Соусы
        </Tab>
        <Tab value='three' active={current === 'three'}
          onClick={() => handleClick('three')}>
          Начинки
        </Tab>
      </div>
      <div className={styles.scroll} ref={scrollRef}>
        <p className={`${styles.title} text text_type_main-medium mt-10`} ref={bunsRef}>
          Булки
        </p>
        <div className={styles.buns}>
          {data.map((element) => {
            if (element.type === 'bun') {
              return (<Ingredient
                key={element._id}
                element={element}
                handleOpenIngredientDetails={handleOpenIngredientDetails} />);
            }
          })
          }
        </div>
        <p className={`${styles.title} text text_type_main-medium mt-10 pt-5`} ref={saucesRef}>
          Соусы
        </p>
        <div className={styles.sauces}>
          {data.map((element) => {
            if (element.type === 'sauce') {
              return (<Ingredient
                key={element._id}
                element={element}
                handleOpenIngredientDetails={handleOpenIngredientDetails} />);
            }
          })
          }
        </div>
        <p className={`${styles.title} text text_type_main-medium mt-10`} ref={mainsRef}>
          Начинки
        </p>
        <div className={styles.mains}>
          {data.map((element) => {
            if (element.type === 'main') {
              return (<Ingredient
                key={element._id}
                element={element}
                handleOpenIngredientDetails={handleOpenIngredientDetails} />);
            }
          })
          }
        </div>
      </div>
    </>)
}

BurgerIngredients.propTypes = {
  handleOpenIngredientDetails: PropTypes.func.isRequired
}