import { createStore } from "redux";
import CouponModel from "../Models/CouponModel";

export class CouponsState {
  public image: string = null;
  public coupons: CouponModel[] = [];
}

export enum CouponsActionType {
  GetCoupons,
  GetImage,
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

export function getCouponImageAction(image: string): CouponsAction {
  return {
    type: CouponsActionType.GetImage,
    payload: image,
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
    case CouponsActionType.GetImage:
      console.log("action payload : " + action.payload);
      newState.image = action.payload;
      console.log("newState image: " + newState.image);
      break;
  }
  return newState;
}

export const couponsStore = createStore(couponsReducer);
