import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CategoryModel from "../../../Models/CategoryModel";
import CouponModel from "../../../Models/CouponModel";
import "./CustomerCoupByCategory.css";
import customerService from "../../../Services/CustomerService";
import { authStore } from "../../../Redux/AuthState";
import notificationService from "../../../Services/NotificationService";
import { NavLink } from "react-router-dom";
import MyCouponCard from "../MyCoupons/MyCouponCard/MyCouponCard";

function CustomerCoupByCategory(): JSX.Element {
  const { register, handleSubmit, formState } = useForm<CouponModel>();
  const [coupons, setCoupons] = useState<CouponModel[]>([]);
  const [category, setCategory] = useState<CategoryModel>();

  const fetchCoupon = async () => {
    try {
      const filterCoupons = await customerService.getCustomerCouponsByCategory(
        category,
        authStore.getState().credentials.sub
      );
      setCoupons(filterCoupons);
    } catch (error) {
      notificationService.error(error);
    }
  };

  useEffect(() => {
    if (category !== undefined) {
      fetchCoupon();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const onSubmit = (data: CouponModel) => {
    setCategory(data.category);
  };

  return (
    <div className="CustomerCoupByCategory">
      {!coupons.length && (
        <div className="CustomerCoupByCategoryForm Box">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Filter:</h2>

            <label>Choose category:</label>
            <select {...register("category")}>
              <option value="FOOD">Food</option>
              <option value="ELECTRICITY">Electricity</option>
              <option value="RESTAURANT">Restaurant</option>
              <option value="VACATION">Vacation</option>
              <option value="MOVIES">Movies</option>
              <option value="SHOPPING">Shopping</option>
            </select>
            <span>{formState.errors?.category?.message}</span>

            <button type="submit">Get company</button>
          </form>
          <p>notice that if there are no coupons under category wanted,</p>
          <p> this page will continue to display</p>
          <NavLink to={"/customer/api/my-coupons"}>
            Return to my coupons
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

export default CustomerCoupByCategory;
