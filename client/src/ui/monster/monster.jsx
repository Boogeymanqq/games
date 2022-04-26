import React, { useState } from "react";
import Draggable from "react-draggable";
import { Link } from "react-router-dom";
import { monster } from "../../data";
import s from "./monster.module.css";
import { navGames } from "../../data";
import style from "../navigation/navigation.module.css";
import { Navbar, Nav, NavItem } from "reactstrap";

const monsterLink = "Монстер";
const newNavGame = navGames.filter((elem) => elem.title !== monsterLink);

export const Monster = () => {
  const nodeRef = React.useRef(null);
  const [size, setSize] = useState(100);
  const [objSize, setObjSize] = useState(100);
  const [cardMonster, setCardMonster] = useState(monster);

  function startDrag(e, id) {
    e.preventDefault();
    setCardMonster(
      cardMonster.map((elem) =>
        Object.values(elem).map((item) =>
          item.map((item) => {
            if (item.id === id) {
              item.completed = false;
            }
            return item;
          })
        )
      )
    );
    // console.log(completed);
  }

  function stopDrag(e, completed) {
    e.preventDefault();
  }

  function toggle(id) {
    setCardMonster(
      cardMonster.map((elem) =>
        Object.values(elem).map((item) =>
          item.map((item) => {
            if (item.id === id) {
              item.completed = true;
            }
            return item;
          })
        )
      )
    );
  }

  return (
    <>
      <div className={style.navigation}>
        <Navbar
          className={style.navigation__navbar}
          expand="md"
          container="md"
          color="light"
        >
          <Nav className={style.list}>
            {newNavGame.map((elem, index) => (
              <NavItem className={style.navigation__navitem} key={index}>
                <Link to={elem.href}>
                  <div className={style.navigation__navlink}>{elem.title}</div>
                </Link>
              </NavItem>
            ))}
          </Nav>
        </Navbar>
      </div>
      <div className="container">
        <h2 className={s.title}>Make a Monster</h2>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <label>
            {size}
            <br />
            <input
              type="range"
              value={size}
              onInput={(e) => setSize(e.target.value)}
            />
          </label>
          <label>
            {objSize}
            <br />
            <input
              type="range"
              value={objSize}
              onInput={(e) => setObjSize(e.target.value)}
            />
          </label>
        </div>
        <div className={s.monster}>
          <div
            className={s.frame}
            style={{ width: `${4.5 * size}px`, height: `${6 * size}px` }}
          ></div>
          <div
            className={s.parts}
            style={{ width: `${8 * objSize}px`, height: `${6 * objSize}px` }}
          >
            {cardMonster.map((elem) =>
              Object.values(elem).map((item) =>
                item.map((el) => (
                  <Draggable
                    axis="both"
                    // bounds="body"
                    key={el.id}
                    nodeRef={nodeRef}
                    onStart={(e) => startDrag(e, el.id)}
                    onStop={(e) => stopDrag(e, el.completed)}
                    position={el.completed === true ? el.defaultPos : null}
                  >
                    <div id={el.id} className={s.monster__body} ref={nodeRef}>
                      <img
                        src={el.url}
                        alt=""
                        style={{
                          width: `${0.6 * objSize}px`,
                          height: `${0.8 * objSize}px`,
                        }}
                      />
                      <button className={s.btn} onClick={() => toggle(el.id)}>
                        &times;
                      </button>
                    </div>
                  </Draggable>
                ))
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};
