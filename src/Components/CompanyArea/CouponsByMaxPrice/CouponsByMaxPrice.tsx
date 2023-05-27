import { useEffect, useState } from "react";
import "./CouponsByMaxPrice.css";
import CouponModel from "../../../Models/CouponModel";
import companyService from "../../../Services/CompanyService";
import { authStore } from "../../../Redux/AuthState";
import notificationService from "../../../Services/NotificationService";
import { useForm } from "react-hook-form";
import CouponCard from "../ManageCoupons/CouponCard/CouponCard";
import { NavLink } from "react-router-dom";

function CouponsByMaxPrice(): JSX.Element {
  const { register, handleSubmit, formState } = useForm<CouponModel>();
  const [coupons, setCoupons] = useState<CouponModel[]>([]);
  const [maxPrice, setmaxPrice] = useState<number>();

  const fetchCoupon = async () => {
    try {
      const filterCoupons = await companyService.getCompanyCouponsByMaxPrice(
        maxPrice,
        authStore.getState().credentials.sub
      );
      setCoupons(filterCoupons);
    } catch (error: any) {
      notificationService.error(error.response.data.message);
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
    <div className="CouponsByMaxPrice Box">
      {!coupons.length && (
        <div className="CouponsByMaxPriceForm">
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
            <CouponCard key={c.id} coupon={c} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CouponsByMaxPrice;
