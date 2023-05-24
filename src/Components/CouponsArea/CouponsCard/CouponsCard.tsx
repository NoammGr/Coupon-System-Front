import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import CouponModel from "../../../Models/CouponModel";
import "./CouponsCard.css";
import couponService from "../../../Services/CouponService";
import notificationService from "../../../Services/NotificationService";

interface CouponCardProps {
  coupon: CouponModel;
}

function CouponsCard(props: CouponCardProps): JSX.Element {
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const responseString = await couponService.getCouponImage(
          props.coupon.id
        );
        setImage(responseString);
      } catch (error) {
        console.error("Error:", error);
        notificationService.error(error);
      }
    };
    fetchImage();
  });

  return (
    <div className="CouponsCard Box">
      {props.coupon.title} <br />
      Price: ${props.coupon.price} <br />
      Stock: {props.coupon.amount} <br />
      End-date: {props.coupon.endDate ? props.coupon.endDate.toString() : ""}
      <div>
        <NavLink to={"/coupons/details/" + props.coupon.id}>
          <img src={image} alt="" />
        </NavLink>
      </div>
    </div>
  );
}

export default CouponsCard;
