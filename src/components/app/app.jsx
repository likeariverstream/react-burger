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

function App() {
  const [data, setState] = React.useState([
    {
      _id: "60d3b41abdacab0026a733c6",
      name: "Краторная булка N-200i",
      type: "bun",
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: "https://code.s3.yandex.net/react/code/bun-02.png",
      image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
      __v: 0
    }
  ]
  );

  const url = 'https://norma.nomoreparties.space/api/ingredients';
  React.useEffect(() => {
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка ${res.status}`)
      })
      .then((result) => {
        setState((result.data))
      })
      .catch((err) => console.warn(err))
  }, []);

  const [arr, setArr] = React.useState([])
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [isOpen, setOpen] = React.useState(false)
  const [element, setElement] = React.useState({}); // исправил на const и теперь окно с деталями заказа не открывается)

  const handleOpenIngredientDetails = (e, item) => {
    setElement(item);
    setOpen(!isOpen);
  }

  const handleElementClick = (e) => {
    const element = data.find(item => item._id === e.target.id);
    if (!element.count) {
      element.count = 0;
    }
    if (!arr.find(m => (m.type === 'bun')) || element.type !== 'bun') {
      element.count = element.count + 1
      arr.push(element);
      forceUpdate();
    }
    setElement(element);
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
          <BurgerIngredients data={data}
            onClick={handleElementClick}
            handleOpenIngredientDetails={handleOpenIngredientDetails} />
        </section>
        <section className={styles.constructor} >
          <BurgerConstructor data={arr} />
          <div className={styles.count}>
            <PriceCount data={arr} />
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
        {element ? <IngredientDetails ingredient={element} /> : <OrderDetails />}
      </Modal>
        : null}
    </div >
  )
}

export default App;