import { useState, useEffect } from "react";
import CouponModel from "../../../../Models/CouponModel";
import couponService from "../../../../Services/CouponService";
import notificationService from "../../../../Services/NotificationService";
import "./CustomerCouponsCard.css";
import { NavLink } from "react-router-dom";

interface CustomerCouponCardProps {
  coupon: CouponModel;
}

function CustomerCouponsCard(props: CustomerCouponCardProps): JSX.Element {
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const responseString = await couponService.getCouponImage(
          props.coupon.id
        );
        setImage(responseString);
      } catch (error) {
        notificationService.error(error);
      }
    };
    fetchImage();
  });
  return (
    <div className="CustomerCouponsCard Box">
      {props.coupon.title} <br />
      Price: ${props.coupon.price} <br />
      Stock: {props.coupon.amount} <br />
      End-date: {props.coupon.endDate ? props.coupon.endDate.toString() : ""}
      <div>
        <NavLink to={"/customer/api/browse-coupons/coupon/" + props.coupon.id}>
          <img src={image} alt="" />
        </NavLink>
      </div>
    </div>
  );
}

export default CustomerCouponsCard;
