import React, { createContext, useEffect, useState } from "react";
import { getActiveUser } from "../Services/User";
import { getLocalStorage } from "../Utils/localStorge";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null);

const GlobalStateProvider = ({ children }) => {
  //State
  const [activeUser, setActiveUser] = useState(null);
  const [isToken, setIsToken] = useState(
    () => getLocalStorage("secondHomeToken") || null
  );

  //Hooks
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActiveUser = async () => {
      try {
        const data = await getActiveUser();
        if (data) {
          setActiveUser(data);
          navigate(data?.role === "admin" ? "/admin/user" : "/listings");
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (isToken) fetchActiveUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isToken]);

  const globalStateValue = { activeUser, setActiveUser, isToken, setIsToken };

  console.log("isToken", isToken);
  return (
    <GlobalContext.Provider value={globalStateValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalStateProvider;
