import { Notyf } from "notyf";

class NotificationService {
  private notify = new Notyf({
    duration: 4000,
    position: { x: "right", y: "bottom" },
  });

  public success(message: string) {
    this.notify.success(message);
  }

  public error(err: any) {
    const message = this.extractErrorMessage(err);
    this.notify.error(message);
  }

  private extractErrorMessage(err: any) {
    if (typeof err == "string") return err;

    if (typeof err.response?.data === "string") return err.response?.data;

    if (Array.isArray(err.response?.data)) return err.response?.data[0];

    if (typeof err.message === "string") return err.message;

    return "Unknokn error, please try again";
  }
}

const notificationService = new NotificationService();

export default notificationService;
