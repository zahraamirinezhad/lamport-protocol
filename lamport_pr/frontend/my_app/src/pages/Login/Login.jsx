import { React, useState } from "react";
import classes from "./Login.module.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Snackbar, Alert } from "@mui/material";

const Login = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [passwordData, setPasswordData] = useState("");

  const [error, setError] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [dataComplete, setDataComplete] = useState(false);

  const manageLogin = async (e) => {
    e.preventDefault();
    if (passwordData !== "") {
      try {
        const apiResponse = await axios.post(
          `${process.env.REACT_APP_API_ADDRESS}auth/login/`,
          {
            userName: userName,
            password: passwordData,
          }
        );
        console.log(apiResponse);
        localStorage.setItem(
          "tokens",
          JSON.stringify(apiResponse.data.accessToken)
        );
        navigate("/mainPage");
        // navigate("/mainPage", { state: { isTeacher } });
        // err.data === "Wrong_Password_Username" ? setError(true) : setError(false);
      } catch (err) {
        console.log(err);
      }
    } else {
      setDataComplete(true);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.login}>
        <div className={classes.borderLine}></div>
        <div className={classes.form}>
          <div className={classes.enterData}>
            <input
              type="text"
              onChange={(value) => {
                setUserName(value.target.value);
              }}
              required
            />
            <span>Email</span>
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
          <button className={classes.option} onClick={(e) => manageLogin(e)}>
            <LoginIcon />
            Login
          </button>
          {error && <p className={classes.error}>Wrong_Password_Username</p>}
          <div className={classes.userOption}>
            Don't have an account?
            <Link
              to="/createAccount"
              className={`${classes.btn} ${classes.goToCreateAccount}`}
            >
              Create Account
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

export default Login;
