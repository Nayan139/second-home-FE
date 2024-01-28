import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { postLogin } from "../../Services/User";
import { LoginSchema } from "../../Schema/Login";
import "./loginModel.scss";
import ForgotPassword from "../ForgotPassword";
import { setLocalStorage } from "../../Utils/localStorge";
import useGlobalState from "../../Hooks/useGlobalState";

const LoginModel = ({ open, onClose }) => {
  //State
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  //Hooks
  const { setIsToken } = useGlobalState();
  const {
    getValues,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit = async () => {
    try {
      const payload = {
        ...getValues(),
      };
      const data = await postLogin(payload);
      console.log("data", data);
      if (data?.token) {
        setLocalStorage("secondHomeToken", data?.token);
        setIsToken(data?.token);
        reset();
        onClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    onClose();
    reset();
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Log in</DialogTitle>
        <DialogContent className="login-model">
          <form>
            <div className="signup-content">
              <TextField
                {...register("email")}
                error={!!errors.email}
                helperText={errors?.email?.message}
                id="email"
                label="Email"
                variant="outlined"
              />
              <TextField
                {...register("password")}
                error={!!errors.password}
                helperText={errors?.password?.message}
                id="password"
                label="Password"
                variant="outlined"
                type="password"
              />
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setForgotPasswordOpen(!forgotPasswordOpen)}>
            Forgot password
          </Button>
          <Button onClick={handleSubmit(onSubmit)} autoFocus>
            Log in
          </Button>
        </DialogActions>
      </Dialog>
      {forgotPasswordOpen && (
        <ForgotPassword
          open={forgotPasswordOpen}
          onClose={() => setForgotPasswordOpen(!forgotPasswordOpen)}
        />
      )}
    </div>
  );
};

export default LoginModel;
