import axios from "axios";
import ComapnyModel from "../Models/CompanyModel";
import {
  addCompanyAction,
  addCustomerAction,
  adminStore,
  deleteCompanyAction,
  deleteCustomerAction,
  getAllCompaniesAction,
  getAllCustomersAction,
  updateCompanyAction,
  updateCustomerAction,
} from "../Redux/AdminState";
import appConfig from "../Utils/Config";
import CustomerModel from "../Models/CustomerModel";

class AdminService {
  async addCompany(company: ComapnyModel): Promise<void> {
    const formData = new FormData();
    formData.append("id", company.id.toString());
    formData.append("name", company.name);
    formData.append("email", company.email);
    formData.append("password", company.password.toString());
    formData.append("coupons", null);
    formData.append("clientType", company.clientType.toString());
    const response = await axios.post<ComapnyModel>(
      appConfig.adminAddCompanyUrl,
      formData
    );
    const addedCompany = response.data;
    adminStore.dispatch(addCompanyAction(addedCompany));
  }

  public async updateCompany(company: ComapnyModel): Promise<void> {
    const formData = new FormData();
    formData.append("id", company.id.toString());
    formData.append("name", company.name);
    formData.append("email", company.email);
    formData.append("password", company.password.toString());
    formData.append("coupons", null);
    formData.append("clientType", company.clientType.toString());
    const response = await axios.put<ComapnyModel>(
      appConfig.adminUpdateCompanyUrl + company.id,
      formData
    );
    const updatedCompany = response.data;
    adminStore.dispatch(updateCompanyAction(updatedCompany));
  }

  public async deleteCompany(companyId: number): Promise<void> {
    await axios.delete(appConfig.adminDeleteCompanyUrl + companyId);
    adminStore.dispatch(deleteCompanyAction(companyId));
  }

  public async getAllCompanies(): Promise<ComapnyModel[]> {
    if (adminStore.getState().company.length === 0) {
      const response = await axios.get<ComapnyModel[]>(
        appConfig.adminGetAllCompaniesUrl
      );
      const company = response.data;
      adminStore.dispatch(getAllCompaniesAction(company));
      return company;
    }
    return adminStore.getState().company;
  }

  public async getOneCompany(companyId: number): Promise<ComapnyModel> {
    return adminStore.getState().company.find((p) => p.id === companyId);
  }

  async addCustomer(customer: CustomerModel): Promise<void> {
    const formData = new FormData();
    formData.append("id", customer.id.toString());
    formData.append("firstName", customer.firstName);
    formData.append("lastName", customer.lastName);
    formData.append("email", customer.email);
    formData.append("password", customer.password.toString());
    formData.append("coupons", null);
    formData.append("clientType", customer.clientType.toString());
    const response = await axios.post<ComapnyModel>(
      appConfig.adminAddCustomerUrl,
      formData
    );
    const addedCustomer = response.data;
    adminStore.dispatch(addCustomerAction(addedCustomer));
  }

  public async updateCustomer(customer: CustomerModel): Promise<void> {
    const formData = new FormData();
    formData.append("id", customer.id.toString());
    formData.append("firstName", customer.firstName);
    formData.append("lastName", customer.lastName);
    formData.append("email", customer.email);
    formData.append("password", customer.password.toString());
    formData.append("coupons", null);
    formData.append("clientType", customer.clientType.toString());
    const response = await axios.put<ComapnyModel>(
      appConfig.adminUpdateCompanyUrl + customer.id,
      formData
    );
    const updatedCustomer = response.data;
    adminStore.dispatch(updateCustomerAction(updatedCustomer));
  }

  public async deleteCustomer(customerId: number): Promise<void> {
    await axios.delete(appConfig.adminDeleteCustomerUrl + customerId);
    adminStore.dispatch(deleteCustomerAction(customerId));
  }

  public async getAllCustomers(): Promise<CustomerModel[]> {
    if (adminStore.getState().customer.length === 0) {
      const response = await axios.get<ComapnyModel[]>(
        appConfig.adminGetAllCustomersUrl
      );
      const customer = response.data;
      adminStore.dispatch(getAllCustomersAction(customer));
      return customer;
    }
    return adminStore.getState().customer;
  }

  public async getOneCustomer(customerId: number): Promise<CustomerModel> {
    return adminStore.getState().customer.find((p) => p.id === customerId);
  }
}

const adminService = new AdminService();
export default adminService;
