import { React, useState } from "react";
import classes from "./CreateAccount.module.scss";
import SignUp from "../../images/SignUp.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Snackbar, Alert } from "@mui/material";
import PasswordChecklist from "react-password-checklist";

const CreateAccount = () => {
  const navigate = useNavigate();

  const [userNameData, setUserNameData] = useState("");
  const [passwordData, setPasswordData] = useState("");
  const [repeatedPasswordData, setRepeatedPasswordData] = useState("");

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [dataComplete, setDataComplete] = useState(false);

  const manageRegister = async (e) => {
    if (
      password_validate(passwordData) &&
      repeatedPasswordData === passwordData &&
      userNameData !== ""
    ) {
      e.preventDefault();
      try {
        const apiResponse = await axios.post(
          `${process.env.REACT_APP_API_ADDRESS}auth/register/`,
          {
            username: userNameData,
            password: passwordData,
          }
        );
        console.log(apiResponse);
        localStorage.setItem(
          "tokens",
          JSON.stringify(apiResponse.data.accessToken)
        );

        navigate("/mainPage");
      } catch (err) {
        console.log(err);
      }
    } else {
      setDataComplete(true);
    }
  };

  const password_validate = (password) => {
    var re = {
      small: /(?=.*[a-z])/,
      length: /(?=.{8}$)/,
      specialChar: /[ -\/:-@\[-\`{-~]/,
      digit: /(?=.*[0-9])/,
    };
    return (
      re.small.test(password) &&
      re.length.test(password) &&
      re.specialChar.test(password) &&
      re.digit.test(password)
    );
  };

  return (
    <div className={classes.container}>
      <div className={classes.createAccount}>
        <div className={classes.borderLine}></div>
        <div className={classes.form}>
          <div className={classes.enterData}>
            <input
              type="text"
              onChange={(value) => {
                setUserNameData(value.target.value);
              }}
              required
            />
            <span>Username</span>
            <i></i>
          </div>
          <div className={classes.enterData}>
            <input
              type={passwordVisible ? "text" : "password"}
              onChange={(value) => {
                setPasswordData(value.target.value);
              }}
              required
            />
            <span>Password</span>
            <i></i>
            <button
              onClick={() => {
                setPasswordVisible(!passwordVisible);
              }}
            >
              {passwordVisible ? <Visibility /> : <VisibilityOff />}
            </button>
          </div>
          <div className={classes.enterData}>
            <input
              type={passwordVisible ? "text" : "password"}
              onChange={(value) => {
                setRepeatedPasswordData(value.target.value);
              }}
              required
            />
            <span>Repeat your password</span>
            <i></i>
            <button
              onClick={() => {
                setPasswordVisible(!passwordVisible);
              }}
            >
              {passwordVisible ? <Visibility /> : <VisibilityOff />}
            </button>
          </div>
          <div className={classes.passwordCondotions}>
            <PasswordChecklist
              rules={["minLength", "specialChar", "number"]}
              minLength={8}
              value={passwordData}
              onChange={(isValid) => {}}
              messages={{
                minLength: "The minimum length of the password must be eight.",
                specialChar: "The password must have special characters.",
                number: "The password must have a number.",
              }}
            />
          </div>
          <button className={classes.option} onClick={(e) => manageRegister(e)}>
            <img src={SignUp} alt="sign_up" />
            Sign Up
          </button>
          <div className={classes.goToLogin}>
            Already have an account?
            <Link to="/login" className={classes.btn}>
              Login
            </Link>
          </div>
        </div>
      </div>
      <Snackbar
        open={dataComplete}
        autoHideDuration={2000}
        onClose={() => {
          setDataComplete(false);
        }}
      >
        <Alert
          variant="filled"
          severity="error"
          onClose={() => {
            setDataComplete(false);
          }}
          sx={{ width: "100%" }}
        >
          Please Fill the Form Completely
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CreateAccount;
