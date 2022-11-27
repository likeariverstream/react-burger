import { TIngredientsAction } from './ingredients';
import { TIngredientDetailsAcion } from './ingredient-details';
import { TConstructorAction } from './constructor';
import { TForgotPasswordAcion } from './forgot-password';
import { TLoginAction } from './login';
import { TRegisterUserAction } from './register';
import { TResetPasswordAction } from './reset-password';
import { TOrderAction } from './order-details';
import { TUserAction } from './user';
import { TWsActions, IConstWsActions } from './socket'
import { TUserWsActions, IUserConstWsActions } from './user-orders-socket'

export type TUnionAction =
  | TUserWsActions
  | TWsActions
  | TIngredientsAction
  | TIngredientDetailsAcion
  | TConstructorAction
  | TForgotPasswordAcion
  | TLoginAction
  | TRegisterUserAction
  | TResetPasswordAction
  | TOrderAction
  | TUserAction

export type TConstMiddlewareActions =
  | IConstWsActions
  | IUserConstWsActions
