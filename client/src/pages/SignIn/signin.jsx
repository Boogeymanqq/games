import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useHttp } from "../../hooks/http.hook";
import { Alert } from "../../ui/alert/alert";
import { Button } from "reactstrap";
import s from "./signin.module.css";

export const Signin = ({ caption }) => {
  const { loading, request } = useHttp();
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("secondary");
  const [isLoading, setIsLoading] = useState(false);
  const [valueMail, setValueMail] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({ mode: "all" });

  const onSubmit = (data) => {
    const registerHandler = async () => {
      try {
        const res = await request("api/auth/register", "POST", data);
        setAlert(true);
        setMessage(res.message);
        setType(res.type);
        setIsLoading(false);
        localStorage.setItem("login", () => setValueMail(data.email));
        console.log(res);
      } catch (error) {
        setIsLoading(false);
        setAlert(true);
        setMessage(error.message);
        setType(error.type);
        localStorage.setItem("login", () => setValueMail(data.email));
        console.log(error);
      }
    };
    registerHandler();
    console.log(JSON.stringify(data));
    reset();
  };

  return (
    <div className="container">
      <div className={s.signin__caption}>
        <img
          src="/img/SignIn_form/1110960_essential_in_minus_round_set_icon.svg"
          alt="signin icon"
          width="50"
          height="50"
        />
        <span className={s.caption}>{caption}</span>
      </div>
      <form
        className={s.signin__form}
        onSubmit={handleSubmit(onSubmit)}
        onChange={(e) => (e.target.value = e.target.value.trim())}
      >
        <div className={s.signin__wraper}>
          <div className="mb-3">
            <label className={s.signin__label} htmlFor="lastName">
              Фамилия<sup style={{ color: "red" }}>*</sup>
            </label>
            <input
              name="lastName"
              {...register("lastName", {
                required: "Это поле обязательно",
                minLength: {
                  value: 3,
                  message: "Минимум 3 символа",
                },
                maxLength: {
                  value: 50,
                  message: "Максимум 50 символов",
                },
              })}
              type="text"
              className="form-control"
              id="lastName"
            />
          </div>
          <div>
            {errors?.lastName && (
              <p className={s.focus}>{errors?.lastName?.message || "Error!"}</p>
            )}
          </div>

          <div className="mb-3">
            <label className={s.signin__label} htmlFor="firstName">
              Имя<sup style={{ color: "red" }}>*</sup>
            </label>
            <input
              name="firstName"
              {...register("firstName", {
                required: "Это поле обязательно",
                minLength: {
                  value: 3,
                  message: "Минимум 3 символа",
                },
                maxLength: {
                  value: 20,
                  message: "Максимум 20 символов",
                },
              })}
              type="text"
              className="form-control"
              id="firstName"
            />
          </div>
          <div>
            {errors?.firstName && (
              <p className={s.focus}>
                {errors?.firstName?.message || "Error!"}
              </p>
            )}
          </div>

          <div className="mb-3">
            <label className={s.signin__label} htmlFor="patronymic">
              Отчество
            </label>
            <input
              name="patronymic"
              type="text"
              className="form-control"
              id="patronymic"
            />
          </div>

          <div className="mb-3">
            <label className={s.signin__label} htmlFor="email">
              Электронная почта<sup style={{ color: "red" }}>*</sup>
            </label>
            <input
              name="email"
              {...register("email", {
                required: "Это поле обязательно",
                maxLength: {
                  value: 50,
                  message: "Максимум 50 символов",
                },
                pattern: {
                  value:
                    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/,
                  message: "Недопустимый формат email",
                },
              })}
              type="email"
              className="form-control"
              id="email"
              // onChange={(e) => setValueMail(e.target.value)}
            />
          </div>
          <div>
            {errors?.email && (
              <p className={s.focus}>{errors?.email?.message || "Error!"}</p>
            )}
          </div>

          <div className="mb-3">
            <label className={s.signin__label} htmlFor="tel">
              Номер телефона<sup style={{ color: "red" }}>*</sup>
            </label>
            <input
              name="tel"
              {...register("tel", {
                required: "Это поле обязательно",
                pattern: {
                  value: /^\+?7(\d{10})$/,
                  message: "Недопустимый формат телефона",
                },
              })}
              type="tel"
              placeholder="+7XXXXXXXXXX"
              className="form-control"
              id="tel"
            />
          </div>
          <div>
            {errors?.tel && (
              <p className={s.focus}>{errors?.tel?.message || "Error!"}</p>
            )}
          </div>

          <div className="mb-3">
            <label className={s.signin__label} htmlFor="password">
              Введите пароль для последующего входа:
              <sup style={{ color: "red" }}>*</sup>
            </label>
            <input
              type="password"
              name="password"
              {...register("password", {
                required: "Это поле обязательно",
                minLength: {
                  value: 6,
                  message: "Минимум 6 символов",
                },
                maxLength: {
                  value: 20,
                  message: "Максимум 20 символов",
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                  message:
                    "Недопустимый формат. Пароль должен иметь минимум одну заглавную букву, одну строчную букву, одну цифру и один специальный символ",
                },
              })}
              id="password"
              className="form-control"
              autoComplete="off"
            />
          </div>
          <div>
            {errors?.password && (
              <p className={s.focus}>{errors?.password?.message || "Error!"}</p>
            )}
          </div>
        </div>
        <div className={s.signin__btns}>
          <Button
            onClick={() => setIsLoading(true)}
            className={s.signin__submit}
            color="warning"
            type="submit"
            disabled={!isValid}
          >
            Продолжить
          </Button>
          <Link to="/">
            <Button className={s.main__btn} color="outline-primary">
              На Главную
            </Button>
          </Link>
        </div>
      </form>
      {isLoading && (
        <img
          style={{ display: "block", margin: "0 auto" }}
          width="100"
          height="100"
          src={require("../signin/Loading.gif")}
          alt="loading..."
        />
      )}
      {alert && <Alert type={type} title={message} />}
    </div>
  );
};
