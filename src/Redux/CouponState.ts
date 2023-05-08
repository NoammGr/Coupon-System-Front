import { createStore } from "redux";
import CouponModel from "../Models/CouponModel";

export class CouponsState {
  public coupons: CouponModel[] = [];
}

export enum CouponsActionType {
  GetCoupons,
}

export interface CouponsAction {
  type: CouponsActionType;
  payload: any;
}

export function getCouponsAction(coupons: CouponModel[]): CouponsAction {
  return {
    type: CouponsActionType.GetCoupons,
    payload: coupons,
  };
}

export function couponsReducer(
  currentState: CouponsState = new CouponsState(),
  action: CouponsAction
): CouponsState {
  const newState = { ...currentState };
  switch (action.type) {
    case CouponsActionType.GetCoupons:
      newState.coupons = action.payload;
      break;
  }
  return newState;
}

export const couponsStore = createStore(couponsReducer);
