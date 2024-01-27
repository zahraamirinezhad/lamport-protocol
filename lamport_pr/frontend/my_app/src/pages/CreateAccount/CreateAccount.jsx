import { React, useState } from "react";
import classes from "./CreateAccount.module.scss";
import SignUp from "../../images/SignUp.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Snackbar, Alert } from "@mui/material";
import PasswordChecklist from "react-password-checklist";
import { MD5, SHA1, SHA256, SHA512 } from "crypto-js";

const CreateAccount = () => {
  const navigate = useNavigate();

  const [userNameData, setUserNameData] = useState("");
  const [passwordData, setPasswordData] = useState("");

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [dataComplete, setDataComplete] = useState(false);

  const manageRegister = async (e) => {
    if (password_validate(passwordData) && userNameData !== "") {
      e.preventDefault();
      try {
        const session = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
        const password = hashPassword(passwordData, session);
        console.log(session);
        console.log(password);

        const apiResponse = await axios.post(
          `http://localhost:8800/api/auth/register/`,
          {
            username: userNameData,
            password: password,
            sessionNumber: session,
          }
        );
        console.log(apiResponse);

        // navigate("/mainPage");
      } catch (err) {
        console.log(err);
      }
    } else {
      setDataComplete(true);
    }
  };

  const hashPassword = (password, passNum) => {
    let hashed = password;
    for (let i = 0; i < passNum; i++) {
      hashed = SHA256(hashed).toString();
    }
    return hashed;
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
