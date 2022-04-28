import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import s from "./login.module.css";

const initialValues = {
  login: "",
  password: "",
};

export const Login = ({ caption }) => {
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
          login: string()
            .trim()
            .min(3, "Минимум 3 символа")
            .max(20, "Максимум 20 символов")
            .required("Пожалуйста, введите логин"),
          password: string()
            .trim()
            .required("Пожалуйста, введите пароль")
            .min(6, "Минимум 6 символов")
            .max(20, "Максимум 20 символов"),
        })}
        onSubmit={async (values, formikHelpers) => {
          try {
            const res = await request("api/auth/login", "POST", values);
            setAlert(true);
            setMessage(res.message);
            setType(res.type);
            setIsLoading(false);
            console.log(res);
            formikHelpers.resetForm();
            setTimeout(() => navigate("/teacher"), 1000);
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
                fullWidth
                disabled={!dirty || !isValid}
              >
                Войти
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
