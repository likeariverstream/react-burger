import React, { FC } from 'react';
import { AppHeader } from '../app-header/app-header';
import { Modal } from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { OrderDetails } from '../order-details/order-details';
import { getIngredients } from '../../services/actions/ingredients';
import { Main } from '../main/main';
import {
  setIngredientDetails,
  deleteIngredientDetails
} from '../../services/actions/ingredient-details';
import { getOrderDetails } from '../../services/actions/order-details';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { IngredientPage } from '../../pages/ingredient-page/ingredient-page';
import { LoginPage } from '../../pages/login-page/login-page';
import { RegisterPage } from '../../pages/register-page/register-page';
import { ForgotPasswordPage } from '../../pages/forgot-password-page/forgot-password-page';
import { ResetPasswordPage } from '../../pages/reset-password-page/reset-password-page';
import { ProfilePage } from '../../pages/profile-page/profile-page';
import { ProtectedRoute } from '../protected-route/protected-route';
import { NotFound404 } from '../../pages/not-found-page/not-found-page';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { deleteOrder } from '../../services/actions/order-details';
import { useSelector, useDispatch } from '../../utils/hooks';
import { TIngredient } from '../../utils/types';

export const App: FC = () => {
  const { login: loginUser } = useSelector(state => state.login)
  const login = loginUser || JSON.parse(sessionStorage.getItem('login') as string);
  const location = useLocation();
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

  const handleOpenIngredientDetails = React.useCallback((element: TIngredient): void => {
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
    dispatch(deleteOrder());
    history.replace('/');
  }

  const handleButtonClick = React.useCallback(() => {
    if (login) {
      setElement(false);
      dispatch(getOrderDetails(idList))
      setOpen(true);
    }
    if (!login) {
      history.push('/login');
    }
  }, [dispatch, history, login, idList])

  return (
    <DndProvider backend={HTML5Backend}>
      {ingredients && <div className="App">
        <AppHeader />
        <Switch location={location}>
          <Route path={`/ingredients/:${_id}`}>
            <IngredientPage />
          </Route>
          <Route path='/login' exact>
            <LoginPage />
          </Route>
          <Route path='/register' exact>
            <RegisterPage />
          </Route>
          <Route path='/forgot-password' exact>
            <ForgotPasswordPage />
          </Route>
          <Route path='/reset-password' exact>
            <ResetPasswordPage />
          </Route>
          <ProtectedRoute path='/profile'>
            <ProfilePage />
          </ProtectedRoute>
          <Route path='/' exact>
            <Main handleOpenIngredientDetails={handleOpenIngredientDetails}
              handleButtonClick={handleButtonClick} />
          </Route>
          <Route path='*'>
            <NotFound404 />
          </Route>
        </Switch>
        {isOpen ?
          (
            <Modal onClick={closeModal} onClose={closeModal} >
              {element ?
                <IngredientDetails />
                : <OrderDetails />}
            </Modal>
          )
          : null}
      </div>}
    </DndProvider>
  )
}
