import React from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  ThemeProvider,
  InputLabel,
  FormGroup,
} from "@mui/material";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "./loginSlice";
import { loginInputs, signUpFormInputs } from "../../constants/formInputs";
import { login } from "../../assets/images/index.js";
import { loginFormTheme } from "../../theme/formTheme";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const LoginPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm();

  const handleLogin = async (formData) => {
    try {
      if (formData.password !== formData.confirmPassword) {
        toast.error("Password and Confirm Password do not match");
        return;
      }
      const response = await dispatch(loginUser(formData));
      if (response.payload.response?.data.error) {
        toast.error(response.payload.response.data.error);
        reset();
      } else {
        toast.success("Successfully logged in");
        setTimeout(() => {
          navigate("/chatApp");
        }, 3000);
        reset();
      }
    } catch (error) {
      handleRequestError(error);
    }
  };

  const handleSignUp = async (formData) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/signUp`,
        formData
      );
      toast.success(response.data.message);
      reset();
      navigate("/login");
    } catch (error) {
      handleRequestError(error);
    }
  };

  const handleRequestError = (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        toast.error(
          "Invalid credentials. Please check your email and password."
        );
      } else if (error.response.status === 403) {
        toast.error("You don't have permission to perform this action.");
      } else {
        toast.error(`${error.response.data.error}`);
      }
    } else if (error.request) {
      toast.error(
        "No response received from the server. Please try again later."
      );
    } else {
      toast.error(`${error.message}`);
    }
  };

  return (
    <div className="w-screen h-screen bg-[#2F3349] px-12  flex  justify-between  items-center ">
      <ToastContainer />
      <div className="hidden lg:w-[60%] h-[95%] p-24 lg:flex flex-col justify-center bg-[#25293C] items-center relative  rounded-3xl">
        <img src={login} alt="" className="h-[65%] absolute" />
        <img
          src="https://demos.pixinvent.com/vuexy-nextjs-admin-template/demo-4/images/pages/auth-v2-mask-dark.png"
          alt=""
          className="absolute  bottom-0  h-[25%] w-[100%]  "
        />
      </div>
      <ThemeProvider theme={loginFormTheme}>
        <div className="lg:w-[37%] w-full md:px-36 lg:px-4  h-[90%]  flex flex-col justify-center items-center relative  rounded-3xl font-sans">
          <Container maxWidth="xl">
            <Typography
              variant="h4"
              align="center"
              className="text-[#655BD3] flex justify-start gap-2 flex-col "
              gutterBottom
            >
              <h3 className=" text-xl  lg:text-2xl  flex ">
                Welcome to ChatApp👋🏻
              </h3>
              <p className="text-sm flex justify-start ">
                Please sign-in to your account and start the talk
              </p>
            </Typography>
            <Box
              component="form"
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(
                location.pathname === "/signup" ? handleSignUp : handleLogin
              )}
            >
              {(location.pathname === "/signup"
                ? signUpFormInputs
                : loginInputs
              ).map(({ label, type, name, placeholder }) => (
                <FormGroup key={name}>
                  <InputLabel
                    sx={{
                      fontSize: "12px",
                      fontWeight: "normal",
                      color: "white",
                      marginBottom: "-12px",
                    }}
                  >
                    {label}
                  </InputLabel>
                  <TextField
                    type={type}
                    {...register(name, { required: true })}
                    fullWidth
                    autoComplete="off"
                    color="secondary"
                    placeholder={placeholder}
                    InputProps={{
                      style: {
                        fontSize: "14px",
                        fontWeight: "normal",
                        height: "40px",
                        color: "white",
                        border: "1px solid #5B5F77",
                      },
                    }}
                    margin="normal"
                  />
                  {errors[name] && (
                    <p className="text-red-500 text-sm">{label} is required</p>
                  )}
                </FormGroup>
              ))}

              {location.pathname === "/signup" && (
                <FormGroup>
                  <InputLabel
                    sx={{
                      fontSize: "12px",
                      fontWeight: "normal",
                      color: "white",
                      marginBottom: "-12px",
                    }}
                  >
                    Confirm Password
                  </InputLabel>
                  <TextField
                    type="password"
                    {...register("confirmPassword", {
                      required: true,
                      validate: (value) =>
                        value === getValues("password") ||
                        "Passwords do not match",
                    })}
                    fullWidth
                    autoComplete="off"
                    color="secondary"
                    placeholder="Confirm Password"
                    InputProps={{
                      style: {
                        fontSize: "14px",
                        fontWeight: "normal",
                        height: "40px",
                        color: "white",
                        border: "1px solid #5B5F77",
                      },
                    }}
                    margin="normal"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </FormGroup>
              )}

              <Button
                type="submit"
                variant="contained"
                color="secondary"
                fullWidth
              >
                {location.pathname === "/signup" ? "Sign Up" : "Login"}
              </Button>
            </Box>
            <div className="text-sm text-center mt-5 text-[#F9F9F9] text-opacity-30 ">
              {location.pathname === "/signup"
                ? "Already have an account?"
                : "New on our platform?"}
              <span className="text-xs ml-1 text-[#655BD3] opacity-100">
                <NavLink
                  to={location.pathname === "/signup" ? "/login" : "/signup"}
                  onClick={() =>
                    navigate(
                      location.pathname === "/signup" ? "/login" : "/signup"
                    )
                  }
                >
                  {location.pathname === "/signup"
                    ? "Sign In"
                    : "Create an account"}
                </NavLink>
              </span>
            </div>
          </Container>
        </div>
      </ThemeProvider>
    </div>
  );
};
