import React from "react";
import { Link } from "react-router-dom";
import s from "./navigation.module.css";
import { teacherPage } from "../../data.js";
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
import { StudentForm } from "./student/studentForm";
// import SportsEsportsIcon from "@mui/icons-material/SportsEsports";

// const useStyles = makeStyles({
//   root: {
//     background: "#E1F5FE",
//     padding: 1,
//   },
// });

export const Teacher = ({ caption }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event) => {
    setValue(event.target);
  };
  console.log(value);

  return (
    <>
      <AppBar sx={{ bgcolor: "#e8eaf6", p: 0.5 }} position="static">
        <Container maxWidth="xxl">
          <Toolbar className={s.navigation__navbar}>
            <Link to="/">
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
            </Link>
            <Tabs
              maxWidth="lg"
              value={value}
              aria-label="secondary tabs example"
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
            >
              {teacherPage.map((elem, index) => (
                <Tab
                  label={elem.title}
                  key={index}
                  to={elem.href}
                  component={Link}
                />
              ))}
            </Tabs>
          </Toolbar>
        </Container>
      </AppBar>
      <Box height={150} />
      <StudentForm caption={caption} />
    </>
  );
};
