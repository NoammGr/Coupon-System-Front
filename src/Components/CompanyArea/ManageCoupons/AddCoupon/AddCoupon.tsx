import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CouponModel from "../../../../Models/CouponModel";
import notificationService from "../../../../Services/NotificationService";
import "./AddCoupon.css";
import companyService from "../../../../Services/CompanyService";
import { useState, useEffect } from "react";
import { authStore } from "../../../../Redux/AuthState";

function AddCoupon(): JSX.Element {
  const { register, handleSubmit, formState } = useForm<CouponModel>();
  const navigate = useNavigate();
  const [couponId, setCouponId] = useState<number>();

  useEffect(() => {
    companyService
      .getCouponCount()
      .then((coupId) => {
        setCouponId(coupId + 1);
      })
      .catch((error: any) => {
        notificationService.error(error.response.data.message);
      });
  });

  async function send(coupon: CouponModel) {
    coupon.id = couponId;
    coupon.company = authStore.getState().credentials.sub;
    coupon.image = (coupon.image as FileList)[0];
    coupon.customers = [];
    try {
      await companyService.addCoupon(coupon);
      notificationService.success("Coupon added !");
      navigate("/company/api/manage-coupons");
    } catch (error: any) {
      notificationService.error(error);
    }
  }

  return (
    <div className="AddCoupon Box">
      <form onSubmit={handleSubmit(send)}>
        <h2>Add coupon:</h2>

        <label>Category:</label>
        <select {...register("category")}>
          <option value="FOOD">Food</option>
          <option value="ELECTRICITY">Electricity</option>
          <option value="RESTAURANT">Restaurant</option>
          <option value="VACATION">Vacation</option>
          <option value="MOVIES">Movies</option>
          <option value="SHOPPING">Shopping</option>
        </select>
        <span>{formState.errors?.category?.message}</span>

        <label>Title:</label>
        <input
          type="text"
          {...register("title", {
            required: { value: true, message: "Missing title" },
          })}
        />
        <span>{formState.errors?.title?.message}</span>

        <label>Description:</label>
        <input
          type="text"
          {...register("description", {
            required: { value: true, message: "Missing description" },
          })}
        />
        <span>{formState.errors?.description?.message}</span>

        <label>Start date:</label>
        <input
          type="date"
          {...register("startDate", {
            required: { value: true, message: "Missing start date" },
          })}
        />
        <span>{formState.errors?.startDate?.message}</span>

        <label>End date:</label>
        <input
          type="date"
          {...register("endDate", {
            required: { value: true, message: "Missing ebd date" },
          })}
        />
        <span>{formState.errors?.endDate?.message}</span>

        <label>Amount:</label>
        <input
          type="number"
          {...register("amount", {
            required: { value: true, message: "Missing amount" },
            min: { value: 0, message: "amount cannot be negative" },
            max: { value: 1000, message: "Amount cannot be above 1,000" },
          })}
        />
        <span>{formState.errors?.price?.message}</span>
        <label>Price:</label>
        <input
          type="number"
          {...register("price", {
            required: { value: true, message: "Missing price" },
            min: { value: 0, message: "Price cannot be negative" },
            max: { value: 10000, message: "Price cannot be above 10,000" },
          })}
        />
        <span>{formState.errors?.price?.message}</span>

        <input type={"file"} {...register("image")} />

        <button>Add</button>
      </form>
    </div>
  );
}

export default AddCoupon;
