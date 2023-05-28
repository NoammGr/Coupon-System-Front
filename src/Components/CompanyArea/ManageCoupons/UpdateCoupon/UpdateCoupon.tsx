import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import CouponModel from "../../../../Models/CouponModel";
import "./UpdateCoupon.css";
import { useEffect } from "react";
import companyService from "../../../../Services/CompanyService";
import notificationService from "../../../../Services/NotificationService";
import { authStore } from "../../../../Redux/AuthState";

function UpdateCoupon(): JSX.Element {
  const { register, handleSubmit, formState, setValue } =
    useForm<CouponModel>();
  const navigate = useNavigate();
  const params = useParams();
  const couponId = +params.couponId;

  useEffect(() => {
    companyService
      .getOneCoupon(couponId)
      .then((fetchCoupon) => {
        setValue("id", fetchCoupon.id);
        setValue("company", authStore.getState().credentials.sub);
        setValue("category", fetchCoupon.category);
        setValue("title", fetchCoupon.title);
        setValue("description", fetchCoupon.description);
        setValue("startDate", fetchCoupon.startDate);
        setValue("endDate", fetchCoupon.endDate);
        setValue("amount", fetchCoupon.amount);
        setValue("price", fetchCoupon.price);
        setValue("image", null);
        setValue("customers", []);
      })
      .catch((error: any) => {
        notificationService.error(error.response.data.message);
      });
  }, [couponId, setValue]);

  async function send(coupon: CouponModel) {
    coupon.image = (coupon.image as FileList)[0];
    coupon.customers = [];
    try {
      await companyService.updateCoupon(coupon);
      notificationService.success("Coupon edited!");
      navigate("/company/api/manage-coupons");
    } catch (error: any) {
      notificationService.error(error.response.data.message);
    }
  }

  return (
    <div className="UpdateCoupon Box">
      <form onSubmit={handleSubmit(send)}>
        <h2>Add coupon:</h2>

        <label>Couponn id:</label>
        <input type="number" {...register("id")} disabled />
        <span>{formState.errors?.id?.message}</span>

        <label>Company:</label>
        <input type="text" {...register("company")} disabled />
        <span>{formState.errors?.company?.message}</span>

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

        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateCoupon;
