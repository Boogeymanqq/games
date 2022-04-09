import React from "react";
import { Navigation } from "../../ui/navigation/navigation";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  CardImg,
  CardText,
  CardTitle,
} from "reactstrap";
import s from "./home.module.css";

export const Home = () => {
  return (
    <div className={s.header}>
      <Navigation />
      <div className="container">
        <CardGroup className={s.group}>
          <Card className={s.card}>
            <CardImg className={s.img} src="/img/monster/img/monster.webp" />
            <CardBody>
              <CardTitle tag="p">Make a Monster</CardTitle>
              <CardText tag="p">Make your own funny Monster</CardText>

              <Link to="/monster">
                <Button outline color="warning">
                  Let's Play
                </Button>
              </Link>
            </CardBody>
          </Card>
          <Card className={s.card}>
            <CardImg className={s.img} src="" />
            <CardBody>
              <CardTitle tag="p">Cards</CardTitle>
              <CardText tag="p">Make your own Cards</CardText>
              <Link to="/cards">
                <Button outline color="warning">
                  Let's Play
                </Button>
              </Link>
            </CardBody>
          </Card>
          <Card className={s.card}>
            <CardImg className={s.img} src="/img/room/maxresdefault.jpg" />
            <CardBody>
              <CardTitle tag="p">Room</CardTitle>
              <CardText tag="p">Make your own Room</CardText>
              <Link to="/room">
                <Button outline color="warning">
                  Let's Play
                </Button>
              </Link>
            </CardBody>
          </Card>
        </CardGroup>
      </div>
    </div>
  );
};
