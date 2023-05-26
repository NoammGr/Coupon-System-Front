import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ClientTypeModel from "../../../../Models/ClientTypeModel";
import CustomerModel from "../../../../Models/CustomerModel";
import adminService from "../../../../Services/AdminService";
import notificationService from "../../../../Services/NotificationService";
import "./AddCustomer.css";
import { useEffect, useState } from "react";

function AddCustomer(): JSX.Element {
  const { register, handleSubmit, formState } = useForm<CustomerModel>();
  const navigate = useNavigate();
  const [customerId, setCustomerId] = useState<number>();

  useEffect(() => {
    adminService
      .getCustomerCount()
      .then((customId) => {
        setCustomerId(customId + 1);
      })
      .catch((error: any) => {
        notificationService.error(error.response.data.message);
      });
  });
  
  async function send(customer: CustomerModel) {
    customer.id = customerId;
    customer.coupons = [];
    customer.clientType = ClientTypeModel.CUSTOMER;
    try {
      await adminService.addCustomer(customer);
      notificationService.success("Customer added !");
      navigate("/admin/api/manage-customers");
    } catch (error: any) {
      notificationService.error(error.response.data.message);
      console.dir(error.response.data.message);
    }
  }
  return (
    <div className="AddCustomer Box">
      <form onSubmit={handleSubmit(send)}>
        <h2>Add customer:</h2>

        <label>First name:</label>
        <input
          type="text"
          {...register("firstName", {
            required: { value: true, message: "Missing name" },
            minLength: {
              value: 2,
              message: "Name needs to be more than 2 characters",
            },
          })}
        />
        <span>{formState.errors?.firstName?.message}</span>

        <label>Last name:</label>
        <input
          type="text"
          {...register("lastName", {
            required: { value: true, message: "Missing name" },
            minLength: {
              value: 2,
              message: "Name needs to be more than 2 characters",
            },
          })}
        />
        <span>{formState.errors?.lastName?.message}</span>

        <label>Email:</label>
        <input
          type="text"
          {...register("email", {
            required: { value: true, message: "Missing email" },
          })}
        />
        <span>{formState.errors?.email?.message}</span>

        <label>Password:</label>
        <input
          type="password"
          {...register("password", {
            required: { value: true, message: "Missing password" },
          })}
        />
        <span>{formState.errors?.password?.message}</span>

        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddCustomer;
