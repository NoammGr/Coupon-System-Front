import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import CompanyModel from "../../../../Models/CompanyModel";
import adminService from "../../../../Services/AdminService";
import notificationService from "../../../../Services/NotificationService";
import "./UpdateCompany.css";
import { useCallback, useEffect, useState } from "react";
import ComapnyModel from "../../../../Models/CompanyModel";

function UpdateCompany(): JSX.Element {
  const { register, handleSubmit, formState, setValue } =
    useForm<CompanyModel>();
  const [oldCompany, setOldCompany] = useState<ComapnyModel>();
  const navigate = useNavigate();
  const params = useParams();
  const companyId = +params.companyId;

  const fetchCompany = useCallback(async (companyToUpdate: CompanyModel) => {
    try {
      const newUser = await adminService.getOneCompany(companyToUpdate.id);
      setOldCompany(newUser);
    } catch (error: any) {
      notificationService.error(error.response.data.message);
    }
  }, []);

  useEffect(() => {}, [fetchCompany]);

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
    company.id = oldCompany.id;
    company.name = oldCompany.name;
    company.coupons = oldCompany.coupons;
    company.clientType = oldCompany.clientType;
    try {
      await adminService.updateCompany(company);
      notificationService.success("Company edited!");
      navigate("/admin/api/manage-companies");
    } catch (error: any) {
      notificationService.error(error.response.data.message);
      console.dir(error.response.data.message);
    }
  }

  if (!oldCompany) {
    return (
      <div className="UpdateCompany">
        <form onSubmit={handleSubmit(fetchCompany)}>
          <h2>Get company to update:</h2>

          <label>Enter company id:</label>
          <input
            type="number"
            {...register("id", {
              required: { value: true, message: "Missing id" },
            })}
          />
          <span>{formState.errors?.id?.message}</span>

          <button type="submit">Get company</button>
        </form>
      </div>
    );
  }
  return (
    <div className="UpdateCompany">
      <form onSubmit={handleSubmit(send)}>
        <h2>Update company:</h2>
        <input
          type="number"
          {...register("id")}
          defaultValue={oldCompany.id}
          disabled
        />
        <span>{formState.errors?.name?.message}</span>

        <label>Company name:</label>
        <input
          type="text"
          {...register("name")}
          defaultValue={oldCompany.name}
          disabled
        />
        <span>{formState.errors?.name?.message}</span>

        <label>Email:</label>
        <input
          type="text"
          {...register("email", {
            required: { value: true, message: "Missing email" },
          })}
          defaultValue={oldCompany.email}
        />
        <span>{formState.errors?.email?.message}</span>

        <label>Password:</label>
        <input
          type="password"
          {...register("password", {
            required: { value: true, message: "Missing password" },
          })}
          defaultValue={oldCompany.password}
        />
        <span>{formState.errors?.password?.message}</span>

        <button type="submit">Update company</button>
      </form>
    </div>
  );
}

export default UpdateCompany;
