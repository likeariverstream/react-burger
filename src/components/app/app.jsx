import React from 'react';
import AppHeader from '../app-header/app-header';
import styles from './app.module.css'
import BurgerIngredientsTabs from '../burger-ingredients-tabs/burger-ingredients-tabs';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import PriceCount from '../price-count/price-count';
import Modal from '../modal/modal.jsx';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import { GET_INGREDIENTS_SUCCESS } from '../../services/actions/ingredients';
import { GET_CONSTRUCTOR_ITEMS } from '../../services/actions/constructor';
import { SET_INGREDIENT_DETAILS } from '../../services/actions/ingredient-details'
import { useDispatch, useSelector } from 'react-redux'

function App() {
  const dispatch = useDispatch();
  const data = useSelector(state => state.constructorList.constructorList);

  const url = 'https://norma.nomoreparties.space/api/ingredients';
  React.useEffect(() => {
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка ${res.status}`)
      })
      .then(({ data }) => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          data
        })
      })
      .catch((err) => console.warn(err))
  }, []);

  const [isOpen, setOpen] = React.useState(false)
  const [element, setElement] = React.useState({});

  const handleOpenIngredientDetails = (e, element) => {
    dispatch({
      type: SET_INGREDIENT_DETAILS,
      element
    })
    setOpen(!isOpen);
  }
  
  const handleElementClick = (e, element) => {
    if(!data.find(m => m.type === 'bun') || element.type !== 'bun')
    dispatch({
      type: GET_CONSTRUCTOR_ITEMS,
      element
    })
  }

  const closeModal = () => {
    setOpen(!isOpen);
  }

  const handleButtonClick = () => {
    setElement(false)
    setOpen(!isOpen);
  }

  return (
    <div className="App">
      <AppHeader />
      <main className={styles.content}>
        <section className={styles.ingredients}>
          <p className={`${styles.title} text text_type_main-large mt-10 mb-5`} >
            Соберите бургер
          </p>
          <BurgerIngredientsTabs />
          <BurgerIngredients
            onClick={handleElementClick}
            handleOpenIngredientDetails={handleOpenIngredientDetails} />
        </section>
        <section className={styles.constructor} >
          <BurgerConstructor />
          <div className={styles.count}>
            <PriceCount />
            <div className={styles.button} >
              <Button
                type="primary" size="large"
                htmlType='submit'
                onClick={handleButtonClick}>
                Оформить заказ
              </Button>
            </div>
          </div>
        </section>
      </main> 
      {isOpen ? <Modal onClick={closeModal} onClose={closeModal} >
        {element ? <IngredientDetails /> : <OrderDetails />}
      </Modal>
        : null}
    </div >
  )
}

export default App;