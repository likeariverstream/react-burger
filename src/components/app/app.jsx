import React from 'react';
import AppHeader from '../app-header/app-header';
import styles from './app.module.css';
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
import { SET_INGREDIENT_DETAILS } from '../../services/actions/ingredient-details';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';



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
  const [element, setElement] = React.useState();

  const handleOpenIngredientDetails = (e, element) => {
    dispatch({
      type: SET_INGREDIENT_DETAILS,
      element
    })
    setElement(true);
    setOpen(!isOpen);
  }

  const closeModal = () => {
    setOpen(!isOpen);
  }

  const handleButtonClick = () => {
    setElement(false)
    requestOrderDetails();
    setOpen(!isOpen);
  }

  const [orderId, setOrderId] = React.useState();

  const requestOrderDetails = () => {
    const idList = (data.map(element => element._id))
    const url = 'https://norma.nomoreparties.space/api/orders';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ingredients: idList
      })
    };
    fetch(url, options)
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка ${res.status}`)
      })
      .then(({ success, name, order }) => {
        setOrderId(order.number);
      })
      .catch((err) => console.warn(err))
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <AppHeader />
        <div ></div>
        <main className={styles.content}>
          <section className={styles.ingredients}>
            <p className={`${styles.title} text text_type_main-large mt-10 mb-5`} >
              Соберите бургер
            </p>
            <BurgerIngredientsTabs />
            <BurgerIngredients
              handleOpenIngredientDetails={handleOpenIngredientDetails} />
          </section>
          <section className={styles.constructor} >
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
        {isOpen ? <Modal onClick={closeModal} onClose={closeModal} >
          {element ? <IngredientDetails /> : <OrderDetails orderId={orderId} />}
        </Modal>
          : null}
      </div >
    </DndProvider>
  )
}

export default App;