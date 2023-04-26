import { createStore } from "redux";
import ComapnyModel from "../Models/CompanyModel";
import CustomerModel from "../Models/CustomerModel";

export class AdminState {
  public company: ComapnyModel[] = [];
  public customer: CustomerModel[] = [];
}

export enum AdminActionType {
  AddCompany,
  UpdateCompany,
  DeleteCompany,
  GetAllCompanies,
  GetOneCompany,
  AddCustomer,
  UpdateCustomer,
  DeleteCustomer,
  GetAllCustomers,
  GetOneCustomer,
}

export interface AdminAction {
  type: AdminActionType;
  payload: any;
}

export function addCompany(company: ComapnyModel): AdminAction {
  return {
    type: AdminActionType.AddCompany,
    payload: company,
  };
}
export function updateCompany(company: ComapnyModel): AdminAction {
  return {
    type: AdminActionType.UpdateCompany,
    payload: company,
  };
}
export function deleteCompany(companyId: number): AdminAction {
  return {
    type: AdminActionType.DeleteCompany,
    payload: companyId,
  };
}
export function getAllCompanies(compenies: ComapnyModel[]): AdminAction {
  return {
    type: AdminActionType.GetAllCompanies,
    payload: compenies,
  };
}
export function getOneCompany(companyId: number): AdminAction {
  return {
    type: AdminActionType.GetOneCompany,
    payload: companyId,
  };
}
export function addCustomer(cutomer: CustomerModel): AdminAction {
  return {
    type: AdminActionType.AddCustomer,
    payload: cutomer,
  };
}
export function updateCustomer(customer: CustomerModel): AdminAction {
  return {
    type: AdminActionType.UpdateCustomer,
    payload: customer,
  };
}
export function deleteCustomer(customerId: number): AdminAction {
  return {
    type: AdminActionType.DeleteCustomer,
    payload: customerId,
  };
}
export function getAllCustomers(customers: CustomerModel[]): AdminAction {
  return {
    type: AdminActionType.GetAllCustomers,
    payload: customers,
  };
}
export function getOneCustomer(customerId: number): AdminAction {
  return {
    type: AdminActionType.GetOneCustomer,
    payload: customerId,
  };
}

export function productsReducer(
  currentState: AdminState = new AdminState(),
  action: AdminAction
): AdminState {
  const newState = { ...currentState };
  switch (action.type) {
    case AdminActionType.AddCompany:
      newState.company.push(action.payload);
      break;
    case AdminActionType.UpdateCompany:
      const indexToUpdate = newState.company.findIndex(
        (p) => p.id === action.payload.id
      );
      if (indexToUpdate >= 0) newState.company[indexToUpdate] = action.payload;
      break;
    case AdminActionType.DeleteCompany:
      const indexToDelete = newState.company.findIndex(
        (p) => p.id === action.payload
      );
      if (indexToDelete >= 0) newState.company.splice(indexToDelete, 1);
      break;
    case AdminActionType.GetAllCompanies:
      newState.company = action.payload;
      break;
    case AdminActionType.GetOneCompany:
      newState.company.find((c) => c.id === action.payload);
      break;
    case AdminActionType.AddCustomer:
      newState.customer.push(action.payload);
      break;
    case AdminActionType.UpdateCustomer:
      const indexToUp = newState.customer.findIndex(
        (c) => c.id === action.payload.id
      );
      if (indexToUp >= 0) newState.customer[indexToUp] = action.payload;
      break;
    case AdminActionType.DeleteCustomer:
      const indexToDel = newState.customer.findIndex(
        (c) => c.id === action.payload
      );
      if (indexToDel >= 0) newState.customer.splice(indexToDel, 1);
      break;
    case AdminActionType.GetAllCustomers:
      newState.customer = action.payload;
      break;
    case AdminActionType.GetOneCustomer:
      newState.customer.find((c) => c.id === action.payload);
      break;
  }
  return newState;
}
export const adminStore = createStore(productsReducer);
