import { Navigate, Route, Routes } from "react-router-dom";
import "./Routing.css";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import Home from "../../HomeArea/Home/Home";
import PageNotFound from "../PageNotFound/PageNotFound";
import CouponsList from "../../CouponsArea/CouponsList/CouponsList";
import CouponsDetails from "../../CouponsArea/CouponsDetails/CouponsDetails";
import AddCompany from "../../AdminArea/ManageCompanies/AddCompany/AddCompany";
import UpdateCompany from "../../AdminArea/ManageCompanies/UpdateCompany/UpdateCompany";
import ManageCompanies from "../../AdminArea/ManageCompanies/ManageCompanies";
import ManageCustomers from "../../AdminArea/ManageCustomers/ManageCustomers";
import CompanyDetails from "../../AdminArea/ManageCompanies/CompanyDetails/CompanyDetails";
import AddCustomer from "../../AdminArea/ManageCustomers/AddCustomer/AddCustomer";
import UpdateCustomer from "../../AdminArea/ManageCustomers/UpdateCustomer/UpdateCustomer";
import CustomerDetails from "../../AdminArea/ManageCustomers/CustomerDetails/CustomerDetails";
import ManageCoupons from "../../CompanyArea/ManageCoupons/ManageCoupons";
import GetCompanyDetailes from "../../CompanyArea/GetCompanyDetailes/GetCompanyDetailes";
import UpdateCoupon from "../../CompanyArea/ManageCoupons/UpdateCoupon/UpdateCoupon";
import CompanyCouponDetails from "../../CompanyArea/ManageCoupons/CompanyCouponDetails/CompanyCouponDetails";
import AddCoupon from "../../CompanyArea/ManageCoupons/AddCoupon/AddCoupon";
import CouponsByCategory from "../../CompanyArea/ManageCoupons/CouponsByCategory/CouponsByCategory";
import CouponsByMaxPrice from "../../CompanyArea/ManageCoupons/CouponsByMaxPrice/CouponsByMaxPrice";

function Routing(): JSX.Element {
  return (
    <div className="Routing">
      <Routes>
        {/* HTTP */}
        {/* Login */}
        <Route path="/login" element={<Login />} />
        {/* Logout */}
        <Route path="/logout" element={<Logout />} />
        {/* Home */}
        <Route path="/home" element={<Home />} />

        {/* Coupons */}
        <Route path="/coupons" element={<CouponsList />} />
        <Route path="/coupons/details/:couponId" element={<CouponsDetails />} />

        {/* Admin Area: */}
        <Route path="/admin/api/manage-companies"element={<ManageCompanies />}/>
        <Route path="/admin/api/manage-customers"element={<ManageCustomers />}/>
        <Route path="/admin/api/company/details/:companyId" element={<CompanyDetails />} />
        <Route path="/admin/api/customer/details/:customerId" element={<CustomerDetails />} />
        
        {/* Admin Actions: */}
        <Route path="/admin/api/add-company" element={<AddCompany />} />
        <Route path="/admin/api/update-company/:companyId" element={<UpdateCompany />} />
        <Route path="/admin/api/add-customer" element={<AddCustomer />} />
        <Route path="/admin/api/update-customer/:customerId" element={<UpdateCustomer />} />

        {/* Company Area: */}
        <Route path="/company/api/manage-coupons"element={<ManageCoupons />}/>
        <Route path="/company/api/coupon/details/:couponId" element={<CompanyCouponDetails />} />
        <Route path="/company/api/get-company-details" element={<GetCompanyDetailes />} />
        <Route path="/company/api/get-all-coupons-category" element={<CouponsByCategory/>}/>
        <Route path="/company/api/get-all-coupons-maxPrice" element={<CouponsByMaxPrice/>}/>

        {/* Company Actions: */}
        <Route path="/company/api/add-coupon" element={<AddCoupon />} />
        <Route path="/company/api/update-coupon/:couponId" element={<UpdateCoupon />} />

        {/* SERVER */}
        {/* Defulat Element */}
        <Route path="/" element={<Navigate to={"/home"} />} />
        {/* Page not found */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default Routing;
