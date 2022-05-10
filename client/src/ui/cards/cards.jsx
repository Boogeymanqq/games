import React, { useState } from "react";
import { navGames } from "../../data";
import { NavigationGames } from "../navigationGames/navigationGames";
import s from "./cards.module.css";

const cardsLink = "Карточки";
const newNavGame = navGames.filter((elem) => elem.title !== cardsLink);

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
        return elem;
      })
    );
  }
  // console.log(Object.values(mouth));

  return (
    <>
      <NavigationGames newNavGame={newNavGame} />
      <section className={s.content__block}>
        <h2>Cards game</h2>
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
    </>
  );
};
