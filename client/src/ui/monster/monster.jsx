import React, { useState, useRef } from "react";
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
  const [cardMonster, setCardMonster] = useState(monster);
  const [size, setSize] = useState(100);
  const [objSize, setObjSize] = useState(100);
  const [objBoxSize, setObjBoxSize] = useState(100);
  const [drag, setDrag] = useState(false);
  const [isShow, setIsShow] = useState(true);

  const nodeRef = useRef(null);

  function startDrag(e) {
    e.preventDefault();
  }

  function stopDrag(e, data, id) {
    e.preventDefault();
    setCardMonster(
      filtredMonster.map((item) => {
        if (item.id === id) {
          item.position = { x: data.x, y: data.y };
        }
        return item;
      })
    );
  }

  function toggle(id) {
    setCardMonster(
      filtredMonster.map((item) => {
        if (item.id === id) {
          item.position = { x: 0, y: 0 };
        }
        return item;
      })
    );
  }

  function dragStartHandler(e) {
    e.preventDefault();
    setDrag(true);
  }

  function dropHandler(e) {
    e.preventDefault();
    let files = [...e.dataTransfer.files];
    const obj = { ...files };
    console.log(obj);
    // setCardRooms(monster.push(obj.File.name));
    console.log(cardMonster);
    const formData = new FormData();
    formData.append("file", files[0]);
    setDrag(false);
    console.log(files);
  }

  function dragLeaveHandler(e) {
    e.preventDefault();
    setDrag(false);
  }

  function onChange(id) {
    setCardMonster(
      cardMonster.map((elem) => {
        if (elem.id === id) {
          elem.checked = !elem.checked;
        }
        return elem;
      })
    );
  }

  function isReturn() {
    setIsShow(true);
    // window.location.reload();
    setCardMonster(
      monster.map((elem) => {
        if (elem.checked === true) {
          elem.checked = false;
        }
        return elem;
      })
    );
  }

  const filtredMonster = cardMonster.filter((elem) => elem.checked === true);

  return (
    <>
      {isShow ? (
        <>
          <div className={s.show}>
            {cardMonster.map((elem, index) => (
              <div key={index}>
                <img
                  style={{
                    width: `${0.6 * objSize}px`,
                    height: `${0.8 * objSize}px`,
                  }}
                  src={elem.url}
                  alt=""
                />
                <input type="checkbox" onChange={() => onChange(elem.id)} />
              </div>
            ))}
          </div>
          <button
            className={s.show__btn}
            type="button"
            onClick={() => setIsShow(false)}
          >
            Продолжить
          </button>
          <div>
            {drag ? (
              <div
                onDragStart={(e) => dragStartHandler(e)}
                onDragLeave={(e) => dragLeaveHandler(e)}
                onDragOver={(e) => dragStartHandler(e)}
                onDrop={(e) => dropHandler(e)}
                className={s.drop__area}
              >
                Отпусти файлы
              </div>
            ) : (
              <div
                onDragStart={(e) => dragStartHandler(e)}
                onDragLeave={(e) => dragLeaveHandler(e)}
                onDragOver={(e) => dragStartHandler(e)}
                className={s.drop__area}
              >
                Перенеси
              </div>
            )}
          </div>
        </>
      ) : (
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
                      <div className={style.navigation__navlink}>
                        {elem.title}
                      </div>
                    </Link>
                  </NavItem>
                ))}
              </Nav>
            </Navbar>
          </div>
          <h2 className={s.title}>Make a Monster</h2>
          <div
            style={{
              width: "1300px",
              margin: "0 auto 60px",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
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
            <label>
              {objBoxSize}
              <br />
              <input
                type="range"
                value={objBoxSize}
                onInput={(e) => setObjBoxSize(e.target.value)}
              />
            </label>
          </div>
          <div className={s.room}>
            <div
              className={s.room15}
              style={{ width: `${4.5 * size}px`, height: `${6 * size}px` }}
            ></div>
            <div
              className={s.parts}
              style={{
                width: `${6 * objBoxSize}px`,
                height: `${6 * objBoxSize}px`,
              }}
            >
              {filtredMonster.map((item, index) => (
                <Draggable
                  key={index}
                  nodeRef={nodeRef}
                  // bounds=""
                  axis="both"
                  // onDrag={(e) => dragDrag(e, item.id)}
                  onStart={(e) => startDrag(e)}
                  onStop={(e, data) => stopDrag(e, data, item.id)}
                  position={item.position}
                >
                  <div ref={nodeRef}>
                    <img
                      style={{
                        width: `${0.6 * objSize}px`,
                        height: `${0.8 * objSize}px`,
                      }}
                      src={item.url}
                      alt=""
                      className={s.room__body}
                    />
                    <button className={s.btn} onClick={() => toggle(item.id)}>
                      &times;
                    </button>
                  </div>
                </Draggable>
              ))}
            </div>
          </div>
          <button
            className={s.show__btn}
            type="button"
            onClick={() => isReturn()}
          >
            Назад
          </button>
        </>
      )}
    </>
  );
};
