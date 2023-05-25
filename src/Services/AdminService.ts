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
    const response = await axios.post<ComapnyModel>(
      appConfig.adminAddCompanyUrl,
      company
    );
    const addedCompany = response.data;
    adminStore.dispatch(addCompanyAction(addedCompany));
  }

  public async updateCompany(company: ComapnyModel): Promise<void> {
    const response = await axios.put<ComapnyModel>(
      appConfig.adminUpdateCompanyUrl,
      company
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
    const response = await axios.get<ComapnyModel>(
      appConfig.adminGetOneCompanyUrl + "?companyId=" + companyId
    );
    const updatedCompany = response.data;
    return updatedCompany;
  }

  async addCustomer(customer: CustomerModel): Promise<void> {
    const response = await axios.post<ComapnyModel>(
      appConfig.adminAddCustomerUrl,
      customer
    );
    const addedCustomer = response.data;
    adminStore.dispatch(addCustomerAction(addedCustomer));
  }

  public async updateCustomer(customer: CustomerModel): Promise<void> {
    const response = await axios.put<ComapnyModel>(
      appConfig.adminUpdateCompanyUrl + customer.id,
      customer
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
