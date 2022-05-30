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
import { useHttp } from "../../../hooks/http.hook";
import { AlertInfo } from "../../../ui/alert/alert";
import { green } from "@mui/material/colors";
import AssignmentIcon from "@mui/icons-material/Assignment";
import s from "./student.module.css";

const initialValues = {
  lastName: "",
  firstName: "",
  login: "",
  password: "",
};

export const StudentForm = ({ caption }) => {
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
        })}
        onSubmit={async (values, formikHelpers) => {
          try {
            const res = await request(
              "api/auth/register/student",
              "POST",
              values
            );
            setAlert(true);
            setTimeout(() => setAlert(false), 2000);
            setMessage(res.message);
            setType(res.type);
            setIsLoading(false);
            console.log(res);
            // setTimeout(() => navigate("/login"), 1000);
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
              name="lastName"
              type="lastName"
              as={TextField}
              variant="outlined"
              color="primary"
              label="Фамилия"
              fullWidth
              error={Boolean(errors.lastName) && Boolean(touched.lastName)}
              helperText={Boolean(touched.lastName) && errors.lastName}
            />
            <Box height={10} />
            <Field
              name="firstName"
              type="firstName"
              as={TextField}
              variant="outlined"
              color="primary"
              label="Имя"
              fullWidth
              error={Boolean(errors.firstName) && Boolean(touched.firstName)}
              helperText={Boolean(touched.firstName) && errors.firstName}
            />
            <Box height={10} />
            <Field
              name="login"
              type="login"
              as={TextField}
              variant="outlined"
              color="primary"
              label="Логин"
              fullWidth
              error={Boolean(errors.login) && Boolean(touched.login)}
              helperText={Boolean(touched.login) && errors.login}
            />
            <Box height={10} />
            <Field
              name="password"
              type="password"
              as={TextField}
              variant="outlined"
              color="primary"
              label="Пароль"
              fullWidth
              error={Boolean(errors.password) && Boolean(touched.password)}
              helperText={Boolean(touched.password) && errors.password}
            />
            <Box height={30} />
            <Box>
              <Button
                onClick={() => setIsLoading(true)}
                type="submit"
                variant="contained"
                color="success"
                size="large"
                disabled={!dirty || !isValid}
                fullWidth
              >
                Продолжить
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
  );
};
