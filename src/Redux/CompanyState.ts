import { createStore } from "redux";
import ComapnyModel from "../Models/CompanyModel";
import CouponModel from "../Models/CouponModel";

export class CompanyState {
  public coupon: CouponModel[] = [];
  public company: ComapnyModel[] = [];
}

export enum CompanyActionType {
  AddCoupon,
  UpdateCoupon,
  DeleteCoupon,
  GetCompanyCoupons,
  GetCompanyDetails,
}

export interface CompanyAction {
  type: CompanyActionType;
  payload: any;
}

export function addCoupon(coupon: CouponModel): CompanyAction {
  return {
    type: CompanyActionType.AddCoupon,
    payload: coupon,
  };
}
export function updateCoupon(coupon: CouponModel): CompanyAction {
  return {
    type: CompanyActionType.UpdateCoupon,
    payload: coupon,
  };
}
export function deleteCoupon(couponId: number): CompanyAction {
  return {
    type: CompanyActionType.DeleteCoupon,
    payload: couponId,
  };
}
export function getCompanyCoupons(coupons: CouponModel[]): CompanyAction {
  return {
    type: CompanyActionType.GetCompanyCoupons,
    payload: coupons,
  };
}
export function getCompanyCouponsByCategory(
  companyId: number,
  category: string
): CompanyAction {
  return {
    type: CompanyActionType.GetCompanyCoupons,
    payload: { companyId, category },
  };
}
export function getCompanyCouponsByMaxPrice(
  companyId: number,
  maxPrice: number
): CompanyAction {
  return {
    type: CompanyActionType.GetCompanyCoupons,
    payload: { companyId, maxPrice },
  };
}
export function getCompanyDetails(company: ComapnyModel): CompanyAction {
  return {
    type: CompanyActionType.GetCompanyDetails,
    payload: company,
  };
}

export function productsReducer(
  currentState: CompanyState = new CompanyState(),
  action: CompanyAction
): CompanyState {
  const newState = { ...currentState };
  switch (action.type) {
    case CompanyActionType.AddCoupon:
      newState.coupon.push(action.payload);
      break;
    case CompanyActionType.UpdateCoupon:
      const indexToUpdate = newState.coupon.findIndex(
        (p) => p.id === action.payload.id
      );
      if (indexToUpdate >= 0) newState.coupon[indexToUpdate] = action.payload;
      break;
    case CompanyActionType.DeleteCoupon:
      const indexToDelete = newState.coupon.findIndex(
        (p) => p.id === action.payload
      );
      if (indexToDelete >= 0) newState.coupon.splice(indexToDelete, 1);
      break;
    case CompanyActionType.GetCompanyCoupons:
      newState.company = action.payload;
      break;
    case CompanyActionType.GetCompanyDetails:
      newState.company.find((c) => c.id === action.payload);
      break;
  }
  return newState;
}
export const CompanyStore = createStore(productsReducer);
