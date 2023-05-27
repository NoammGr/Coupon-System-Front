import { NavLink, useParams } from "react-router-dom";
import "./MyCouponDetails.css";
import { useState, useEffect } from "react";
import CouponModel from "../../../../Models/CouponModel";
import couponService from "../../../../Services/CouponService";
import notificationService from "../../../../Services/NotificationService";

function MyCouponDetails(): JSX.Element {
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
      .catch((error) => {
        notificationService.error(error.response.data.message);
      });
    couponService
      .getCouponImage(couponId)
      .then((couponImage) => {
        setImage(couponImage);
      })
      .catch((error) => {
        notificationService.error(error.response.data.message);
      });
  }, [couponId]);

  function generateRandomString(length: number): string {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomString = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters[randomIndex];
    }

    return randomString;
  }

  return (
    <div className="MyCouponDetails Box">
      <h2>Coupon details :</h2>
      {coupon && (
        <span>
          <h3>Name: {coupon.title}</h3>
          <h3>Category: {coupon.category}</h3>
          <h3>Price: ${coupon.price}</h3>
          <h3>Description: {coupon.description}</h3>
          <h3>End-date: {coupon.endDate ? coupon.endDate.toString() : ""}</h3>
          <h3>Code: {generateRandomString(10)}</h3>
          <img className="MyDetailsImg" src={image} alt="" />
          <br />
          <br />
          <br />
          <NavLink to={"/customer/api/my-coupons"}>
            Return to my coupons
          </NavLink>
        </span>
      )}
    </div>
  );
}

export default MyCouponDetails;
