import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { patchForgotPassword } from "../../Services/User";
import { ForgotPasswordSchema } from "../../Schema/ForgotPassword";
import "./forgotPassword.scss";

const ForgotPassword = ({ open, onClose }) => {
  const {
    getValues,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(ForgotPasswordSchema),
  });

  const onSubmit = async () => {
    try {
      const { email, password } = getValues();
      const payload = {
        email,
        password,
      };
      const response = await patchForgotPassword(payload);
      console.log(response);
      if (response?.status) {
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
        <DialogTitle>Forgot password</DialogTitle>
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
              <TextField
                {...register("confirmPassword")}
                error={!!errors.confirmPassword}
                helperText={errors?.confirmPassword?.message}
                id="confirmPassword"
                label="Confirm Password"
                variant="outlined"
                type="password"
              />
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit(onSubmit)} autoFocus>
            Forgot password
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ForgotPassword;
