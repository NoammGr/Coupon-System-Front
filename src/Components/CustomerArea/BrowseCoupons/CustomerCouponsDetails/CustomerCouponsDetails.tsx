import { NavLink, useNavigate, useParams } from "react-router-dom";
import "./CustomerCouponsDetails.css";
import { useState, useEffect } from "react";
import CouponModel from "../../../../Models/CouponModel";
import couponService from "../../../../Services/CouponService";
import notificationService from "../../../../Services/NotificationService";
import customerService from "../../../../Services/CustomerService";
import { authStore } from "../../../../Redux/AuthState";

function CustomerCouponsDetails(): JSX.Element {
  const navigate = useNavigate();
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

  async function CouponPurchase() {
    try {
      const ok = window.confirm("Are you sure ?");
      if (!ok) return;
      await customerService.purchaseCoupon(
        coupon.id,
        authStore.getState().credentials.sub
      );
      notificationService.success("Coupon bought");
      navigate("/customer/api/browse-coupons");
    } catch (error: any) {
      notificationService.error(error.response.data.message);
    }
  }

  return (
    <div className="CustomerCouponsDetails Box">
      <h2>Coupon details :</h2>
      {coupon && (
        <span>
          <h3>Name: {coupon.title}</h3>
          <h3>Category: {coupon.category}</h3>
          <h3>Price: ${coupon.price}</h3>
          <h3>Stock: {coupon.amount}</h3>
          <h3>Description: {coupon.description}</h3>
          <h3>
            Start-date: {coupon.startDate ? coupon.startDate.toString() : ""}
          </h3>
          <h3>End-date: {coupon.endDate ? coupon.endDate.toString() : ""}</h3>
          <img className="CustomerDetailsImg" src={image} alt="" />
          <br />
          <br />
          <br />
          <NavLink to="" onClick={CouponPurchase}>Buy coupon</NavLink>
          <br />
          <br />
          <NavLink to={"/customer/api/browse-coupons"}>
            Return to browse coupons
          </NavLink>
        </span>
      )}
    </div>
  );
}

export default CustomerCouponsDetails;
