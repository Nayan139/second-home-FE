import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignupSchema, UpdateUserSchema } from "../../Schema/Signup";
import { patchUpdateUser, postCreateUser } from "../../Services/User";
import "./signupModel.scss";

const SignupModel = ({
  open,
  onClose,
  name = "Sign up",
  selectedUser = null,
  fetchAllUser = () => {},
}) => {
  const {
    getValues,
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(selectedUser ? UpdateUserSchema : SignupSchema),
  });

  const onSubmit = async () => {
    try {
      const payload = {
        ...getValues(),
        role: "user",
      };
      const data = await postCreateUser(payload);
      if (data) {
        reset();
        onClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onUpdate = async () => {
    try {
      const payload = {
        ...getValues(),
      };
      const data = await patchUpdateUser(payload, selectedUser?._id);
      if (data) {
        await fetchAllUser();
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

  useEffect(() => {
    if (selectedUser) {
      setValue("firstName", selectedUser.firstName);
      setValue("lastName", selectedUser.lastName);
      setValue("email", selectedUser.email);
      setValue("mobileNumber", selectedUser.mobileNumber);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUser]);

  console.log(errors, "---------------------");
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{name}</DialogTitle>
        <DialogContent className="signup-model">
          <div className="signup-content">
            <TextField
              {...register("firstName")}
              error={!!errors.firstName}
              helperText={errors?.firstName?.message}
              id="firstName"
              label="First Name"
              variant="outlined"
            />
            <TextField
              {...register("lastName")}
              error={!!errors.lastName}
              helperText={errors?.lastName?.message}
              id="lastName"
              label="Last Name"
              variant="outlined"
            />
            <TextField
              {...register("email")}
              error={!!errors.email}
              helperText={errors?.email?.message}
              id="email"
              label="Email"
              variant="outlined"
            />
            <TextField
              {...register("mobileNumber")}
              error={!!errors.mobileNumber}
              helperText={errors?.mobileNumber?.message}
              id="mobileNumber"
              label="Mobile Number"
              variant="outlined"
            />
            {name === "Sign up" && (
              <>
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
              </>
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {selectedUser ? (
            <Button onClick={handleSubmit(onUpdate)} autoFocus>
              Update
            </Button>
          ) : (
            <Button onClick={handleSubmit(onSubmit)} autoFocus>
              Save
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SignupModel;
