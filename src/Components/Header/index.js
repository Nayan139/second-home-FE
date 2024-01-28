import React, { useState } from "react";
import SignupModel from "../SignupModel";
import LoginModel from "../LoginModel";
import useGlobalState from "../../Hooks/useGlobalState";
import { removeLocalStorage } from "../../Utils/localStorge";
import "./header.scss";

const Header = () => {
  //State
  const [signupModel, setSignupModel] = useState(false);
  const [loginModel, setLoginModel] = useState(false);

  //Hooks
  const { isToken, activeUser, setIsToken } = useGlobalState();
  console.log("isToken,activeUser :>> ", isToken, activeUser);
  return (
    <>
      <div className="header">
        <div className="header-logo">
          <h3>Second Home</h3>
        </div>
        <div className="header-auth">
          {isToken && activeUser?._id ? (
            <>
              <h3>{`${activeUser?.firstName} ${activeUser?.lastName}`}</h3>
              <h3
                onClick={() => {
                  removeLocalStorage("secondHomeToken");
                  setIsToken(null);
                  window.location.reload();
                }}
              >
                Logout
              </h3>
            </>
          ) : (
            <>
              <h2 onClick={() => setLoginModel(!loginModel)}>Login</h2>
              <h2 onClick={() => setSignupModel(!signupModel)}>Sign up</h2>
            </>
          )}
        </div>
      </div>
      <SignupModel
        open={signupModel}
        onClose={() => setSignupModel(!signupModel)}
      />
      <LoginModel
        open={loginModel}
        onClose={() => setLoginModel(!loginModel)}
      />
    </>
  );
};

export default Header;
