import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-ingredients-tabs.module.css'
import { useSelector, useDispatch } from "react-redux";
import {SELECT_TAB_ITEM} from '../../services/actions/scroll'

export default function BurgerIngredientsTabs() {

  const currentTab = useSelector(state => state.scroll.currentTab);
  const dispatch = useDispatch();
  const handleTab = React.useCallback((currentTab) => {
    dispatch({
      type: SELECT_TAB_ITEM,
      currentTab
    })
  }, [dispatch])
  return (
    <div className={styles.container}>
    <Tab value="one" active={currentTab === 'one'} onClick={() => handleTab('one')}>
      Булки
    </Tab>
    <Tab value="two" active={currentTab === 'two'} onClick={() => handleTab('two')}>
      Соусы
    </Tab>
    <Tab value="three" active={currentTab === 'three'} onClick={() => handleTab('three')}>
      Начинки
    </Tab>
  </div>
  )
}