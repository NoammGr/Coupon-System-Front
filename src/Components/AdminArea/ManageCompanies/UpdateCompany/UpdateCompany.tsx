import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import CompanyModel from "../../../../Models/CompanyModel";
import adminService from "../../../../Services/AdminService";
import notificationService from "../../../../Services/NotificationService";
import "./UpdateCompany.css";
import { useEffect } from "react";

function UpdateCompany(): JSX.Element {
  const { register, handleSubmit, formState, setValue } =
    useForm<CompanyModel>();
  const navigate = useNavigate();
  const params = useParams();
  const companyId = +params.companyId;

  useEffect(() => {
    adminService
      .getOneCompany(companyId)
      .then((fetchCompany) => {
        setValue("id", fetchCompany.id);
        setValue("name", fetchCompany.name);
        setValue("email", fetchCompany.email);
        setValue("password", fetchCompany.password);
        setValue("clientType", fetchCompany.clientType);
      })
      .catch((error: any) =>
        notificationService.error(error.response.data.message)
      );
  }, [companyId, setValue]);

  async function send(company: CompanyModel) {
    try {
      await adminService.updateCompany(company);
      notificationService.success("Company edited!");
      navigate("/admin/api/manage-companies");
    } catch (error: any) {
      notificationService.error(error.response.data.message);
      console.dir(error.response.data.message);
    }
  }

  return (
    <div className="UpdateCompany">
      <form onSubmit={handleSubmit(send)}>
        <h2>Update company:</h2>

        <label>Company id:</label>
        <input type="number" {...register("id")} disabled />
        <span>{formState.errors?.name?.message}</span>

        <label>Company name:</label>
        <input type="text" {...register("name")} disabled />
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

        <button type="submit">Update company</button>
      </form>
    </div>
  );
}

export default UpdateCompany;
