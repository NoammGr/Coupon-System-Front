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
  public async addCompany(company: ComapnyModel): Promise<void> {
    await axios.post<ComapnyModel>(appConfig.adminAddCompanyUrl, company);
    adminStore.dispatch(addCompanyAction(company));
  }

  public async updateCompany(company: ComapnyModel): Promise<void> {
    await axios.put<ComapnyModel>(appConfig.adminUpdateCompanyUrl, company);
    adminStore.dispatch(updateCompanyAction(company));
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
    const response = await axios.get<ComapnyModel>(
      appConfig.adminGetOneCompanyUrl + companyId
    );
    const updatedCompany = response.data;
    return updatedCompany;
  }

  public async getCompanyCount(): Promise<number> {
    const response = await axios.get<number>(appConfig.adminGetCompanyCountUrl);
    const companyId = response.data;
    return companyId;
  }

  async addCustomer(customer: CustomerModel): Promise<void> {
    await axios.post<ComapnyModel>(appConfig.adminAddCustomerUrl, customer);
    adminStore.dispatch(addCustomerAction(customer));
  }

  public async updateCustomer(customer: CustomerModel): Promise<void> {
    await axios.put<ComapnyModel>(appConfig.adminUpdateCustomerUrl, customer);
    adminStore.dispatch(updateCustomerAction(customer));
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

  public async getCustomerCount():Promise<number>{
    const response = await axios.get<number>(appConfig.adminGetCustomerCountUrl)
    const customerId = response.data;
    return customerId;
  }
}

const adminService = new AdminService();
export default adminService;
