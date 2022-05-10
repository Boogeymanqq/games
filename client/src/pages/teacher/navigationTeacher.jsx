import * as React from "react";
import { useNavigate, Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
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
import { teacherPage } from "../../data.js";
import s from "./navigationTeacher.module.css";

// import SportsEsportsIcon from "@mui/icons-material/SportsEsports";

// const useStyles = makeStyles({
//   root: {
//     background: "#E1F5FE",
//     padding: 1,
//   },
// });

export const NavigationTeacher = () => {
  const [value, setValue] = React.useState(0);

  const navigate = useNavigate();

  const handleChange = (event) => {
    setValue(event.target);
  };
  //   console.log(value);

  function logout() {
    localStorage.clear();
    navigate("/");
  }
  return (
    <>
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
              value={value}
              aria-label="secondary tabs example"
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
            >
              {teacherPage.map((elem, index) =>
                elem.title === "Выйти" ? (
                  <Tab label={elem.title} key={index} onClick={logout} />
                ) : (
                  <Tab
                    label={elem.title}
                    key={index}
                    to={elem.href}
                    component={Link}
                  />
                )
              )}
            </Tabs>
          </Toolbar>
        </Container>
      </AppBar>
      <Box height={150} />
    </>
  );
};
