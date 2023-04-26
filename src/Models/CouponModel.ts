import CategoryModel from "./CategoryModel";
import CustomerModel from "./CustomerModel";

class CouponModel {
  id?: number;
  company?: CouponModel;
  category?: CategoryModel;
  title?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  amount?: number;
  price?: number;
  image?: File | FileList;
  customers?: CustomerModel[];
}
export default CouponModel;
