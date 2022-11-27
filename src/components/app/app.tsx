import React, { FC, MouseEventHandler } from 'react';
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
import { FeedPage } from '../../pages/feed-page/feed-page';
import { FeedDetails } from '../../pages/feed-details/feed-details';
import { ProfileOrderInfo } from '../../pages/profile-order-info/profile-order-info';
import { ProfileOrders } from '../../pages/profile-orders/profile-orders'

type TLocation = ReturnType<typeof useLocation>;
export type TUseLocation = {
  [key: string]: string | null | TUseLocation | TLocation,
};


export const App: FC = () => {
  const { isLoggedIn } = useSelector(state => state.login)
  const login = isLoggedIn
  const location = useLocation<TUseLocation>();
  let background = location.state && location.state.background
  const dispatch = useDispatch();
  const history = useHistory();
  const data = useSelector(state => state.constructorList.constructorList);
  const ingredients = useSelector(state => state.ingredients.ingredientsList);
  const { _id } = useSelector(state => state.ingredientDetails.ingredientDetails);
  const idList = React.useMemo(() => {
    return data.map(element => element._id)
  }, [data])
  const [isOpen, setOpen] = React.useState(false)

  React.useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch]);



  const closeModal = () => {
    setOpen(false);
    dispatch(deleteIngredientDetails());
    dispatch(deleteOrder());
    history.push('/')
  }

  const handleButtonClick = React.useCallback(() => {
    if (login) {
      dispatch(getOrderDetails(idList))
      setOpen(true);
    }
    if (!login) {
      history.push('/login');
    }
  }, [dispatch, history, login, idList])
  const orderId = '344343'
  return (
    <DndProvider backend={HTML5Backend}>
      {ingredients && <div className="App">
        <AppHeader />
        <Switch location={background as TLocation || location}>
          <Route path='/feed' exact>
            <FeedPage />
          </Route>
          <Route path={`/feed/:id`}>
            <FeedDetails />
          </Route>
          <Route path={`/profile/orders/:${orderId}`}>
            <ProfileOrderInfo />
          </Route >
          <Route path='/profile/orders/'>
            <ProfileOrders />
          </Route>
          <Route path={`/ingredients/:id`}>
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
          <ProtectedRoute path='/reset-password' >
            <ResetPasswordPage />
          </ProtectedRoute>
          <ProtectedRoute path='/profile'>
            <ProfilePage />
          </ProtectedRoute>
          <Route path='/' exact>
            <Main 
              handleButtonClick={handleButtonClick} />
          </Route>
          <Route path='*'>
            <NotFound404 />
          </Route>
        </Switch>
        {background &&
          <Route path={`/ingredients/:id`}>
            (
            <Modal onClick={closeModal} onClose={closeModal} >
              <IngredientDetails />
            </Modal>
            )</Route>}
        {isOpen && <Modal onClick={closeModal} onClose={closeModal} >
          <OrderDetails />
        </Modal>}

      </div>}
    </DndProvider>
  )
}
