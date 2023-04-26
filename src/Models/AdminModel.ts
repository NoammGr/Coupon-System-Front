import ClientTypeModel from "./ClientTypeModel";

class AdminModel {
  email?: string;
  password?: string;
  clientType: ClientTypeModel = ClientTypeModel.ADMIN;
}
export default AdminModel;
