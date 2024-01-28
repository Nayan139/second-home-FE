import React, { useState, useEffect } from "react";
import { debounce } from "lodash";
import "./home.scss";
import Header from "../../Components/Header";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  capitalize,
} from "@mui/material";
import { postSearchProperty } from "../../Services/Property";
import useGlobalState from "../../Hooks/useGlobalState";
import LoginModel from "../../Components/LoginModel";
import DeleteDialog from "../../Components/DeleteModel";

const Home = () => {
  const [propertyList, setPropertyList] = useState([]);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [loginModel, setLoginModel] = useState(false);
  const [isLoginConfirm, setisLoginConfirm] = useState(false);

  const { activeUser } = useGlobalState();
  const getAllProperty = debounce(async () => {
    try {
      const response = await postSearchProperty({ search, filter: city });
      console.log(response);
      if (response.status === "true")
        setPropertyList(response.properties ?? []);
    } catch (error) {
      console.error(error);
    }
  }, 500);

  useEffect(() => {
    getAllProperty();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, city]);

  return (
    <div>
      <Header />
      <div className="home-container">
        <div className="search-action">
          <TextField
            placeholder="Search by property name"
            fullWidth
            variant="filled"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">City</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              label="Age"
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              <MenuItem value={"Surat"}>Surat</MenuItem>
              <MenuItem value={"Baroda"}>Baroda</MenuItem>
              <MenuItem value={"Rajkot"}>Rajkot</MenuItem>
              <MenuItem value={"Ahmedabad"}>Ahmedabad</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="listing-container">
          {propertyList.length ? (
            propertyList.map((property, index) => (
              <div className="property-card" key={index}>
                <div className="property-image">
                  <img
                    src={property.propertyImages}
                    alt="property"
                    height="200px"
                    width="300px"
                  />
                  <div className="contact-action">
                    {!activeUser?._id ? (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setLoginModel(!loginModel)}
                      >
                        Contact us
                      </Button>
                    ) : null}
                  </div>
                </div>
                <div className="property-details">
                  <div className="property-title">
                    <h2 className="property-name">
                      {capitalize(property.propertyName)}
                    </h2>
                    <span className="property-id">
                      <h4>Property Id: &nbsp; </h4>
                      <p>{property._id}</p>
                    </span>
                  </div>
                  <div className="property-title">
                    <span className="property-id">
                      <h4>Rent: &nbsp; </h4>
                      <p>{property.rent}/month</p>
                    </span>
                    <span className="property-id">
                      <h4>Type: &nbsp; </h4>
                      <p>{capitalize(property.propertyType)}</p>
                    </span>
                    <span className="property-id">
                      <h4>Bed Type: &nbsp; </h4>
                      <p>{capitalize(property.bedType)}</p>
                    </span>
                  </div>
                  <div className="property-amenites">
                    <h4>Amenities: &nbsp; </h4>
                    {Object.entries(property.ammenities).map(([key, value]) =>
                      value ? (
                        <div className="amenity">
                          {key
                            .replace(/_/g, " ")
                            .replace(/^\w/, (c) => c.toUpperCase())}
                        </div>
                      ) : null
                    )}
                  </div>
                  <div className="property-title">
                    <span className="property-id">
                      <h4>Address: &nbsp; </h4>
                      <p>{`${capitalize(
                        property?.address?.addressLine1
                      )}, ${capitalize(property?.address?.area)}, ${capitalize(
                        property?.address?.city
                      )},  ${capitalize(property?.address?.state)} `}</p>
                    </span>
                  </div>
                  {activeUser?._id && (
                    <div className="property-title owner">
                      <span className="property-id">
                        <h4>Property/Hostel Owner: &nbsp; </h4>
                        <p>{`${capitalize(
                          property?.propertyOwner?.ownerName
                        )} `}</p>
                      </span>
                      <span className="property-id">
                        <h4>Owner Mobile number: &nbsp; </h4>
                        <p>{`+91 ${property?.propertyOwner?.ownerContactNumber}`}</p>
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div>No property found</div>
          )}
        </div>
      </div>
      {loginModel && (
        <DeleteDialog
          open={loginModel}
          handleClose={() => setLoginModel(false)}
          handleDelete={() => setisLoginConfirm(true)}
          title="Confirm"
          message="Get in touch with us to get contact details of property owner"
        />
      )}
      {isLoginConfirm && (
        <LoginModel
          open={loginModel}
          onClose={() => setLoginModel(!loginModel)}
        />
      )}
    </div>
  );
};

export default Home;
