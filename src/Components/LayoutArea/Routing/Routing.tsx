import { Navigate, Route, Routes } from "react-router-dom";
import "./Routing.css";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import Home from "../../HomeArea/Home/Home";
import PageNotFound from "../PageNotFound/PageNotFound";
import CouponsList from "../../CouponsArea/CouponsList/CouponsList";
import CouponsDetails from "../../CouponsArea/CouponsDetails/CouponsDetails";
import AddCompany from "../../AdminArea/AddCompany/AddCompany";
import AddCoupon from "../../CompanyArea/AddCoupon/AddCoupon";
import UpdateCompany from "../../AdminArea/UpdateCompany/UpdateCompany";

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

        {/* Admin Actions: */}
        <Route path="/admin/api/add-company" element={<AddCompany />} />
        <Route path="/admin/api/update-company" element={<UpdateCompany />} />

        {/* Company Actions: */}
        <Route path="/company/api/add-coupon" element={<AddCoupon />} />

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
