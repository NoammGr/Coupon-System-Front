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
  updateCouponAction,
} from "../Redux/CompanyState";
import CategoryModel from "../Models/CategoryModel";
import ComapnyModel from "../Models/CompanyModel";
import CompanyModel from "../Models/CompanyModel";

class CompanyService {
  public async addCoupon(coupon: CouponModel): Promise<void> {
    const formData = new FormData();
    formData.append("id", coupon.id.toString());
    formData.append("company", coupon.company.id.toString());
    formData.append("category", coupon.category.toString());
    formData.append("title", coupon.title);
    formData.append("description", coupon.description);
    formData.append("startDate", coupon.startDate.getTime.toString());
    formData.append("endDate", coupon.endDate.getTime.toString());
    formData.append("amount", coupon.amount.toString());
    formData.append("price", coupon.price.toString());
    formData.append("image", coupon.image as File);
    formData.append("customers", (coupon.customers = null));
    const response = await axios.post<CouponModel>(
      appConfig.companyAddCouponUrl,
      formData
    );
    const addedCoupon = response.data;
    companyStore.dispatch(addCouponAction(addedCoupon));
  }

  public async updateCoupon(coupon: CouponModel): Promise<void> {
    const formData = new FormData();
    formData.append("id", coupon.id.toString());
    formData.append("company", coupon.company.id.toString());
    formData.append("category", coupon.category.toString());
    formData.append("title", coupon.title);
    formData.append("description", coupon.description);
    formData.append("startDate", coupon.startDate.getTime.toString());
    formData.append("endDate", coupon.endDate.getTime.toString());
    formData.append("amount", coupon.amount.toString());
    formData.append("price", coupon.price.toString());
    formData.append("image", coupon.image as File);
    formData.append("customers", (coupon.customers = null));
    const response = await axios.put<CouponModel>(
      appConfig.companyUpdateCouponUrl + coupon.id,
      formData
    );
    const updatedProduct = response.data;
    companyStore.dispatch(updateCouponAction(updatedProduct));
  }

  public async deleteCoupon(couponId: number): Promise<void> {
    await axios.delete(appConfig.companyDeleteCouponUrl + couponId);
    companyStore.dispatch(deleteCouponAction(couponId));
  }

  public async getCompanyCoupons(): Promise<CouponModel[]> {
    if (companyStore.getState().coupon.length === 0) {
      const response = await axios.get<CouponModel[]>(
        appConfig.companyGetAllCouponsUrl
      );
      const coupon = response.data;
      companyStore.dispatch(getCompanyCouponsAction(coupon));
      return coupon;
    }
    return companyStore.getState().coupon;
  }

  public async getCompanyCouponsByCategory(
    category: CategoryModel
  ): Promise<CouponModel[]> {
    if (companyStore.getState().coupon.length === 0) {
      const response = await axios.get<CouponModel[]>(
        appConfig.companyGetAllCouponsByCategoryUrl
      );
      const coupons = response.data.filter(
        (coupon) => coupon.category === category
      );
      companyStore.dispatch(getCompanyCouponsByCategoryAction(category));
      return coupons;
    }
    return companyStore
      .getState()
      .coupon.filter((coupon) => coupon.category === category);
  }

  public async getCompanyCouponsByMaxPrice(
    maxPrice: number
  ): Promise<CouponModel[]> {
    if (companyStore.getState().coupon.length === 0) {
      const response = await axios.get<CouponModel[]>(
        appConfig.companyGetAllCouponsByMaxPriceUrl
      );
      const coupons = response.data.filter(
        (coupon) => coupon.price <= maxPrice
      );
      companyStore.dispatch(getCompanyCouponsByMaxPriceAction(maxPrice));
      return coupons;
    }
    return companyStore
      .getState()
      .coupon.filter((coupon) => coupon.price <= maxPrice);
  }

  public async getCompanyDetails(companyId: number): Promise<ComapnyModel> {
    const response = await axios.get<CompanyModel>(
      appConfig.companyGetCompanyDetailsUrl + companyId
    );
    const company = response.data;
    return company;
  }
}
const companyService = new CompanyService();
export default companyService;
