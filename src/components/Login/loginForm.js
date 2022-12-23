import React, { useState } from "react";
import PreLoader from "../preloader/preloader";
import "./CSS/login-styles.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AsyncCreatableSelect from "react-select/async-creatable";
import axios from "axios";
import { Link } from "react-router-dom";
import Select from "react-select";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const options = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
];
function LoginForm(props) {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const LoadOptions = (inputValue) => {
    return axios
      .get(
        `http://universities.hipolabs.com/search?name=${inputValue}&country=india`
      )
      .then((response) => {
        const options = [];
        response.data.forEach((d) => {
          options.push({
            label: d.name,
            value: d.name,
            college_name: d["name"] ? d["name"] : "",
            state: d["state-province"] ? d["state-province"] : "",
          });
        });
        return options;
      });
  };
  const [user, setUser] = useState({
    name: "",
    college: "",
    gender: "",
    state: "",
    dob: "",
    phone: "",
    YearOfPassing: "",
  });
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    setLoading(true);
    if (!props.email) {
      toast.error("Bad Request, Access Denied!");
    }
    e.preventDefault();
    if (
      user.name === "" ||
      user.college === "" ||
      user.gender === "" ||
      user.state === "" ||
      user.dob === "" ||
      user.phone === "" ||
      user.YearOfPassing === ""
    ) {
      toast.error("Please fill required fields");
      setLoading(false);
    } else {
      fetch("http://localhost:5000/profile/addUser", {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
          name: user.name,
          email: props.email,
          collegeName: user.college,
          gender: user.gender,
          collegeState: user.state,
          dob: user.dob,
          phone: user.phone,
          YearOfPassing: user.YearOfPassing,
          idCard: "",
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          navigate("/profile");
        });
      setLoading(false);
    }
  };
  if (loading) {
    return <PreLoader />;
  }
  const handleSelected = (selectedOption) => {
    setUser({
      ...user,
      college: selectedOption.college_name,
      state: selectedOption.state,
    });
  };
  const handleSelectedGender = (selectedOption) => {
    setUser({
      ...user,
      gender: selectedOption.label,
    });
  };
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Date of Birth
    </Tooltip>
  );
  return (
    <>
      <div className="form-container">
        <form className="custom-form" noValidate onSubmit={handleSubmit}>
          <h3>Register-2/2</h3>
          <input
            type="text"
            placeholder="Full name"
            id="name"
            name="name"
            value={user.name}
            onChange={(e) => onInputChange(e)}
            required
          />
          <AsyncCreatableSelect
            className="college-select"
            placeholder="College Name"
            loadOptions={LoadOptions}
            onChange={handleSelected}
            styles={colourStyles}
            components={{
              IndicatorSeparator: () => null,
            }}
          />
          <input
            type="text"
            placeholder="College State"
            id="state"
            value={user.state}
            name="state"
            onChange={(e) => onInputChange(e)}
            required
          />
          <input
            type="text"
            name="YearOfPassing"
            id="YearOfPassing"
            placeholder="Year Of Passing"
            value={user.YearOfPassing}
            onChange={(e) => onInputChange(e)}
          />
          <input
            type="text"
            name="phone"
            id="phone"
            placeholder="Phone"
            value={user.phone}
            onChange={(e) => onInputChange(e)}
          />
          <Select
            className="college-select"
            classNamePrefix="select"
            name="gender"
            options={options}
            styles={colourStyles}
            onChange={handleSelectedGender}
            placeholder="Gender"
            components={{
              IndicatorSeparator: () => null,
            }}
          />
          <OverlayTrigger
            placement="left"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
          >
            <input
              type="date"
              placeholder="Date of Birth"
              id="dob"
              name="dob"
              value={user.dob}
              onChange={(e) => onInputChange(e)}
              required
            />
          </OverlayTrigger>
          <button type="submit"> Finish </button>{" "}
          <small>
            <Link to={"/profile"}>Have you filled already? Click here!</Link>
          </small>
        </form>
      </div>
    </>
  );
}
const colourStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "transparent",
    border: "none !important",
    outline: "none !important",
    boxShadow: "none",
    width: "100%",
    margin: "-10px",
  }),
  menu: (styles) => ({
    ...styles,
    background: "rgba(0,0,0,0.7)",
    border: "1px solid rgba(0,0,0,0.1)",
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: !(isFocused || isSelected) ? "transparent" : "violet",
      color: isFocused || isSelected ? "black !important" : "#fff !important",
      fontWeight: "600 !important",
      cursor: isDisabled ? "not-allowed" : "default",
    };
  },
};
export default LoginForm;
