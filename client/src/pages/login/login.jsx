import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Headerpage } from "../../components/header-page/header-page";
import { Main } from "../../layouts/main";
import { Button, Box, TextField, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Field, Form, Formik } from "formik";
import { object, string } from "yup";
import { useHttp } from "../../hooks/http.hook";
import { AlertInfo } from "../../ui/alert/alert";
import { classes } from "../../data";
import enter from "./img/icon-enter.svg";
import s from "./login.module.css";

const initialValues = {
  login: "",
  password: "",
};

// styles for MUI Button

const buttonStyled = {
  display: "block",
  margin: "0 auto",
  padding: "10px 102px",
  fontFamily: "Oswald",
  fontSize: "40px",
  backgroundColor: "#000",
  border: 0,
  borderRadius: 0,
  boxShadow: "none",
  transition: "0.2s l.inear",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#333",
    boxShadow: "none",
    transition: "0.2s l.inear",
  },
};

const useStyles = makeStyles(classes);

export const Login = ({ caption }) => {
  const { loading, request } = useHttp();
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("success");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const classes = useStyles();

  return (
    <>
      <Headerpage picture={enter} />
      <Main className={s.main}>
        <h2>{caption}</h2>
        <div className={s.materialForm}>
          <Formik
            initialValues={initialValues}
            validationSchema={object({
              login: string()
                .trim()
                .min(3, "Минимум 3 символа")
                .max(20, "Максимум 20 символов")
                .required("Пожалуйста, введите логин"),
              password: string()
                .trim()
                .required("Пожалуйста, введите пароль")
                .min(4, "Минимум 4 символов")
                .max(20, "Максимум 20 символов"),
            })}
            onSubmit={async (values, formikHelpers) => {
              try {
                const res = await request("api/auth/login", "POST", values);
                setAlert(true);
                setMessage(res.message);
                setType(res.type);
                setIsLoading(false);
                localStorage.setItem("token", res.token);
                localStorage.setItem("room", JSON.stringify(res.teacherId));
                localStorage.setItem("login", JSON.stringify(values.login));
                localStorage.setItem("userId", JSON.stringify(res.userId));
                localStorage.setItem("userName", JSON.stringify(res.userName));
                localStorage.setItem("role", JSON.stringify(res.role));
                console.log(res);
                formikHelpers.resetForm();
                res.role === "teacher"
                  ? setTimeout(() => navigate("/teacherroom"), 1000)
                  : setTimeout(() => window.location.replace("/student"), 1000);
              } catch (error) {
                setIsLoading(false);
                setAlert(true);
                setMessage(error.message);
                setType(error.type);
                console.log(error);
              }
              // console.log(values.login);
              formikHelpers.resetForm();
            }}
          >
            {({ errors, isValid, touched, dirty }) => (
              <Form>
                <Field
                  className={classes.tool}
                  size="small"
                  name="login"
                  type="login"
                  as={TextField}
                  variant="outlined"
                  color="success"
                  label="Логин"
                  fullWidth
                  error={Boolean(errors.login) && Boolean(touched.login)}
                  helperText={Boolean(touched.login) && errors.login}
                />
                <Box height={10} />
                <Field
                  className={classes.tool}
                  size="small"
                  name="password"
                  type="password"
                  as={TextField}
                  variant="outlined"
                  color="success"
                  label="Пароль"
                  fullWidth
                  error={Boolean(errors.password) && Boolean(touched.password)}
                  helperText={Boolean(touched.password) && errors.password}
                />
                <Box height={30} />
                <Box>
                  <Button
                    onClick={() => setIsLoading(true)}
                    sx={buttonStyled}
                    type="submit"
                    variant="contained"
                    disabled={!dirty || !isValid}
                  >
                    OK
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
          {isLoading && (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          )}
          {alert && <AlertInfo type={type} title={message} />}
        </div>
      </Main>
    </>
  );
};
