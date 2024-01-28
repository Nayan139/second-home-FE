import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  TextField,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { propertySchema } from "../../Schema/PropertySchema";
import ImagePreviewAndBase64 from "../ImagePreview";
import "./propertyModel.scss";
import { patchProperty, postCreateProperty } from "../../Services/Property";

const PropertyModel = ({
  open,
  onClose,
  name,
  selectedProperty,
  fetchAllProperty,
  type,
}) => {
  const [isImage, setisImage] = useState("");
  const {
    handleSubmit,
    control,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(propertySchema),
  });

  const handleSubmitProperty = async () => {
    try {
      const payload = { ...getValues() };

      const response = await postCreateProperty(payload);
      if (response?.status) {
        fetchAllProperty();
        onClose();
        reset();
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  const handleUpdateProperty = async () => {
    try {
      const payload = { ...getValues() };

      const response = await patchProperty(payload, selectedProperty._id);
      if (response?.status) {
        fetchAllProperty();
        onClose();
        reset();
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  const amenities = [
    "AC",
    "Wardrobe",
    "Geyser",
    "WashingMachine",
    "Fan",
    "TV",
    "StudyTable",
    "PowerBackup",
  ];

  useEffect(() => {
    if (selectedProperty) {
      setValue("propertyName", selectedProperty.propertyName);
      setValue("propertyType", selectedProperty.propertyType);
      setValue("address.addressLine1", selectedProperty.address.addressLine1);
      setValue("address.area", selectedProperty.address.area);
      setValue("address.city", selectedProperty.address.city);
      setValue("address.state", selectedProperty.address.state);
      setValue("ammenities.AC", selectedProperty.ammenities.AC);
      setValue("ammenities.Wardrobe", selectedProperty.ammenities.Wardrobe);
      setValue("ammenities.Geyser", selectedProperty.ammenities.Geyser);
      setValue(
        "ammenities.WashingMachine",
        selectedProperty.ammenities.WashingMachine
      );
      setValue("ammenities.Fan", selectedProperty.ammenities.Fan);
      setValue("ammenities.TV", selectedProperty.ammenities.TV);
      setValue("ammenities.StudyTable", selectedProperty.ammenities.StudyTable);
      setValue(
        "ammenities.PowerBackup",
        selectedProperty.ammenities.PowerBackup
      );

      setValue(
        "propertyOwner.ownerName",
        selectedProperty.propertyOwner.ownerName
      );
      setValue(
        "propertyOwner.ownerContactNumber",
        selectedProperty.propertyOwner.ownerContactNumber
      );
      setValue("bedType", selectedProperty.bedType);
      setValue("rent", selectedProperty.rent);
      setValue("propertyImages", selectedProperty.propertyImages);
      setisImage(selectedProperty.propertyImages);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProperty]);

  return (
    <div>
      <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth={"xl"}>
        <DialogTitle>{name}</DialogTitle>
        <DialogContent>
          <form className="property-form">
            <div className="image-block">
              <div className="image-preview">
                <Controller
                  name="propertyImages"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <ImagePreviewAndBase64
                      {...field}
                      handleImage={(value) => {
                        field.onChange(value); // This will make sure the value gets updated in the form
                        setisImage(value);
                      }}
                      isImage={isImage}
                    />
                  )}
                />
              </div>
              <div className="image-error">
                {errors.propertyImages && (
                  <p className="error">{errors.propertyImages.message}</p>
                )}
              </div>
            </div>
            <div>
              <Controller
                name="propertyName"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="property-name"
                    placeholder="Property Name"
                    label="Property Name"
                    error={!!errors.propertyName}
                    helperText={errors.propertyName?.message}
                  />
                )}
              />
            </div>
            <div className="property-type">
              <FormControl>
                <FormLabel
                  id="demo-controlled-radio-buttons-group"
                  className="property-type-label"
                >
                  Property Type
                </FormLabel>
                <Controller
                  name="propertyType"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      {...field}
                    >
                      <FormControlLabel
                        value="girl"
                        control={<Radio />}
                        label="Girl"
                      />
                      <FormControlLabel
                        value="boy"
                        control={<Radio />}
                        label="Boy"
                      />
                    </RadioGroup>
                  )}
                />
                {errors.propertyType && (
                  <p className="error">{errors.propertyType.message}</p>
                )}
              </FormControl>
            </div>
            <div className="property-address-container">
              <div className="address-title">Property Address</div>
              <div className="property-address-main">
                <Controller
                  name="address.addressLine1"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="property-address"
                      placeholder="Address"
                      label="Address Line 1"
                      error={!!errors.address?.addressLine1}
                      helperText={errors.address?.addressLine1?.message}
                    />
                  )}
                />
                <Controller
                  name="address.area"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="property-address"
                      placeholder="Area"
                      label="Area / Locality"
                      error={!!errors.address?.area}
                      helperText={errors.address?.area?.message}
                    />
                  )}
                />
              </div>
              <div className="property-address-main">
                <Controller
                  name="address.city"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="property-address"
                      placeholder="City"
                      label="City"
                      error={!!errors.address?.city}
                      helperText={errors.address?.city?.message}
                    />
                  )}
                />
                <Controller
                  name="address.state"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      placeholder="State"
                      className="property-address"
                      label="State"
                      error={!!errors.address?.state}
                      helperText={errors.address?.state?.message}
                    />
                  )}
                />
              </div>
            </div>
            <div className="property-Amenities">
              <div>Ammenities</div>
              <FormGroup className="property-amenities-grid">
                {amenities.map((amenity, index) => (
                  <Controller
                    name={`ammenities.${amenity}`}
                    control={control}
                    key={index}
                    defaultValue={false}
                    render={({ field }) => (
                      <FormControlLabel
                        control={<Checkbox {...field} checked={field.value} />}
                        label={amenity}
                      />
                    )}
                  />
                ))}
              </FormGroup>
            </div>
            <div className="property-address-container">
              <div className="address-title">Property Owner</div>
              <div className="property-address-main">
                <Controller
                  name="propertyOwner.ownerName"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="property-address"
                      placeholder="Owner Name"
                      label="Owner Name"
                      error={!!errors?.propertyOwner?.ownerName}
                      helperText={errors?.propertyOwner?.ownerName?.message}
                    />
                  )}
                />
                <Controller
                  name="propertyOwner.ownerContactNumber"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="property-address"
                      placeholder="Owner Contact Number"
                      label="Owner Contact Number"
                      error={!!errors?.propertyOwner?.ownerContactNumber}
                      helperText={
                        errors?.propertyOwner?.ownerContactNumber?.message
                      }
                    />
                  )}
                />
              </div>
            </div>
            <div className="property-address-container">
              <div className="property-address-main">
                <Controller
                  name="bedType"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="property-address"
                      error={!!errors.bedType}
                      label="Bed Type"
                      placeholder="Bed Type"
                      helperText={errors.bedType?.message}
                    />
                  )}
                />
                <Controller
                  name="rent"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="property-address"
                      placeholder="Rent"
                      label="Rent"
                      error={!!errors.address?.state}
                      helperText={errors.rent?.message}
                    />
                  )}
                />
              </div>
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              reset();
              onClose();
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit(
              type === "add" ? handleSubmitProperty : handleUpdateProperty
            )}
            autoFocus
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PropertyModel;
