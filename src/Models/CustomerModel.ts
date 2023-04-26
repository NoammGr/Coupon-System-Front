import ClientTypeModel from "./ClientTypeModel";
import CouponModel from "./CouponModel";

class CustomerModel {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  coupons?: CouponModel[];
  clientType: ClientTypeModel = ClientTypeModel.CUSTOMER;
}
export default CustomerModel;
