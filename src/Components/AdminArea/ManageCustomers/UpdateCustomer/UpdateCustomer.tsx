import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import CustomerModel from "../../../../Models/CustomerModel";
import adminService from "../../../../Services/AdminService";
import notificationService from "../../../../Services/NotificationService";
import "./UpdateCustomer.css";

function UpdateCustomer(): JSX.Element {
  const { register, handleSubmit, formState, setValue } =
    useForm<CustomerModel>();
  const navigate = useNavigate();
  const params = useParams();
  const customerId = +params.customerId;

  useEffect(() => {
    adminService
      .getOneCustomer(customerId)
      .then((fetchCustomer) => {
        setValue("id", fetchCustomer.id);
        setValue("firstName", fetchCustomer.firstName);
        setValue("lastName", fetchCustomer.lastName);
        setValue("email", fetchCustomer.email);
        setValue("password", fetchCustomer.password);
        setValue("clientType", fetchCustomer.clientType);
      })
      .catch((error: any) =>
        notificationService.error(error.response.data.message)
      );
  }, [customerId, setValue]);

  async function send(customer: CustomerModel) {
    try {
      await adminService.updateCustomer(customer);
      notificationService.success("Customer updated");
      navigate("/admin/api/manage-customers");
    } catch (error: any) {
      notificationService.error(error.response.data.message);
      console.dir(error);
    }
  }
  return (
    <div className="UpdateCustomer">
      <form onSubmit={handleSubmit(send)}>
        <h2>Update customer:</h2>

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

        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateCustomer;
