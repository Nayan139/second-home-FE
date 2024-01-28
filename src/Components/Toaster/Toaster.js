import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./toaster.scss";

export const toastMessage = (message, type) => {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    case "info":
      toast.info(message);
      break;
    case "warning":
      toast.warning(message);
      break;
    // Add more cases for other types if needed
    default:
      toast(message);
  }
};

export default function toaster() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={true}
      closeButton={false}
      bodyClassName={"toast-message"}
    />
  );
}
