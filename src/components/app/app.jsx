import React from 'react';
import AppHeader from '../app-header/app-header';
import styles from './app.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import PriceCount from '../price-count/price-count';
import Modal from '../modal/modal.jsx';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import { getIngredients } from '../../services/actions/ingredients';
import {
  setIngredientDetails,
  deleteIngredientDetails
} from '../../services/actions/ingredient-details';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { getOrderDetails } from '../../services/actions/order-details';

function App() {
  const dispatch = useDispatch();
  const data = useSelector(state => state.constructorList.constructorList);
  
  const idList = React.useMemo(() => {
    return data.map(element => element._id)
  }, [data])

  React.useEffect(() => {
    dispatch(getIngredients());
  }, []);

  const [isOpen, setOpen] = React.useState(false)
  const [element, setElement] = React.useState();

  const handleOpenIngredientDetails = (e, element) => {
    dispatch(setIngredientDetails(element))
    setElement(true);
    setOpen(!isOpen);
  }

  const closeModal = () => {
    setOpen(!isOpen);
    dispatch(deleteIngredientDetails())
  }

  const handleButtonClick = () => {
    setElement(false)
    requestOrderDetails();
    setOpen(!isOpen);
  }

  const requestOrderDetails = () => {
    dispatch(getOrderDetails(idList))
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <AppHeader />
        <main className={styles.content}>
          <section className={styles.ingredients}>
            <p className={`${styles.title} text text_type_main-large mt-10 mb-5`} >
              Соберите бургер
            </p>
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
        {isOpen ? (<Modal onClick={closeModal} onClose={closeModal} >
          {element ? <IngredientDetails /> : <OrderDetails />}
        </Modal>)
          : null}
      </div >
    </DndProvider>
  )
}

export default App;