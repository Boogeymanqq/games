import { useState } from "react";
import { useNavigate } from "react-router-dom";

// import { useHistory } from "react-router";
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
  email: "",
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
          email: string()
            .required("Пожалуйста, введите адрес электронной почты")
            .email("Недопустимый формат email")
            .trim()
            .matches(
              /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/,
              "Недопустимый формат email"
            ),
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
