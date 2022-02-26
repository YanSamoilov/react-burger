import {
  AUTH_USER_FAILED,
  AUTH_USER_SUCCESS,
  CHANGE_USER_FAILED,
  CHANGE_USER_SUCCESS,
  GET_SERVER_REQUEST,
  LOGOUT_USER_FAILED,
  LOGOUT_USER_SUCCESS,
  POST_EMAIL_FORGOT_PAGE_FAILED,
  POST_EMAIL_FORGOT_PAGE_SUCCESS,
  POST_NEW_PASSWORD_FAILED,
  POST_NEW_PASSWORD_SUCCESS,
  REGISTER_USER_FAILED,
  REGISTER_USER_SUCCESS,
  GET_SERVER_REQUEST_RESET
} from "services/constants/userAuth";

export interface IAllOrdersData {
  allOrders: ReadonlyArray<IFeedOrder>;
}

export interface IOrderData {
  orderData: IFeedOrder;
}

export interface IWSMessageFeed {
  orders: ReadonlyArray<IFeedOrder>;
  success: boolean;
  total: number;
  totalToday: number;
}

export interface IFeedOrder {
  createdAt: string;
  ingredients: ReadonlyArray<string>;
  name: string;
  number: number;
  status: string;
  updatedAt: string;
  _id: string;
}

export interface IIngredient {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  uid? : string;
}

export interface IConstructorIngredientProps {
  name: string;
  price: number;
  image: string;
  uid : string | undefined;
}

export interface IIngredientProps {
  name: string;
  price: number;
  image: string;
  id : string;
}

export interface IIngredientDetails<IIngredient> {
  ingredient: IIngredient;
}

export interface IModalProps {
  children:React.ReactNode;
  handleCloseModal: any;
}

export interface IFullTabProps {
  bunHeadingRef: React.RefObject<HTMLHeadingElement>;
  sauceHeadingRef: React.RefObject<HTMLHeadingElement>;
  mainIngredientHeadingRef: React.RefObject<HTMLHeadingElement>;
  value: string;
}

export interface IOrderDetailsProps {
  orderNum: number | null;
  errorOrderNum: string | null;
}

export interface IDroppedIngredientId {
  id: string;
}

export interface IServerReply {
  success: true;
  user: {
    email: string;
    name: string;
  };
  accessToken: string;
  refreshToken: string;
};

export interface IServerRequest {
  readonly type: typeof GET_SERVER_REQUEST;
}

export interface ILogOutSuccess {
  readonly type: typeof LOGOUT_USER_SUCCESS;
}

export interface ILogOutFailed {
  readonly type: typeof LOGOUT_USER_FAILED;
  logoutErrorMessage: string | null;
}

export interface IRegisterUserSuccess {
  readonly type: typeof REGISTER_USER_SUCCESS;
}

export interface IRegisterUserFailed {
  readonly type: typeof REGISTER_USER_FAILED;
  registerErrorMessage: string | null;
}

export interface IAuthUserSuccess {
  readonly type: typeof AUTH_USER_SUCCESS;
  email: string;
  name: string;
}

export interface IAuthUserFailed {
  readonly type: typeof AUTH_USER_FAILED;
  authErrorMessage: string;
}

export interface IChangeUserSuccess {
  readonly type: typeof CHANGE_USER_SUCCESS;
  changeUserResultMessage: string;
  email: string;
  name: string;
}

export interface IChangeUserFailed {
  readonly type: typeof CHANGE_USER_FAILED;
  changeUserErrorMessage: string;
}

export interface IPostEmailForgotPageSuccess {
  readonly type: typeof POST_EMAIL_FORGOT_PAGE_SUCCESS;
}

export interface IPostEmailForgotPageFailed {
  readonly type: typeof POST_EMAIL_FORGOT_PAGE_FAILED;
  postEmailForgotPageErrorMessage: string;
}

export interface IPostNewPasswordSuccess {
  readonly type: typeof POST_NEW_PASSWORD_SUCCESS;
}

export interface IPostNewPasswordFailed {
  postNewpasswordErrorMessage: string | null;
  readonly type: typeof POST_NEW_PASSWORD_FAILED;
}

export interface IServerRequestReset {
  readonly type: typeof GET_SERVER_REQUEST_RESET;
}
