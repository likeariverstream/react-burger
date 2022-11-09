import React from 'react';
import { AppHeader } from '../app-header/app-header';
import styles from './app.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import PriceCount from '../price-count/price-count';
import Modal from '../modal/modal.jsx';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import { getIngredients } from '../../services/actions/ingredients';
import Main from '../main/main';
import {
  setIngredientDetails,
  deleteIngredientDetails
} from '../../services/actions/ingredient-details';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { getOrderDetails } from '../../services/actions/order-details';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { IngredientPage } from '../../pages/ingredient-page/ingredient-page';
import { LoginPage } from '../../pages/login-page/login-page';
import { RegisterPage } from '../../pages/register-page/register-page';
import { ForgotPasswordPage } from '../../pages/forgot-password-page/forgot-password-page';
import { ResetPasswordPage } from '../../pages/reset-password-page/reset-password-page';
import { ProfilePage } from '../../pages/profile-page/profile-page';

export default function App() {
  const login = JSON.parse(sessionStorage.getItem('login'));

  const recover = useSelector(state => state.recoverPassword.success);
  const dispatch = useDispatch();
  const history = useHistory();
  const data = useSelector(state => state.constructorList.constructorList);
  const ingredients = useSelector(state => state.ingredients.ingredientsList);
  const { _id } = useSelector(state => state.ingredientDetails.ingredientDetails);
  const idList = React.useMemo(() => {
    return data.map(element => element._id)
  }, [data])
  const [isOpen, setOpen] = React.useState(false)
  const [element, setElement] = React.useState(false);
  React.useEffect(() => {

    dispatch(getIngredients())
  }, [dispatch]);

  const handleOpenIngredientDetails = React.useCallback((element) => {
    const { _id } = element;
    const url = `/ingredients/:${_id}`;
    window.history.pushState(null, '', url);
    sessionStorage
      .setItem('ingredient', JSON.stringify(element));
    dispatch(setIngredientDetails(element))
    setElement(true);
    setOpen(!isOpen);
  }, [dispatch, isOpen]);

  const closeModal = () => {
    setOpen(false);
    dispatch(deleteIngredientDetails());
    history.replace('/')
  }

  const handleButtonClick = () => {

      setElement(false);
      requestOrderDetails();
      setOpen(true);
      history.replace('/profile');

  }

  const requestOrderDetails = () => {
    dispatch(getOrderDetails(idList))
  }

  return (
    <Switch >

      <DndProvider backend={HTML5Backend}>
        {ingredients && <div className="App">
          <AppHeader />
          <Route path={`/ingredients/:${_id}`} >
            <IngredientPage />
          </Route>
          <Route path='/login'>
            <LoginPage />
          </Route>
          <Route path='/register'>
            <RegisterPage />
          </Route>
          <Route path='/forgot-password'>
            <ForgotPasswordPage />
          </Route>
          <Route path='/reset-password'>
            <ResetPasswordPage />
          </Route>
          <Route path='/profile'>
            <ProfilePage />
          </Route>
          <Route path='/' exact={true}>
            <Main handleOpenIngredientDetails={handleOpenIngredientDetails}
              handleButtonClick={handleButtonClick} />
          </Route>

          {isOpen ?
            (
              <Modal onClick={closeModal} onClose={closeModal} >
                {element ?
                  <IngredientDetails />
                  : <OrderDetails />}
              </Modal>
            )
            : null}
        </div >}
      </DndProvider>
    </Switch>
  )
}
