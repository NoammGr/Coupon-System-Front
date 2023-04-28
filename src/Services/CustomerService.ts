import axios from "axios";
import appConfig from "../Utils/Config";
import {
  customerStore,
  getcustomerCouponsAction,
  getcustomerCouponsByCategoryAction,
  getcustomerCouponsByMaxPriceAction,
  getcustomerDetailsAction,
  purchaseCouponAction,
} from "../Redux/CustomerState";
import CouponModel from "../Models/CouponModel";
import CategoryModel from "../Models/CategoryModel";
import CustomerModel from "../Models/CustomerModel";

class CustomerService {
  public async purchaseCoupon(
    couponId: number,
    customerId: number
  ): Promise<void> {
    const response = await axios.get<CouponModel>(
      appConfig.customerGetCustomerCouponsUrl + couponId + customerId
    );
    const coupon = response.data;
    customerStore.dispatch(purchaseCouponAction(coupon));
  }

  public async getCustomerCoupons(customerId: number): Promise<CouponModel[]> {
    if (customerStore.getState().coupon.length === 0) {
      const response = await axios.get<CouponModel[]>(
        appConfig.customerGetCustomerCouponsUrl + customerId
      );
      const coupon = response.data;
      customerStore.dispatch(getcustomerCouponsAction(coupon));
      return coupon;
    }
    return customerStore.getState().coupon;
  }

  public async getCustomerCouponsByCategory(
    category: CategoryModel
  ): Promise<CouponModel[]> {
    if (customerStore.getState().coupon.length === 0) {
      const response = await axios.get<CouponModel[]>(
        appConfig.companyGetAllCouponsByCategoryUrl
      );
      const coupons = response.data.filter(
        (coupon) => coupon.category === category
      );
      customerStore.dispatch(getcustomerCouponsByCategoryAction(category));
      return coupons;
    }
    return customerStore
      .getState()
      .coupon.filter((coupon) => coupon.category === category);
  }

  public async getCustomerCouponsByMaxPrice(
    maxPrice: number
  ): Promise<CouponModel[]> {
    if (customerStore.getState().coupon.length === 0) {
      const response = await axios.get<CouponModel[]>(
        appConfig.companyGetAllCouponsByMaxPriceUrl
      );
      const coupons = response.data.filter(
        (coupon) => coupon.price <= maxPrice
      );
      customerStore.dispatch(getcustomerCouponsByMaxPriceAction(maxPrice));
      return coupons;
    }
    return customerStore
      .getState()
      .coupon.filter((coupon) => coupon.price <= maxPrice);
  }

  public async getCompanyDetails(customerId: number): Promise<CustomerModel> {
    const response = await axios.get<CustomerModel>(
      appConfig.companyGetCompanyDetailsUrl + customerId
    );
    const customer = response.data;
    customerStore.dispatch(getcustomerDetailsAction(customer));
    return customer;
  }
}

const customerService = new CustomerService();
export default customerService;
