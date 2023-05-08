import ClientTypeModel from "./ClientTypeModel";

class CredentialsModel {
  sub?: number;
  email: string;
  password: string;
  clientType: ClientTypeModel;
}

export default CredentialsModel;
