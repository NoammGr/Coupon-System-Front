// configuration for develepment and production environments
// General
class Config {}

// Development Environment
class DevelopmentConfig extends Config {
  // login
  loginUrl = "http://localhost:8080/login";
  // admin
  adminAddCompanyUrl = "http://localhost:8080/admin/api/add-company";
  adminUpdateCompanyUrl = "http://localhost:8080/admin/api/update-company";
  adminDeleteCompanyUrl = "http://localhost:8080/admin/api/delete-company?companyId=";
  adminGetAllCompaniesUrl = "http://localhost:8080/admin/api/get-all-companies";
  adminGetOneCompanyUrl = "http://localhost:8080/admin/api/get-one-company?companyId=";
  adminAddCustomerUrl = "http://localhost:8080/admin/api/add-customer";
  adminUpdateCustomerUrl = "http://localhost:8080/admin/api/update-customer";
  adminDeleteCustomerUrl = "http://localhost:8080/admin/api/delete-customer?customerId=";
  adminGetAllCustomersUrl = "http://localhost:8080/admin/api/get-all-customers";
  adminGetOneCustomerUrl = "http://localhost:8080/admin/api/get-one-customer?customerId=";
  adminGetCompanyCountUrl = "http://localhost:8080/admin/api/get-company-number";
  adminGetCustomerCountUrl = "http://localhost:8080/admin/api/get-customer-number";
  // comapny
  companyAddCouponUrl = "http://localhost:8080/company/api/add-coupon";
  companyUpdateCouponUrl = "http://localhost:8080/company/api/update-coupon";
  companyDeleteCouponUrl = "http://localhost:8080/company/api/delete-coupon?couponId=";
  companyGetAllCouponsUrl = "http://localhost:8080/company/api/get-all-company-coupons?companyId=";
  companyGetAllCouponsByCategoryUrl = "http://localhost:8080/company/api/get-all-coupons-category";
  companyGetAllCouponsByMaxPriceUrl = "http://localhost:8080/company/api/get-all-coupons-maxPrice";
  companyGetCompanyDetailsUrl = "http://localhost:8080/company/api/get-company-details";
  companyGetCouponCountUrl = "http://localhost:8080/company/api/get-coupon-number"
  companyGetOneCouponUrl = "http://localhost:8080/company/api/get-company-coupon?couponId="
  // customer
  customerPurchaseCouponUrl = "http://localhost:8080/customer/api/coupon-purchase";
  customerGetCustomerCouponsUrl = "http://localhost:8080/customer/api/get-customer-coupons";
  customerGetcustomerCouponsByCategoryUrl = "http://localhost:8080/customer/api/get-coupons-category";
  customerGetcustomerCouponsByMaxPriceUrl = "http://localhost:8080/customer/api/get-coupons-maxPrice";
  customerGetcustomerDetailsUrl = "http://localhost:8080/customer/api/get-customer-details";
  // general api
  couponsGetAll = "http://localhost:8080/general/api/get-all-coupons";
  couponsGetImageUrl = "http://localhost:8080/general/api/get-image-id?couponId=";
}

// Production Environment
class ProductionConfig extends Config {
  // login
  loginUrl = "http://localhost:8080/login";
  // admin
  adminAddCompanyUrl = "http://localhost:8080/admin/api/add-company";
  adminUpdateCompanyUrl = "http://localhost:8080/admin/api/update-company";
  adminDeleteCompanyUrl = "http://localhost:8080/admin/api/delete-company?companyId=";
  adminGetAllCompaniesUrl = "http://localhost:8080/admin/api/get-all-companies";
  adminGetOneCompanyUrl = "http://localhost:8080/admin/api/get-one-company?companyId=";
  adminAddCustomerUrl = "http://localhost:8080/admin/api/add-customer";
  adminUpdateCustomerUrl = "http://localhost:8080/admin/api/update-customer";
  adminDeleteCustomerUrl = "http://localhost:8080/admin/api/delete-customer?customerId=";
  adminGetAllCustomersUrl = "http://localhost:8080/admin/api/get-all-customers";
  adminGetOneCustomerUrl = "http://localhost:8080/admin/api/get-one-customer?customerId=";
  adminGetCompanyCountUrl = "http://localhost:8080/admin/api/get-company-number";
  adminGetCustomerCountUrl = "http://localhost:8080/admin/api/get-customer-number";
  // comapny
  companyAddCouponUrl = "http://localhost:8080/company/api/add-coupon";
  companyUpdateCouponUrl = "http://localhost:8080/company/api/update-coupon";
  companyDeleteCouponUrl = "http://localhost:8080/company/api/delete-coupon?couponId=";
  companyGetAllCouponsUrl = "http://localhost:8080/company/api/get-all-company-coupons?companyId=";
  companyGetAllCouponsByCategoryUrl = "http://localhost:8080/company/api/get-all-coupons-category";
  companyGetAllCouponsByMaxPriceUrl = "http://localhost:8080/company/api/get-all-coupons-maxPrice";
  companyGetCompanyDetailsUrl = "http://localhost:8080/company/api/get-company-details";
  companyGetCouponCountUrl = "http://localhost:8080/company/api/get-coupon-number"
  companyGetOneCouponUrl = "http://localhost:8080/company/api/get-company-coupon?couponId="
  // customer
  customerPurchaseCouponUrl = "http://localhost:8080/customer/api/coupon-purchase";
  customerGetCustomerCouponsUrl = "http://localhost:8080/customer/api/get-customer-coupons";
  customerGetcustomerCouponsByCategoryUrl = "http://localhost:8080/customer/api/get-coupons-category";
  customerGetcustomerCouponsByMaxPriceUrl = "http://localhost:8080/customer/api/get-coupons-maxPrice";
  customerGetcustomerDetailsUrl = "http://localhost:8080/customer/api/get-customer-details";
    // general api
    couponsGetAll = "http://localhost:8080/general/api/get-all-coupons";
    couponsGetImageUrl = "http://localhost:8080/general/api/get-image-id?couponId=";
}

const appConfig =
  process.env.NODE_ENV === "development"
    ? new DevelopmentConfig()
    : new ProductionConfig();

export default appConfig;
