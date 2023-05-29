import { useState, useEffect } from "react";
import couponService from "../../../../Services/CouponService";
import notificationService from "../../../../Services/NotificationService";
import "./MyCouponCard.css";
import CouponModel from "../../../../Models/CouponModel";
import { NavLink } from "react-router-dom";
interface MyCouponCardProps {
  coupon: CouponModel;
}
function MyCouponCard(props: MyCouponCardProps): JSX.Element {
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    couponService
      .getCouponImage(props.coupon.id)
      .then((response) => {
        setImage(response);
      })
      .catch((error) => {
        notificationService.error(error);
      });
  });

  return (
    <div className="MyCouponCard Box">
      {props.coupon.title} <br />
      Price: ${props.coupon.price} <br />
      Stock: {props.coupon.amount} <br />
      End-date: {props.coupon.endDate ? props.coupon.endDate.toString() : ""}
      <div>
        <NavLink to={"/customer/api/my-coupons/coupon/" + props.coupon.id}>
          <img src={image} alt="" />
        </NavLink>
      </div>
    </div>
  );
}

export default MyCouponCard;
