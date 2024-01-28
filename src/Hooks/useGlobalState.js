import { useContext } from "react";
import { GlobalContext } from "../Context/GlobalState";

const useGlobalState = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a main layout");
  }
  return context;
};

export default useGlobalState;
