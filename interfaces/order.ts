import { IUser, ISize } from "./";

export interface IOrder {
  _id?: string;
  user?: IUser | string;
  orderItems: IOrderItems[];
  shippingAddress: ShippingAddress;
  paymentResult?: string;
  numberOfItems: number;
  subTotal: number;
  iva: number;
  total: number;
  isPaid: boolean;
  paidAt?: string;

  dolarTotal?: number;
  transactionId?: string;
  createdAt?: string;
}

export interface IOrderItems {
  _id: string;
  title: string;
  size: ISize;
  quantity: number;
  slug: string;
  image: string;
  price: number;
  gender: string;
}

export interface ShippingAddress {
  name: string;
  lastName: string;
  address1: string;
  address2?: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
}
