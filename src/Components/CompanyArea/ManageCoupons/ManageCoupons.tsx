import { useEffect, useState } from "react";
import "./ManageCoupons.css";
import CouponModel from "../../../Models/CouponModel";
import companyService from "../../../Services/CompanyService";
import { authStore } from "../../../Redux/AuthState";
import notificationService from "../../../Services/NotificationService";
import { NavLink } from "react-router-dom";
import CouponCard from "./CouponCard/CouponCard";

function ManageCoupons(): JSX.Element {
  const [coupons, setCoupons] = useState<CouponModel[]>([]);

  useEffect(() => {
    companyService
      .getCompanyCoupons(authStore.getState().credentials.sub)
      .then((coupons) => {
        setCoupons(coupons);
      })
      .catch((error: any) => {
        notificationService.error(error.response.data.message);
      });
  }, []);

  return (
    <div className="ManageCoupons">
      <NavLink className="AddCouponButton Box" to={"/company/api/add-coupon"}>
        Add coupon
      </NavLink>
      <NavLink className={"FilterByMaxPrice Box"} to={"/company/api/get-all-coupons-maxPrice"}>
        Filter by max price
      </NavLink>
      <NavLink className={"FilterByCategory Box"} to={"/company/api/get-all-coupons-category"}>
        Filter by category
      </NavLink>

      {coupons.length === 0 && <div>Loading ...</div>}

      {coupons.map((c) => (
        <CouponCard key={c.id} coupon={c} />
      ))}
    </div>
  );
}

export default ManageCoupons;
