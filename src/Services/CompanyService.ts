import axios from "axios";
import CouponModel from "../Models/CouponModel";
import appConfig from "../Utils/Config";
import {
  addCouponAction,
  companyStore,
  deleteCouponAction,
  getCompanyCouponsAction,
  getCompanyCouponsByCategoryAction,
  getCompanyCouponsByMaxPriceAction,
  getCompanyDetailsAction,
  updateCouponAction,
} from "../Redux/CompanyState";
import CategoryModel from "../Models/CategoryModel";
import ComapnyModel from "../Models/CompanyModel";
import CompanyModel from "../Models/CompanyModel";

class CompanyService {
  public async addCoupon(coupon: CouponModel): Promise<void> {
    const formData = new FormData();
    formData.append("id", coupon.id.toString());
    formData.append("company", coupon.company.toString());
    formData.append("category", coupon.category.toString());
    formData.append("title", coupon.title);
    formData.append("description", coupon.description);
    formData.append("startDate", coupon.startDate.toString());
    formData.append("endDate", coupon.endDate.toString());
    formData.append("amount", coupon.amount.toString());
    formData.append("price", coupon.price.toString());
    formData.append("image", coupon.image as File);
    formData.append("customers", coupon.customers?.toString());
    await axios.post<CouponModel>(appConfig.companyAddCouponUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    companyStore.dispatch(addCouponAction(coupon));
  }

  public async updateCoupon(coupon: CouponModel): Promise<void> {
    const formData = new FormData();
    formData.append("id", coupon.id.toString());
    formData.append("company", coupon.company.toString());
    formData.append("category", coupon.category.toString());
    formData.append("title", coupon.title);
    formData.append("description", coupon.description);
    formData.append("startDate", coupon.startDate.toString());
    formData.append("endDate", coupon.endDate.toString());
    formData.append("amount", coupon.amount.toString());
    formData.append("price", coupon.price.toString());
    formData.append("image", coupon.image as File);
    formData.append("customers", coupon.customers?.toString());
    await axios.put<CouponModel>(appConfig.companyUpdateCouponUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    companyStore.dispatch(updateCouponAction(coupon));
  }

  public async deleteCoupon(couponId: number): Promise<void> {
    await axios.delete(appConfig.companyDeleteCouponUrl + couponId);
    companyStore.dispatch(deleteCouponAction(couponId));
  }

  public async getCompanyCoupons(companyId: number): Promise<CouponModel[]> {
    if (companyStore.getState().coupon.length === 0) {
      const response = await axios.get<CouponModel[]>(
        appConfig.companyGetAllCouponsUrl + companyId
      );
      const coupon = response.data;
      companyStore.dispatch(getCompanyCouponsAction(coupon));
      return coupon;
    }
    return companyStore.getState().coupon;
  }

  public async getCompanyCouponsByCategory(
    category: CategoryModel,
    companyId: number
  ): Promise<CouponModel[]> {
    if (companyStore.getState().coupon.length === 0) {
      const response = await axios.get<CouponModel[]>(
        appConfig.companyGetAllCouponsByCategoryUrl +
          "?category=" +
          category +
          "&companyId=" +
          companyId
      );
      const coupons = response.data;
      companyStore.dispatch(getCompanyCouponsByCategoryAction(category));
      return coupons;
    }
    return companyStore
      .getState()
      .coupon.filter((coupon) => coupon.category === category);
  }

  public async getCompanyCouponsByMaxPrice(
    maxPrice: number,
    companyId: number
  ): Promise<CouponModel[]> {
    if (companyStore.getState().coupon.length === 0) {
      const response = await axios.get<CouponModel[]>(
        appConfig.companyGetAllCouponsByMaxPriceUrl +
          "?maxPrice=" +
          maxPrice +
          "&companyId=" +
          companyId
      );
      const coupons = response.data;
      companyStore.dispatch(getCompanyCouponsByMaxPriceAction(maxPrice));
      return coupons;
    }
    return companyStore
      .getState()
      .coupon.filter((coupon) => coupon.price <= maxPrice);
  }

  public async getCompanyDetails(companyId: number): Promise<ComapnyModel> {
    const response = await axios.get<CompanyModel>(
      appConfig.companyGetCompanyDetailsUrl + "?companyId=" + companyId
    );
    const company = response.data;
    companyStore.dispatch(getCompanyDetailsAction(companyId));
    return company;
  }

  public async getCouponCount(): Promise<number> {
    const response = await axios.get(appConfig.companyGetCouponCountUrl);
    const couponId = response.data;
    return couponId;
  }
  public async getOneCoupon(couponId: number): Promise<CouponModel> {
    const response = await axios.get(
      appConfig.companyGetOneCouponUrl + couponId
    );
    const coupon = response.data;
    return coupon;
  }
}
const companyService = new CompanyService();
export default companyService;
