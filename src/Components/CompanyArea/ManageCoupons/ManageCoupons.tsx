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
      .catch((error) => {
        notificationService.error(error);
      });
  }, []);

  return (
    <div className="ManageCoupons">
      <NavLink className="AddCouponButton Box" to={"/company/api/add-coupon"}>
        Add coupon
      </NavLink>

      {coupons.length === 0 && <div>Loading ...</div>}

      {coupons.map((c) => (
        <CouponCard key={c.id} coupon={c} />
      ))}
    </div>
  );
}

export default ManageCoupons;
