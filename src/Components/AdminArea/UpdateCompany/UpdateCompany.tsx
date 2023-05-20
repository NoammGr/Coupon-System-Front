import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CompanyModel from "../../../Models/CompanyModel";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import "./UpdateCompany.css";
import { useCallback, useEffect, useState } from "react";

function UpdateCompany(): JSX.Element {
  const { register, handleSubmit, formState } = useForm<CompanyModel>();
  const [oldCompany, setOldCompany] = useState<CompanyModel>();

  const navigate = useNavigate();

  const fetchCompany = useCallback(async (companyToUpdate: CompanyModel) => {
    try {
      const newUser = await adminService.getOneCompany(companyToUpdate.id);
      setOldCompany(newUser);
    } catch (error: any) {
      notificationService.error(error);
    }
  }, []);

  useEffect(() => {}, [fetchCompany]);

  async function send(company: CompanyModel) {
    company.id = oldCompany.id;
    company.name = oldCompany.name;
    company.coupons = oldCompany.coupons;
    company.clientType = oldCompany.clientType;
    try {
      await adminService.updateCompany(company);
      notificationService.success("Company edited!");
      navigate("/admin/api/get-all-companies");
    } catch (error: any) {
      notificationService.error(error);
      console.dir(error);
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
