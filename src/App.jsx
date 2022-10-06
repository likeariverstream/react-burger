import React from 'react';
import AppHeader from './components/AppHeader/AppHeader';
import styles from './App.module.css'
import BurgerIngredientsTabs from './components/BurgerIngredientsTabs/BurgerIngredientsTabs';
import BurgerIngredients from './components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from './components/BurgerConstructor/BurgerConstructor';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import PriceCount from './components/PriceCount/PriceCount';
import Modal from './components/Modal/Modal';

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
      .then((res) => res.json())
      .then((result) => {
        setState((result.data))
      })
      .catch((err) => console.warn(err))
  }, []);

  const [arr, setArr] = React.useState([])
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [isOpen, setOpen] = React.useState(false)
  let [element, setElement] = React.useState({});

  const handleOpenIngredientDetails = (e) => {
    let element = data.find(item => item._id === e.target.id);
    setElement(element);
    setOpen(!isOpen);
  }

  const handleElementClick = (e) => {
    let element = data.find(item => item._id === e.target.id);
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
    setElement(element = null)
    setOpen(!isOpen);
  }

  React.useEffect(() => {
  }, [isOpen])

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
            <Button style={{ width: 215, alignSelf: 'end' }} type="primary" size="large" htmlType='submit' onClick={handleButtonClick}>
              Оформить заказ
            </Button>
          </div>
        </section>
      </main>
      {isOpen ? <Modal ingredient={element} onClick={closeModal} onClose={closeModal} /> : null}
    </div >
  )
}

export default App;