import { createStore } from "redux";
import CouponModel from "../Models/CouponModel";
import CustomerModel from "../Models/CustomerModel";
import CategoryModel from "../Models/CategoryModel";

export class CustomerState {
  public coupon: CouponModel[] = [];
  public customer: CustomerModel[] = [];
}

export enum customerActionType {
  PurchaseCoupon,
  GetCustomerCoupons,
  GetCustomerDetails,
}

export interface customerAction {
  type: customerActionType;
  payload: any;
}

export function purchaseCouponAction(coupon: CouponModel): customerAction {
  return {
    type: customerActionType.PurchaseCoupon,
    payload: coupon,
  };
}
export function getCustomerCouponsAction(
  coupons: CouponModel[]
): customerAction {
  return {
    type: customerActionType.GetCustomerCoupons,
    payload: coupons,
  };
}
export function getCustomerCouponsByCategoryAction(
  category: CategoryModel
): customerAction {
  return {
    type: customerActionType.GetCustomerCoupons,
    payload: category,
  };
}
export function getCustomerCouponsByMaxPriceAction(
  maxPrice: number
): customerAction {
  return {
    type: customerActionType.GetCustomerCoupons,
    payload: maxPrice,
  };
}
export function getCustomerDetailsAction(
  customer: CustomerModel
): customerAction {
  return {
    type: customerActionType.GetCustomerCoupons,
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
    case customerActionType.GetCustomerCoupons:
      newState.customer = action.payload;
      break;
    case customerActionType.GetCustomerDetails:
      newState.customer.find((c) => c.id === action.payload);
      break;
  }
  return newState;
}
export const customerStore = createStore(productsReducer);
