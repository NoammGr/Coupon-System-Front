import { createStore } from "redux";
import ComapnyModel from "../Models/CompanyModel";
import CouponModel from "../Models/CouponModel";
import CustomerModel from "../Models/CustomerModel";

export class CustomerState {
  public coupon: CouponModel[] = [];
  public customer: CustomerModel[] = [];
}

export enum customerActionType {
  PurchaseCoupon,
  GetCustomerCoupon,
  GetCustomerDetails,
}

export interface customerAction {
  type: customerActionType;
  payload: any;
}

export function purchaseCoupon(
  coupon: CouponModel,
  custoemr: CustomerModel
): customerAction {
  return {
    type: customerActionType.PurchaseCoupon,
    payload: { coupon, custoemr },
  };
}
export function getcustomerCoupons(
  coupons: CouponModel[],
  customer: CustomerModel
): customerAction {
  return {
    type: customerActionType.GetCustomerCoupon,
    payload: { coupons, customer },
  };
}
export function getcustomerCouponsByCategory(
  customerId: number,
  category: string
): customerAction {
  return {
    type: customerActionType.GetCustomerCoupon,
    payload: { customerId, category },
  };
}
export function getcustomerCouponsByMaxPrice(
  customerId: number,
  maxPrice: number
): customerAction {
  return {
    type: customerActionType.GetCustomerCoupon,
    payload: { customerId, maxPrice },
  };
}
export function getcustomerDetails(customer: ComapnyModel): customerAction {
  return {
    type: customerActionType.GetCustomerCoupon,
    payload: customer,
  };
}

export function productsReducer(
  currentState: CustomerState = new CustomerState(),
  action: customerAction
): CustomerState {
  const newState = { ...currentState };
  switch (action.type) {
    case customerActionType.PurchaseCoupon:
      newState.coupon.push(action.payload);
      break;
    case customerActionType.GetCustomerCoupon:
      newState.customer = action.payload;
      break;
    case customerActionType.GetCustomerDetails:
      newState.customer.find((c) => c.id === action.payload);
      break;
  }
  return newState;
}
export const customerStore = createStore(productsReducer);
