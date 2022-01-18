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
