import * as Yup from "yup";

export const propertySchema = Yup.object().shape({
  propertyName: Yup.string().required("Property name is required"),
  propertyType: Yup.string().required("Property type is required"),
  address: Yup.object().shape({
    addressLine1: Yup.string().required("Address line 1 is required"),
    area: Yup.string().required("Area is required"),
    city: Yup.string()
      .oneOf(
        ["Surat", "Baroda", "Ahmedabad", "Rajkot"],
        "City should be Surat, Baroda, Ahmedabad or Rajkot"
      )
      .required("City is required"),
    state: Yup.string().required("State is required"),
  }),
  ammenities: Yup.object().shape({
    AC: Yup.boolean(),
    Wardrobe: Yup.boolean(),
    Geyser: Yup.boolean(),
    WashingMachine: Yup.boolean(),
    Fan: Yup.boolean(),
    TV: Yup.boolean(),
    StudyTable: Yup.boolean(),
    PowerBackup: Yup.boolean(),
  }),
  propertyOwner: Yup.object().shape({
    ownerName: Yup.string().required("Owner name is required"),
    ownerContactNumber: Yup.string()
      .matches(/^[789]\d{9}$/, "Mobile number is not valid")
      .required("Mobile Number is required"),
  }),
  // availableFor: Yup.string().required("Availability is required"),
  bedType: Yup.string()
    .oneOf(
      ["Single Sharing", "Twin Sharing"],
      "Bed type should be Single Sharing or Twin Sharing"
    )
    .required("Bed type is required"),
  rent: Yup.number()
    .typeError("Rent must be a number")
    .required("Rent is required"),
  propertyImages: Yup.string().required("Property images are required"),
});
