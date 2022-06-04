import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pagelogo } from "../../ui/pageLogo/pageLogo";
import { Label } from "../../ui/label/label";
import { Burger } from "../../ui/burger/burger";
import { Box, Button, TextField, CircularProgress } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { object, string } from "yup";
import { useHttp } from "../../hooks/http.hook";
import { AlertInfo } from "../../ui/alert/alert";
import pen from "./img/icon-pen.svg";
import s from "./signin.module.css";

const initialValues = {
  lastName: "",
  firstName: "",
  patronymic: "",
  email: "",
  phone: "",
  login: "",
  password: "",
};

export const Signin = ({ caption }) => {
  const { loading, request } = useHttp();
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("success");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      <header className={s.header}>
        <Pagelogo />
        <Label picture={pen} />
        <Burger />
      </header>
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
                .required("Пожалуйста, введите имя"),
              firstName: string()
                .trim()
                .min(3, "Минимум 3 символа")
                .max(20, "Максимум 20 символов")
                .required("Пожалуйста, введите фамилию"),
              patronymic: string()
                .trim()
                .min(3, "Минимум 3 символа")
                .max(50, "Максимум 50 символов")
                .required("Пожалуйста, введите отчество"),
              email: string()
                .required("Пожалуйста, введите адрес электронной почты")
                .email("Недопустимый формат email")
                .trim()
                .matches(
                  /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/,
                  "Недопустимый формат email"
                ),
              phone: string()
                .trim()
                .required("Пожалуйста, введите номер телефона")
                .matches(/^\+?7(\d{10})$/, "Недопустимый формат телефона"),
              login: string()
                .trim()
                .min(3, "Минимум 3 символа")
                .max(20, "Максимум 20 символов")
                .required("Пожалуйста, введите логин"),
              password: string()
                .trim()
                .required("Пожалуйста, введите пароль")
                .min(6, "Минимум 6 символов")
                .max(20, "Максимум 20 символов")
                .matches(
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_@$!%*?&])[A-Za-z\d_@$!%*?&]{6,}$/,
                  `Недопустимый формат. Пароль должен иметь минимум одну заглавную букву, одну строчную букву, одну цифру и один специальный символ`
                ),
            })}
            onSubmit={async (values, formikHelpers) => {
              try {
                const res = await request(
                  "api/auth/register/teacher",
                  "POST",
                  values
                );
                setAlert(true);
                setMessage(res.message);
                setType(res.type);
                setIsLoading(false);
                console.log(res);
                setTimeout(() => navigate("/login"), 1000);
              } catch (error) {
                setIsLoading(false);
                setAlert(true);
                setTimeout(() => setAlert(false), 3000);
                setMessage(error.message);
                setType(error.type);
                console.log(error);
              }
              console.log(values);
              formikHelpers.resetForm();
            }}
          >
            {({ errors, isValid, touched, dirty }) => (
              <Form>
                <Field
                  sx={{
                    background: "#fff",
                    borderRadius: "5px",
                  }}
                  name="lastName"
                  type="lastName"
                  as={TextField}
                  variant="outlined"
                  color="success"
                  label="Фамилия"
                  fullWidth
                  error={Boolean(errors.lastName) && Boolean(touched.lastName)}
                  // helperText={Boolean(touched.lastName) && errors.lastName}
                />
                <Box height={10} />
                <Field
                  sx={{ background: "#fff", borderRadius: "5px" }}
                  name="firstName"
                  type="firstName"
                  as={TextField}
                  variant="outlined"
                  color="success"
                  label="Имя"
                  fullWidth
                  error={
                    Boolean(errors.firstName) && Boolean(touched.firstName)
                  }
                  // helperText={Boolean(touched.firstName) && errors.firstName}
                />
                <Box height={10} />
                <Field
                  sx={{ background: "#fff", borderRadius: "5px" }}
                  name="patronymic"
                  type="patronymic"
                  as={TextField}
                  variant="outlined"
                  color="success"
                  label="Отчество"
                  fullWidth
                  error={
                    Boolean(errors.patronymic) && Boolean(touched.patronymic)
                  }
                  // helperText={Boolean(touched.patronymic) && errors.patronymic}
                />
                <Box height={10} />
                <Field
                  sx={{ background: "#fff", borderRadius: "5px" }}
                  name="email"
                  type="email"
                  as={TextField}
                  variant="outlined"
                  color="success"
                  label="Электронная почта"
                  fullWidth
                  error={Boolean(errors.email) && Boolean(touched.email)}
                  // helperText={Boolean(touched.email) && errors.email}
                />
                <Box height={10} />
                <Field
                  sx={{ background: "#fff", borderRadius: "5px" }}
                  name="phone"
                  type="phone"
                  as={TextField}
                  variant="outlined"
                  color="success"
                  label="Номер телефона"
                  placeholder="+7XXXXXXXXXX"
                  fullWidth
                  error={Boolean(errors.phone) && Boolean(touched.phone)}
                  // helperText={Boolean(touched.phone) && errors.phone}
                />
                <Box height={10} />
                <Field
                  sx={{ background: "#fff", borderRadius: "5px" }}
                  name="login"
                  type="login"
                  as={TextField}
                  variant="outlined"
                  color="success"
                  label="Логин"
                  fullWidth
                  error={Boolean(errors.login) && Boolean(touched.login)}
                  // helperText={Boolean(touched.login) && errors.login}
                />
                <Box height={10} />
                <Field
                  sx={{
                    background: "#fff",
                    borderRadius: "5px",
                  }}
                  name="password"
                  type="password"
                  as={TextField}
                  variant="outlined"
                  color="success"
                  label="Пароль"
                  fullWidth
                  error={Boolean(errors.password) && Boolean(touched.password)}
                  // helperText={Boolean(touched.password) && errors.password}
                />

                <Box height={30} />
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    className={s.btn}
                    onClick={() => setIsLoading(true)}
                    sx={{
                      fontFamily: "Oswald",
                      fontSize: "38px",
                      width: "246px",
                      background: "#000",
                      borderRadius: 0,
                    }}
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
