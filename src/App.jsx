import React from 'react';
import AppHeader from './components/AppHeader/AppHeader';
import styles from './App.module.css'
import BurgerIngredientsTabs from './components/BurgerIngredientsTabs/BurgerIngredientsTabs';
import BurgerIngredients from './components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from './components/BurgerConstructor/BurgerConstructor';
import { Button, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PriceCount from './components/PriceCount/PriceCount';
import Modal from './components/Modal/Modal';

function App() {
  const [state, setState] = React.useState({
    success: false,
    data: []
  });
  const url = 'https://norma.nomoreparties.space/api/ingredients';
  React.useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        setState(result.data)
      })
      .catch((err) => console.warn(err))
  }, []);

  const data = Object.entries(state);

  const [arr, setArr] = React.useState([])
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [isOpen, setOpen] = React.useState(false)
  let [element, setElement] = React.useState({});
  const [isButton, setButton] = React.useState(false)




  const handleElementClick = (e) => {
    let element = data.find(item => item[1]._id === e.target.id)[1];
    if (!element.count) {
      element.count = 0;
    }
    if (!arr.find(m => (m.type === 'bun')) || element.type !== 'bun') {
      element.count = element.count + 1
      arr.push(element);
      console.log(element)
      forceUpdate();
    }
    setElement(element);
    setOpen(!isOpen);
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
          <p className={`${styles.title} text text_type_main-large mt-10 mb-9`} >
            Соберите бургер
          </p>
          <BurgerIngredientsTabs />
          <BurgerIngredients data={data} onClick={handleElementClick} />
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
      {isOpen ? <Modal ingredient={element} onClick={closeModal} /> : null}
    </div >
  )
}

export default App;