import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import s from "./cards.module.css";

export const Cards = () => {
  const [mouth, setMouth] = useState([
    {
      id: 24,
      url: "https://d-straj.ru/local/templates/citadels/img/no_image.png",
      completed: false,
    },
    {
      id: 25,
      url: "https://blaubergventilatoren.de/uploads/productCard/rtmv14.png",
      completed: false,
    },
    {
      id: 26,
      url: "https://d-straj.ru/local/templates/citadels/img/no_image.png",
      completed: false,
    },
  ]);

  // const classes = [];
  function toggle(id) {
    setMouth(
      mouth.map((elem) => {
        if (elem.id === id) {
          elem.completed = !elem.completed;
        }
        // if (elem.completed) {
        //   classes.push("done");
        // }
        return elem;
      })
    );
  }
  console.log(Object.values(mouth));

  return (
    <section className={s.content__block}>
      <Link to="/home">
        <Button outline color="warning">
          Home
        </Button>
      </Link>
      <h2>title</h2>
      <div className={s.flip__body}>
        {mouth.map((elem) => (
          <div key={elem.id} onClick={() => toggle(elem.id)}>
            <img
              className={elem.completed ? s.flip__front : s.flip__back}
              width="250"
              alt="#"
              src={
                elem.completed
                  ? elem.url
                  : "https://blaubergventilatoren.de/uploads/productCard/rtmv14.png"
              }
              key={elem.id}
            ></img>
          </div>
        ))}
      </div>
    </section>
  );
};
