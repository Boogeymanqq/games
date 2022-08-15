import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHttp } from "../../hooks/http.hook";
import { classes } from "../../data";
import { $HOST, REGISTER_STUDENT } from "../../api-info";
import { initialValues, buttonStyled } from "./studentFormData";
import { Headerpage } from "../../components/header-page/header-page";
import { Button, Box, TextField, CircularProgress } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { object, string } from "yup";
import { AlertInfo } from "../../ui/alert/alert";
import { makeStyles } from "@mui/styles";
import pen from "./img/icon-pen.svg";
import s from "./student-form.module.css";

const useStyles = makeStyles(classes);

export const Studentform = ({ caption }) => {
  const { loading, request } = useHttp();
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("success");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const classes = useStyles();

  return (
    <>
      <Headerpage picture={pen} />
      <main className={s.main}>
        <h2>{caption}</h2>
        <div className={s.materialForm}>
          <Formik
            initialValues={initialValues}
            validationSchema={object({
              lastName: string()
                .trim()
                .min(3, "Минимум 3 символа")
                .max(50, "Максимум 50 символов")
                .required("Пожалуйста, введите фамилию"),
              firstName: string()
                .trim()
                .min(3, "Минимум 3 символа")
                .max(20, "Максимум 20 символов")
                .required("Пожалуйста, введите фамилию"),
              login: string()
                .trim()
                .min(3, "Минимум 3 символа")
                .max(20, "Максимум 20 символов")
                .required("Пожалуйста, введите логин"),
              password: string()
                .trim()
                .required("Пожалуйста, введите пароль")
                .min(4, "Минимум 4 символа")
                .max(20, "Максимум 20 символов"),
              comment: string()
                .trim()
                .min(4, "Минимум 4 символа")
                .max(100, "Максимум 100 символов"),
            })}
            onSubmit={async (values, formikHelpers) => {
              try {
                const res = await request(
                  `${$HOST}${REGISTER_STUDENT}`,
                  "POST",
                  values
                );
                setAlert(true);
                setTimeout(() => setAlert(false), 2000);
                setMessage(res.message);
                setType(res.type);
                setIsLoading(false);
                console.log(res);
                setTimeout(() => navigate("/teacherroom/students"), 1000);
              } catch (error) {
                setIsLoading(false);
                setAlert(true);
                setTimeout(() => setAlert(false), 3000);
                setMessage(error.message);
                setType(error.type);
                // console.log(error);
              }
              // console.log(values);
              formikHelpers.resetForm();
            }}
          >
            {({ errors, isValid, touched, dirty }) => (
              <Form>
                <Field
                  className={classes.tool}
                  name="lastName"
                  type="lastName"
                  as={TextField}
                  size="small"
                  variant="outlined"
                  color="primary"
                  label="Фамилия"
                  fullWidth
                  error={Boolean(errors.lastName) && Boolean(touched.lastName)}
                  helperText={Boolean(touched.lastName) && errors.lastName}
                />
                <Box height={10} />
                <Field
                  className={classes.tool}
                  name="firstName"
                  type="firstName"
                  as={TextField}
                  size="small"
                  variant="outlined"
                  color="primary"
                  label="Имя"
                  fullWidth
                  error={
                    Boolean(errors.firstName) && Boolean(touched.firstName)
                  }
                  helperText={Boolean(touched.firstName) && errors.firstName}
                />
                <Box height={10} />
                <Field
                  className={classes.tool}
                  name="login"
                  type="login"
                  as={TextField}
                  size="small"
                  variant="outlined"
                  color="primary"
                  label="Логин"
                  fullWidth
                  error={Boolean(errors.login) && Boolean(touched.login)}
                  helperText={Boolean(touched.login) && errors.login}
                />
                <Box height={10} />
                <Field
                  className={classes.tool}
                  name="password"
                  type="password"
                  as={TextField}
                  size="small"
                  variant="outlined"
                  color="primary"
                  label="Пароль"
                  fullWidth
                  autoComplete="new-password"
                  error={Boolean(errors.password) && Boolean(touched.password)}
                  helperText={Boolean(touched.password) && errors.password}
                />
                <Box height={10} />
                <Field
                  className={classes.tool}
                  name="comment"
                  type="comment"
                  as={TextField}
                  size="small"
                  variant="outlined"
                  color="primary"
                  label="Комментарий"
                  fullWidth
                  error={Boolean(errors.comment) && Boolean(touched.comment)}
                  helperText={Boolean(touched.comment) && errors.comment}
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
      </main>
    </>
  );
};
