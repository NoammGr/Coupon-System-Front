import { useForm } from "react-hook-form";
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Services/AuthService";
import notificationService from "../../../Services/NotificationService";
import "./Login.css";

function Login(): JSX.Element {
  const { register, handleSubmit } = useForm<CredentialsModel>();

  async function send(credentials: CredentialsModel) {
    try {
      await authService.login(credentials);
      notificationService.success("Welcome Back !");
    } catch (error: any) {
      notificationService.error("Check credentials and try again !");
      console.log(error.response.data);
    }
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit(send)}>
        <h2>Login</h2>

        <label>Username:</label>
        <input type="text" {...register("email")} />

        <label>Password:</label>
        <input type="password" {...register("password")} />

        <label>Client Type:</label>
        <select {...register("clientType")}>
          <option value="ADMIN">ADMIN</option>
          <option value="COMPANY">COMPANY</option>
          <option value="CUSTOMER">CUSTOMER</option>
        </select>
        <button>Login</button>
      </form>
    </div>
  );
}

export default Login;
