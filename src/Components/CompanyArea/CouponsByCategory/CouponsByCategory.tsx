import "./CouponsByCategory.css";
import { useEffect, useState } from "react";
import CouponModel from "../../../Models/CouponModel";
import companyService from "../../../Services/CompanyService";
import { authStore } from "../../../Redux/AuthState";
import notificationService from "../../../Services/NotificationService";
import { useForm } from "react-hook-form";
import CouponCard from "../ManageCoupons/CouponCard/CouponCard";
import CategoryModel from "../../../Models/CategoryModel";
import { NavLink } from "react-router-dom";

function CouponsByCategory(): JSX.Element {
  const { register, handleSubmit, formState } = useForm<CouponModel>();
  const [coupons, setCoupons] = useState<CouponModel[]>([]);
  const [category, setCategory] = useState<CategoryModel>();

  const fetchCoupon = async () => {
    try {
      const filterCoupons = await companyService.getCompanyCouponsByCategory(
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
    <div className="CouponsByCategory">
      {!coupons.length && (
        <div className="CouponsByCategoryForm Box">
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

export default CouponsByCategory;
