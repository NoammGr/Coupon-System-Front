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
    } catch (error) {
      notificationService.error(error);
    }
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit(send)}>
        <h2>Login</h2>

        <label>Username : </label>
        <input type="text" {...register("email")} />

        <label>Password : </label>
        <input type="password" {...register("password")} />
        <label>Client Type : </label>
        <input type="text" {...register("clientType")} />
        <button>Login</button>
      </form>
    </div>
  );
}

export default Login;
