import React, { FC } from 'react';
import styles from './app.module.css'
import { AppHeader } from '../app-header/app-header';
import { Modal } from '../modal/modal';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { OrderDetails } from '../order-details/order-details';
import { getIngredients } from '../../services/actions/ingredients';
import { Main } from '../main/main';
import {
  routes
} from '../../utils/constants'
import {
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
import { FeedPage } from '../../pages/feed-page/feed-page';
import { FeedDetailsPage } from '../../pages/feed-details-page/feed-details-page';
import { ProfileOrderInfo } from '../../pages/profile-order-info/profile-order-info';
import { ProfileOrders } from '../../pages/profile-orders/profile-orders';

type TLocation = ReturnType<typeof useLocation>;

export type TUseLocation = {
  [key: string]: string | null | TUseLocation | TLocation,
};

export const App: FC = () => {

  const { isLoggedIn: login } = useSelector(state => state.login)
  const location = useLocation<TUseLocation>();
  let background = location.state && location.state.background
  const dispatch = useDispatch();
  const history = useHistory();
  const data = useSelector(state => state.constructorList.constructorList);
  const ingredients = useSelector(state => state.ingredients.ingredientsList);
  const idList = React.useMemo(() => {
    return data.map(element => element._id)
  }, [data])
  const [isOpen, setOpen] = React.useState(false)

  React.useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const closeModal = () => {
    setOpen(false);
    dispatch(deleteIngredientDetails());
    dispatch(deleteOrder());
    history.push({
      ...location.state.background as TLocation | TUseLocation,
      state: { background: null },
    });
  }

  const handleButtonClick = React.useCallback(() => {
    if (login) {
      dispatch(getOrderDetails(idList))
      setOpen(true);
    }
    if (!login) {
      history.push(routes.login);
    }
  }, [dispatch, history, login, idList])

  return (
    <DndProvider backend={HTML5Backend}>
      {ingredients && <div className={styles.app}>
        <AppHeader />
        <Switch location={background as TLocation || location}>
          <Route path={routes.feed} exact>
            <FeedPage />
          </Route>
          <Route path={`${routes.feed}/:id`}>
            <FeedDetailsPage />
          </Route>
          <Route path={`${routes.ingredients}/:id`}>
            <IngredientPage />
          </Route>
          <ProtectedRoute onlyForAuth={false} path={routes.login} exact>
            <LoginPage />
          </ProtectedRoute>
          <Route path={routes.register} exact>
            <RegisterPage />
          </Route>
          <Route path={routes.forgotPassword} exact>
            <ForgotPasswordPage />
          </Route>
          <ProtectedRoute path={routes.resetPassword} >
            <ResetPasswordPage />
          </ProtectedRoute>
          <ProtectedRoute onlyForAuth={true} path={`${routes.profileOrders}/:id`}>
            <ProfileOrderInfo />
          </ProtectedRoute>
          <ProtectedRoute onlyForAuth={true} path={routes.profileOrders}>
            <ProfileOrders />
          </ProtectedRoute>
          <ProtectedRoute onlyForAuth={true} path={routes.profile}>
            <ProfilePage />
          </ProtectedRoute>
          <Route path={routes.home} exact>
            <Main
              handleButtonClick={handleButtonClick} />
          </Route>
          <Route path='*'>
            <NotFound404 />
          </Route>
        </Switch>
        {background &&
          <Route path={`${routes.ingredients}/:id`}>
            <Modal onClick={closeModal} onClose={closeModal} >
              <IngredientDetails />
            </Modal>
          </Route>}
        {background &&
          <Route path={`${routes.feed}/:id`}>
            <Modal onClick={closeModal} onClose={closeModal} >
              <FeedDetailsPage />
            </Modal>
          </Route>
        }
        {background &&
          <Route path={`${routes.profileOrders}/:id`}>
            <Modal onClick={closeModal} onClose={closeModal} >
              <ProfileOrderInfo />
            </Modal>
          </Route>
        }
        {isOpen && <Modal onClick={closeModal} onClose={closeModal} >
          <OrderDetails />
        </Modal>}
      </div>}
    </DndProvider>
  )
}
