import { useState, useEffect } from "react";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import CouponModel from "../../../../Models/CouponModel";
import couponService from "../../../../Services/CouponService";
import notificationService from "../../../../Services/NotificationService";
import "./CompanyCouponDetails.css";
import companyService from "../../../../Services/CompanyService";
import { authStore } from "../../../../Redux/AuthState";

function CompanyCouponDetails(): JSX.Element {
  const navigate = useNavigate();
  const params = useParams();
  const couponId = +params.couponId;

  const [coupon, setCoupon] = useState<CouponModel>();
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    companyService
      .getOneCoupon(couponId)
      .then((coupId) => {
        setCoupon(coupId);
      })
      .catch((error: any) => {
        notificationService.error(error.response.data.message);
      });
    couponService
      .getCouponImage(couponId)
      .then((couponImage) => {
        setImage(couponImage);
      })
      .catch((error) => notificationService.error(error));
  }, [couponId]);

  async function deleteCoupon() {
    try {
      const ok = window.confirm("Are you sure ?");
      if (!ok) return;
      await companyService.deleteCoupon(couponId);
      notificationService.success("Coupon deleted");
      navigate("/company/api/manage-coupons");
    } catch (error: any) {
      notificationService.error(error.response.data.message);
      console.dir(error);
    }
  }

  return (
    <div className="CompanyCouponDetails Box">
      <h2>Coupon details :</h2>
      {coupon && (
        <span>
          <h3>Title: {coupon.title}</h3>
          <h3>Id: {coupon.id}</h3>
          <h3>Company: {authStore.getState().credentials.email}</h3>
          <h3>Category:{coupon.category}</h3>
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
          <NavLink to={"/company/api/manage-coupons"}>Return to coupons manager</NavLink>
          <span> | </span>
          <NavLink to={"/company/api/update-coupon/" + couponId}>
            Update
          </NavLink>
          <span> | </span>
          <NavLink to="" onClick={deleteCoupon}>
            Delete
          </NavLink>
        </span>
      )}
    </div>
  );
}

export default CompanyCouponDetails;
