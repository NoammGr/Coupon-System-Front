import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CouponModel from "../../../Models/CouponModel";
import "./CustomerCoupByMaxPrice.css";
import customerService from "../../../Services/CustomerService";
import { authStore } from "../../../Redux/AuthState";
import notificationService from "../../../Services/NotificationService";
import { NavLink } from "react-router-dom";
import MyCouponCard from "../MyCoupons/MyCouponCard/MyCouponCard";

function CustomerCoupByMaxPrice(): JSX.Element {
  const { register, handleSubmit, formState } = useForm<CouponModel>();
  const [coupons, setCoupons] = useState<CouponModel[]>([]);
  const [maxPrice, setmaxPrice] = useState<number>();
  const fetchCoupon = async () => {
    try {
      const filterCoupons = await customerService.getCustomerCouponsByMaxPrice(
        maxPrice,
        authStore.getState().credentials.sub
      );
      setCoupons(filterCoupons);
    } catch (error) {
      notificationService.error(error);
    }
  };

  useEffect(() => {
    if (maxPrice !== undefined) {
      fetchCoupon();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxPrice]);

  const onSubmit = (data: CouponModel) => {
    setmaxPrice(data.price);
  };
  return (
    <div className="CustomerCoupByMaxPrice Box">
      {!coupons.length && (
        <div className="CustomerCoupByMaxPriceForm">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Filter:</h2>

            <label>Enter Maximum price:</label>
            <input
              type="number"
              {...register("price", {
                required: { value: true, message: "Missing price" },
              })}
            />
            <span>{formState.errors?.price?.message}</span>

            <button type="submit">Get company</button>
          </form>
          <p>notice that if there are no coupons under max price wanted,</p>
          <p> this page will continue to display</p>
          <NavLink to={"/company/api/manage-coupons"}>
            Return to coupons manager
          </NavLink>
        </div>
      )}
      {coupons && (
        <div>
          {coupons.map((c) => (
            <MyCouponCard key={c.id} coupon={c} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomerCoupByMaxPrice;
