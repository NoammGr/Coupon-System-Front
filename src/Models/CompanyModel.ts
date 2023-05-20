import ClientTypeModel from "./ClientTypeModel";
import CouponModel from "./CouponModel";

class ComapnyModel {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  coupons?: CouponModel[];
  clientType: ClientTypeModel;
}
export default ComapnyModel;
