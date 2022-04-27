import * as React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Container,
} from "@mui/material";

export const Games = () => {
  return (
    <Container
      sx={{ display: "flex", justifyContent: "space-between", mt: 10 }}
    >
      <Card sx={{ maxWidth: 325, display: "flex", flexDirection: "column" }}>
        <CardMedia
          component="img"
          alt=""
          image="/img/monster/img/monster.webp"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Make a Monster
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Make your own funny Monster
          </Typography>
        </CardContent>
        <CardActions>
          <Link to="/monster">
            <Button size="medium">Let's Play</Button>
          </Link>
        </CardActions>
      </Card>
      <Card
        sx={{
          maxWidth: 325,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardMedia
          sx={{
            minWidth: 250,
            maxHeight: 240,
            transform: "rotate(90deg)",
            mt: 0,
          }}
          component="img"
          alt=""
          image="/img/cards.png"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Cards
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Make your own Cards
          </Typography>
        </CardContent>
        <CardActions>
          <Link to="/cards">
            <Button size="medium">Let's Play</Button>
          </Link>
        </CardActions>
      </Card>
      <Card sx={{ maxWidth: 325, display: "flex", flexDirection: "column" }}>
        <CardMedia component="img" alt="" image="/img/room/maxresdefault.jpg" />
        <CardContent sx={{ mt: "auto" }}>
          <Typography gutterBottom variant="h5" component="p">
            Room
          </Typography>
          <Typography
            sx={{ flex: "0 0 auto" }}
            variant="body2"
            color="text.secondary"
          >
            Make your own Room
          </Typography>
        </CardContent>
        <CardActions>
          <Link to="/room">
            <Button size="medium">Let's Play</Button>
          </Link>
        </CardActions>
      </Card>
    </Container>
  );
};
