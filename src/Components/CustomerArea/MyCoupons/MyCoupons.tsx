import { useState, useEffect } from "react";
import CouponModel from "../../../Models/CouponModel";
import { authStore } from "../../../Redux/AuthState";
import customerService from "../../../Services/CustomerService";
import notificationService from "../../../Services/NotificationService";
import "./MyCoupons.css";
import MyCouponCard from "./MyCouponCard/MyCouponCard";

function MyCoupons(): JSX.Element {
  const [coupons, setCoupons] = useState<CouponModel[]>([]);

  useEffect(() => {
    customerService
      .getCustomerCoupons(authStore.getState().credentials.sub)
      .then(
        (arr) => {
          setCoupons(arr);
        },
        (error: any) => {
          notificationService.error(error);
        }
      );
  }, []);
  return (
    <div className="MyCoupons">
      {coupons.length === 0 && <div>Loading ...</div>}

      {coupons.map((p) => (
        <MyCouponCard key={p.id} coupon={p} />
      ))}
    </div>
  );
}

export default MyCoupons;
