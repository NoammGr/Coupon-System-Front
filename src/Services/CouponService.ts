import axios from "axios";
import CouponModel from "../Models/CouponModel";
import { couponsStore, getCouponsAction } from "../Redux/CouponState";
import appConfig from "../Utils/Config";
import notificationService from "./NotificationService";

class CouponService {
  public async getAllCoupons(): Promise<CouponModel[]> {
    if (couponsStore.getState().coupons.length === 0) {
      return axios
        .get<CouponModel[]>(appConfig.couponsGetAll)
        .then((response) => {
          const coupons = response.data;
          couponsStore.dispatch(getCouponsAction(coupons));
          return coupons;
        })
        .catch((error) => {
          notificationService.error(error);
          throw error;
        });
    }
    return couponsStore.getState().coupons;
  }

  public async getOneCoupon(id: number): Promise<CouponModel> {
    return couponsStore.getState().coupons.find((p) => p.id === id);
  }

  public async getCouponImage(couponId: number): Promise<string> {
    return axios
      .get(appConfig.couponsGetImageUrl + couponId)
      .then((response) => {
        const responseString = response.data;
        return responseString;
      })
      .catch((error) => notificationService.error(error.message));
  }
}
const couponService = new CouponService();

export default couponService;
