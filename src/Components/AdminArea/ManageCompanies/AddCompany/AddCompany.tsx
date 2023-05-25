import "./AddCompany.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ComapnyModel from "../../../../Models/CompanyModel";
import notificationService from "../../../../Services/NotificationService";
import "./AddCompany.css";
import adminService from "../../../../Services/AdminService";
import ClientTypeModel from "../../../../Models/ClientTypeModel";

function AddCompany(): JSX.Element {
  const { register, handleSubmit, formState } = useForm<ComapnyModel>();
  const navigate = useNavigate();

  async function send(company: ComapnyModel) {
    company.id = 0;
    company.coupons = [];
    company.clientType = ClientTypeModel.COMPANY;
    try {
      await adminService.addCompany(company);
      notificationService.success("Company added !");
      navigate("/admin/api/manage-companies");
    } catch (error: any) {
      notificationService.error(error.response.data.message);
      console.dir(error.response.data.message);
    }
  }

  return (
    <div className="AddCompany Box">
      <form onSubmit={handleSubmit(send)}>
        <h2>Add company:</h2>

        <label>Name:</label>
        <input
          type="text"
          {...register("name", {
            required: { value: true, message: "Missing name" },
            minLength: {
              value: 2,
              message: "Name needs to be more than 2 characters",
            },
          })}
        />
        <span>{formState.errors?.name?.message}</span>

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

export default AddCompany;