import { NavLink } from "react-router-dom";
import CouponModel from "../../../../Models/CouponModel";
import "./CouponCard.css";

interface CouponCardProp {
  coupon: CouponModel;
}

function CouponCard(props: CouponCardProp): JSX.Element {
  return (
    <div className="CouponCard Box">
      <NavLink to={"/company/api/coupon/details/" + props.coupon.id}>
        <h2>{props.coupon.title}</h2>
      </NavLink>
      Id: {props.coupon.id} <br />
      End date: {props.coupon.endDate.toString()} <br />
      Amount: {props.coupon.amount}
    </div>
  );
}

export default CouponCard;
