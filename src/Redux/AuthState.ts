import jwtDecode from "jwt-decode";
import { createStore } from "redux";
import CredentialsModel from "../Models/CredentialsModel";

export class AuthState {
  token: string = null;
  credentials: CredentialsModel = null;

  constructor() {
    this.token = localStorage.getItem("token");
    if (this.token) {
      const decodedToken: { credentials: CredentialsModel } = jwtDecode(
        this.token
      );
      console.log(this.credentials);
      this.credentials = decodedToken.credentials;
      console.log(this.credentials);
      console.log("credentials object: ", this.credentials);
    }
  }
}

export enum AuthActionType {
  Login,
  Logout,
}

export interface AuthAction {
  type: AuthActionType;
  payload?: any;
}

export function loginAction(token: string): AuthAction {
  return { type: AuthActionType.Login, payload: token };
}
export function logoutAction(): AuthAction {
  return { type: AuthActionType.Logout };
}

export function authReducer(
  currentState: AuthState = new AuthState(),
  action: AuthAction
): AuthState {
  const newState = { ...currentState };
  switch (action.type) {
    case AuthActionType.Login:
      console.log("Login action received with payload: ", action.payload);
      newState.token = action.payload;
      const decodedToken: CredentialsModel = jwtDecode(newState.token);
      newState.credentials = decodedToken;
      console.log("Decoded token: ", decodedToken);
      localStorage.setItem("token", newState.token);
      break;
    case AuthActionType.Logout:
      newState.token = null;
      newState.credentials = null;
      localStorage.removeItem("token");
      break;
  }
  return newState;
}

export const authStore = createStore(authReducer);
