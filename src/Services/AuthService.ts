import { authStore, loginAction, logoutAction } from "./../Redux/AuthState";
import axios from "axios";
import CredentialsModel from "../Models/CredentialsModel";
import appConfig from "../Utils/Config";

class AuthService {
  public async login(credentials: CredentialsModel): Promise<void> {
    const response = await axios.post<string>(appConfig.loginUrl, credentials);
    const token = response.data;
    authStore.dispatch(loginAction(token));
  }
  public logout(): void {
    authStore.dispatch(logoutAction());
  }
}

const authService = new AuthService();

export default authService;
