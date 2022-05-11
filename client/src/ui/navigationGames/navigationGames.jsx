import { Link } from "react-router-dom";
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  tool: {
    justifyContent: "center",
    gap: "100px",
  },
  link: {
    color: "#A52A2A",
    "&:hover": {
      color: "#A52A2A",
    },
  },
});

export const NavigationGames = ({ newNavGame }) => {
  const classes = useStyles();

  return (
    <Box>
      <AppBar sx={{ background: "#FFFAF0" }} position="static">
        <Toolbar className={classes.tool}>
          {newNavGame.map((elem, index) => (
            <Typography key={index} variant="h6" component="div">
              <Button
                sx={{
                  color: "#A52A2A",
                  fontSize: "15px",
                }}
              >
                <Link className={classes.link} to={elem.href}>
                  {elem.title}
                </Link>
              </Button>
            </Typography>
          ))}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
