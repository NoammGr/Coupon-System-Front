import { useState, useEffect } from "react";
import CouponModel from "../../../Models/CouponModel";
import couponService from "../../../Services/CouponService";
import notificationService from "../../../Services/NotificationService";
import "./BrowseCoupons.css";
import CustomerCouponsCard from "./CustomerCouponsCard/CustomerCouponsCard";

function BrowseCoupons(): JSX.Element {
  const [coupons, setCoupons] = useState<CouponModel[]>([]);

  useEffect(() => {
    couponService.getAllCoupons().then(
      (arr) => {
        setCoupons(arr);
      },
      (error: any) => {
        notificationService.error(error);
      }
    );
  }, []);
  return (
    <div className="BrowseCoupons">
      {coupons.length === 0 && <div>Loading ...</div>}

      {coupons.map((p) => (
        <CustomerCouponsCard key={p.id} coupon={p} />
      ))}
    </div>
  );
}

export default BrowseCoupons;
