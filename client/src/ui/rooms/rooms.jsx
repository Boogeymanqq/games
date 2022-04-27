import React, { useState, useRef } from "react";
import Draggable from "react-draggable";
import { Link } from "react-router-dom";
import { rooms } from "../../data";
import s from "./rooms.module.css";
import { navGames } from "../../data";
import style from "../navigation/navigation.module.css";
import { Navbar, Nav, NavItem } from "reactstrap";

const roomLink = "Комнаты";
const newNavGame = navGames.filter((elem) => elem.title !== roomLink);

export const Room = () => {
  const [cardRooms, setCardRooms] = useState(rooms);
  const [size, setSize] = useState(100);
  const [objSize, setObjSize] = useState(100);
  const [drag, setDrag] = useState(false);
  const [isShow, setIsShow] = useState(true);

  const [xPosition, setXPosition] = useState(null);
  const [yPosition, setYPosition] = useState(null);

  const nodeRef = useRef(null);

  function startDrag(e, id) {
    e.preventDefault();
    setCardRooms(
      filtredRoom.map((item) => {
        if (item.id === id) {
          // setXPosition(e.clientX);
          // setYPosition(e.clientY);

          item.completed = false;
          // item.defaultPos = { x: xPosition, y: yPosition };
          console.log(item.completed);
        }
        return item;
      })
    );
  }

  // function stopDrag(e) {
  //   setXPosition(e.clientX);
  //   setYPosition(e.clientY);
  //   console.log(e.clientX, e.clientY);
  // }

  // function clickClick(e, id) {
  //   setCardRooms(
  //     filtredRoom.map((item) => {
  //       if (item.id === id) {
  //         setXPosition(e.clientX);
  //         setYPosition(e.clientX);
  //         console.log(xPosition, yPosition);
  //       }
  //       return item;
  //     })
  //   );
  // }

  function toggle(e, id) {
    e.preventDefault();
    setCardRooms(
      filtredRoom.map((item) => {
        if (item.id === id) {
          item.completed = true;
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
    // setCardRooms(rooms.push(obj.File.name));
    console.log(cardRooms);
    const formData = new FormData();
    formData.append("file", files[0]);
    setDrag(false);
    console.log(files);
  }

  function dragLeaveHandler(e) {
    e.preventDefault();
    setDrag(false);
  }

  // console.log(localStorage.getItem("login") === "wqer@wsdsa.com");

  function onChange(id) {
    setCardRooms(
      cardRooms.map((elem) => {
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
    setCardRooms(
      rooms.map((elem) => {
        if (elem.checked === true) {
          elem.checked = false;
        }
        return elem;
      })
    );
  }

  const filtredRoom = cardRooms.filter((elem) => elem.checked === true);
  // console.log(filtredRoom);

  return (
    <>
      {isShow ? (
        <>
          <div className={s.show}>
            {cardRooms.map((elem) => (
              <div>
                <img
                  style={{ width: "150px", height: "150px" }}
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
          <h2>Make a Room</h2>
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
          <div className={s.room}>
            <div
              className={s.room15}
              style={{ width: `${9 * size}px`, height: `${6 * size}px` }}
            ></div>
            <div
              className={s.parts}
              style={{
                width: `${9 * objSize}px`,
                height: `${6 * objSize}px`,
              }}
            >
              {filtredRoom.map((item, index) => (
                <Draggable
                  key={index}
                  nodeRef={nodeRef}
                  // handle="#imhandle"
                  bounds=""
                  axis="both"
                  // onDrag={(e) => dragDrag(e, item.id)}
                  onStart={(e) => startDrag(e, item.id)}
                  // onStop={(e) => stopDrag(e, item.id)}
                  // defaultPosition={{ x: 0, y: 0 }}
                  position={item.completed ? item.defaultPos : null}
                >
                  <div ref={nodeRef}>
                    <img
                      // onClick={(e) => clickClick(e, item.id)}
                      style={{
                        width: `${1.5 * objSize}px`,
                        height: `${1.5 * objSize}px`,
                      }}
                      // id="imhandle"
                      src={item.url}
                      alt=""
                      className={s.room__body}
                    />
                    {localStorage.getItem("login") && (
                      <button
                        className={s.btn}
                        onClick={(e) => toggle(e, item.id)}
                      >
                        &times;
                      </button>
                    )}
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
