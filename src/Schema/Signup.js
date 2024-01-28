import * as Yup from "yup";

export const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  mobileNumber: Yup.string()
    .matches(/^[789]\d{9}$/, "Mobile number is not valid")
    .required("Mobile Number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export const UpdateUserSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  mobileNumber: Yup.string()
    .matches(/^[789]\d{9}$/, "Mobile number is not valid")
    .required("Mobile Number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});
