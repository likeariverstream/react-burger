import { TIngredientsAction } from './ingredients';
import { TLoginAction } from './login';
import { TRegisterUserAction } from './register';
import { TResetPasswordAction } from './reset-password';
import { TOrderAction } from './order-details';
import { TUserAction } from './user';
import { TWsActions, IConstWsActions } from './socket'
import { TUserWsActions, IUserConstWsActions } from './user-orders-socket'
import { TConstructorAction } from './constructor'
import { TIngredientDetailsAction } from './ingredient-details';

export type TUnionAction =
  | TUserWsActions
  | TWsActions
  | TIngredientsAction
  | TLoginAction
  | TRegisterUserAction
  | TResetPasswordAction
  | TOrderAction
  | TUserAction
  | TConstructorAction
  | TIngredientDetailsAction

export type TConstMiddlewareActions =
  | IConstWsActions
  | IUserConstWsActions
