import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import notificationService from "../../../Services/NotificationService";
import "./CouponsDetails.css";
import CouponModel from "../../../Models/CouponModel";
import couponService from "../../../Services/CouponService";

function CouponsDetails(): JSX.Element {
  const params = useParams();
  const couponId = +params.couponId;

  const [coupon, setCoupon] = useState<CouponModel>();
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    couponService
      .getOneCoupon(couponId)
      .then((c) => {
        setCoupon(c);
      })
      .catch((error: any) => {
        notificationService.error(error.response.data.message);
      });
    couponService
      .getCouponImage(couponId)
      .then((couponImage) => {
        setImage(couponImage);
      })
      .catch((error: any) => {
        notificationService.error(error.response.data.message);
      });
  }, [couponId]);
  return (
    <div className="CouponsDetails">
      <h3>Coupon details :</h3>
      {coupon && (
        <span>
          <h3>Name: {coupon.title}</h3>
          <h3>Category: ${coupon.category}</h3>
          <h3>Price: ${coupon.price}</h3>
          <h3>Stock: {coupon.amount}</h3>
          <h3>Description: {coupon.description}</h3>
          <h3>
            Start-date: {coupon.startDate ? coupon.startDate.toString() : ""}
          </h3>
          <h3>End-date: {coupon.endDate ? coupon.endDate.toString() : ""}</h3>
          <img className="DetailsImg" src={image} alt="" />
          <br />
          <br />
          <br />
          <NavLink to={"/coupons"}>Return to all coupons</NavLink>
        </span>
      )}
    </div>
  );
}

export default CouponsDetails;
