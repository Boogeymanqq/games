import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Box,
  TextField,
  Typography,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import { object, string } from "yup";
import { useHttp } from "../../hooks/http.hook";
import { AlertInfo } from "../../ui/alert/alert";
import { green } from "@mui/material/colors";
import AssignmentIcon from "@mui/icons-material/Assignment";
import s from "./signin.module.css";

const initialValues = {
  lastname: "",
  name: "",
  patronymic: "",
  email: "",
  phone: "",
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
    <div className={s.materialForm}>
      <Box component="div" sx={{ display: "flex", gap: "20px" }}>
        <Avatar sx={{ bgcolor: green[500] }}>
          <AssignmentIcon />
        </Avatar>
        <Typography
          sx={{ textTransform: "uppercase" }}
          variant="h4"
          component="h4"
        >
          {caption}
        </Typography>
      </Box>
      <Formik
        initialValues={initialValues}
        validationSchema={object({
          lastname: string()
            .trim()
            .min(3, "Минимум 3 символа")
            .max(50, "Максимум 50 символов")
            .required("Пожалуйста, введите фамилию"),
          name: string()
            .trim()
            .min(3, "Минимум 3 символа")
            .max(20, "Максимум 20 символов")
            .required("Пожалуйста, введите фамилию"),
          patronymic: string()
            .trim()
            .min(3, "Минимум 3 символа")
            .max(50, "Максимум 50 символов")
            .required("Пожалуйста, введите фамилию"),
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
          password: string()
            .trim()
            .required("Пожалуйста, введите пароль")
            .min(6, "Минимум 6 символов")
            .max(20, "Максимум 20 символов")
            .matches(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
              `Недопустимый формат. Пароль должен иметь минимум одну заглавную букву, одну строчную букву, одну цифру и один специальный символ`
            ),
        })}
        onSubmit={async (values, formikHelpers) => {
          try {
            const res = await request("api/auth/register", "POST", values);
            setAlert(true);
            setMessage(res.message);
            setType(res.type);
            setIsLoading(false);
            console.log(res);
            setTimeout(() => navigate("/login"), 1000);
          } catch (error) {
            setIsLoading(false);
            setAlert(true);
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
              name="lastname"
              type="lastname"
              as={TextField}
              variant="outlined"
              color="primary"
              label="Фамилия"
              fullWidth
              error={Boolean(errors.lastname) && Boolean(touched.lastname)}
              helperText={Boolean(touched.lastname) && errors.lastname}
            />
            <Box height={10} />
            <Field
              name="name"
              type="name"
              as={TextField}
              variant="outlined"
              color="primary"
              label="Имя"
              fullWidth
              error={Boolean(errors.name) && Boolean(touched.name)}
              helperText={Boolean(touched.name) && errors.name}
            />
            <Box height={10} />
            <Field
              name="patronymic"
              type="patronymic"
              as={TextField}
              variant="outlined"
              color="primary"
              label="Отчество"
              fullWidth
              error={Boolean(errors.patronymic) && Boolean(touched.patronymic)}
              helperText={Boolean(touched.patronymic) && errors.patronymic}
            />
            <Box height={10} />
            <Field
              name="email"
              type="email"
              as={TextField}
              variant="outlined"
              color="primary"
              label="Электронная почта"
              fullWidth
              error={Boolean(errors.email) && Boolean(touched.email)}
              helperText={Boolean(touched.email) && errors.email}
            />
            <Box height={10} />
            <Field
              name="phone"
              type="phone"
              as={TextField}
              variant="outlined"
              color="primary"
              label="Номер телефона"
              placeholder="+7XXXXXXXXXX"
              fullWidth
              error={Boolean(errors.phone) && Boolean(touched.phone)}
              helperText={Boolean(touched.phone) && errors.phone}
            />
            <Box height={10} />
            <Field
              name="password"
              type="password"
              as={TextField}
              variant="outlined"
              color="primary"
              label="Password"
              fullWidth
              error={Boolean(errors.password) && Boolean(touched.password)}
              helperText={Boolean(touched.password) && errors.password}
            />
            <Box height={30} />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                onClick={() => setIsLoading(true)}
                type="submit"
                variant="contained"
                color="success"
                size="large"
                disabled={!dirty || !isValid}
              >
                Продолжить
              </Button>
              <Link to="/">
                <Button variant="contained" color="primary" size="large">
                  На Главную
                </Button>
              </Link>
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
  );
};
