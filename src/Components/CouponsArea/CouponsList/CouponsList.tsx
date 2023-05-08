import { useEffect, useState } from "react";
import "./CouponsList.css";
import CouponModel from "../../../Models/CouponModel";
import couponService from "../../../Services/CouponService";
import notificationService from "../../../Services/NotificationService";
import CouponsCard from "../CouponsCard/CouponsCard";

function CouponsList(): JSX.Element {
  const [coupons, setCoupons] = useState<CouponModel[]>([]);

  useEffect(() => {
    couponService.getAllCoupons().then(
      (arr) => {
        setCoupons(arr);
      },
      (error) => {
        notificationService.error(error);
      }
    );
  }, []);
  return (
    <div className="CouponsList">
      {coupons.length === 0 && <div>Loading ...</div>}

      {coupons.map((p) => (
        <CouponsCard key={p.id} coupon={p} />
      ))}
    </div>
  );
}

export default CouponsList;
