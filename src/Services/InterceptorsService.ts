import { authStore } from "./../Redux/AuthState";
import axios from "axios";

class InterceptorsService {
  createInterceptors(): void {
    axios.interceptors.request.use((request) => {
      if (authStore.getState().token) {
        request.headers.Authorization = "Bearer " + authStore.getState().token;
      }
      return request;
    });
  }
}

const interceptorsService = new InterceptorsService();

export default interceptorsService;
