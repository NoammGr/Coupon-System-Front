import { NavLink } from "react-router-dom";
import CouponModel from "../../../Models/CouponModel";
import "./CouponsCard.css";
import appConfig from "../../../Utils/Config";

interface CouponCardProps {
  coupon: CouponModel;
}
function CouponsCard(props: CouponCardProps): JSX.Element {
  console.log(props.coupon);
  return (
    <div className="CouponsCard Box">
      {props.coupon.title} <br />
      Price: ${props.coupon.price} <br />
      Stock: {props.coupon.amount} <br />
      End-date: {props.coupon.endDate ? props.coupon.endDate.toString() : ""}
      <div>
        <NavLink to={"/coupons/details/" + props.coupon.id}>
          <img src={appConfig.couponsGetImageUrl + props.coupon.id} alt="" />
        </NavLink>
      </div>
    </div>
  );
}

export default CouponsCard;
