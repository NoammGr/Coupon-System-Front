import axios from "axios";
import CouponModel from "../Models/CouponModel";
import {
  couponsStore,
  getCouponImageAction,
  getCouponsAction,
} from "../Redux/CouponState";
import appConfig from "../Utils/Config";

class CouponService {
  public async getAllCoupons(): Promise<CouponModel[]> {
    if (couponsStore.getState().coupons.length === 0) {
      const response = await axios.get<CouponModel[]>(appConfig.couponsGetAll);
      const coupons = response.data;
      couponsStore.dispatch(getCouponsAction(coupons));
      return coupons;
    }
    return couponsStore.getState().coupons;
  }

  public async getOneCoupon(id: number): Promise<CouponModel> {
    return couponsStore.getState().coupons.find((p) => p.id === id);
  }

  public async getCouponImage(couponId: number): Promise<string> {
    const response = await axios.get(appConfig.couponsGetImageUrl + couponId);
    const responseString = response.data;
    couponsStore.dispatch(getCouponImageAction(responseString));
    return responseString;
  }
}
const couponService = new CouponService();

export default couponService;
