import React from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import s from "./student.module.css";

export const Student = () => {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setValue(event.target);
  };

  function logout() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <AppBar sx={{ bgcolor: "#e8eaf6", p: 0.5 }} position="static">
      <Container maxWidth="xxl">
        <Toolbar className={s.navigation__navbar}>
          <Typography
            className={s.navigation__navbrand}
            variant="h4"
            component="div"
          >
            <span style={{ color: "#3399FF" }}>pi</span>
            <span style={{ color: "#F08080" }}>ki</span>
            <span style={{ color: "#33CC33" }}>mo</span>
            <span style={{ color: "#FF9900" }}>ni</span>
          </Typography>
          <Tabs
            maxWidth="lg"
            value={value}
            aria-label="secondary tabs example"
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
          >
            <Tab label={"Выйти"} onClick={logout} />
          </Tabs>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
