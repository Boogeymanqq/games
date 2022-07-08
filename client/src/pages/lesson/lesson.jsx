import React, { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import { v4 as uuidv4 } from "uuid";
import { Header } from "../../layouts/header";
import { Pagelogo } from "../../ui/pageLogo/pageLogo";
import { Burger } from "../../ui/burger/burger";
import { Main } from "../../layouts/main";
import { Box, CircularProgress } from "@mui/material";
import scores from "./img/icon-star.svg";
import size from "./img/icon-size.svg";
import help from "./img/icon-help.svg";
import screen from "./img/icon-screen.svg";
import rules from "./img/icon-info.svg";
import change from "./img/icon-change.svg";
import user from "./img/icon-active-user.svg";
import s from "./lesson.module.css";

export const Lesson = ({
  caption,
  users,
  log,
  messages,
  sendMessage,
  removeMessage,
  sendSelect,
}) => {
  const [cardNewMonster, setCardNewMonster] = useState([]);
  const [secondMonster, setSecondMonster] = useState([]);

  const [objSize, setObjSize] = useState(100);

  const [showFolder, setShowFolder] = useState(true);
  const [showApi, setShowApi] = useState(false);

  const [selectMonster, setSelectMonster] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const sendCoordinate = {
    messageId: uuidv4(),
    userId: JSON.parse(localStorage.getItem("userId")),
    userName: JSON.parse(localStorage.getItem("login")),
    roomId: JSON.parse(localStorage.getItem("room")),
  };
  sendCoordinate.messageType = "text";
  sendCoordinate.subjectArr = selectMonster;

  const nodeRef = useRef(null);

  useEffect(() => {
    const messageForUsers = messages !== null ? messages : null;
    setSelectMonster(messageForUsers);
    console.log(selectMonster);
  }, [messages]);

  useEffect(() => {
    async function getMonster() {
      const url = "http://localhost:3000/api/monster/dir/monsterparts";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      const data = await response.json();
      setCardNewMonster(data);
      setIsLoading(false);
    }
    getMonster();
  }, []);

  function startDrag(e) {
    e.preventDefault();
  }

  function stopDrag(e, data, id) {
    e.preventDefault();
    setSelectMonster(
      selectMonster.map((item) => {
        if (item._id === id) {
          item.position = { x: data.x, y: data.y };
        }
        return item;
      })
    );
    console.log(selectMonster);
    sendMessage(sendCoordinate);
  }

  function toggle(id) {
    setSelectMonster(
      selectMonster.map((item) => {
        if (item._id === id) {
          item.position = { x: 0, y: 0 };
        }
        return item;
      })
    );
    sendMessage(sendCoordinate);
  }

  function changeHandler(id) {
    setCardNewMonster(
      cardNewMonster.map((elem) => {
        if (elem._id === id) {
          setShowFolder(false);
          setSecondMonster(elem.img);
        }
        return elem;
      })
    );
  }

  function onChange(id) {
    setSecondMonster(
      secondMonster.map((elem) => {
        if (elem._id === id) {
          elem.isChecked = !elem.isChecked;
          if (elem.isChecked) {
            setSelectMonster([...selectMonster, elem]);
            sendSelect([...selectMonster, elem]);
          } else {
            sendSelect(selectMonster.filter((item) => item._id !== id));
            setSelectMonster(selectMonster.filter((item) => item._id !== id));
          }
        }
        return elem;
      })
    );
  }

  return (
    <>
      <Header className={s.header}>
        <Pagelogo />
        <h2>{caption}</h2>
        <Burger />
      </Header>
      <Main className={s.main}>
        <div className={s.playground}>
          <div className={s.users__online}>
            <div className={s.user}>
              <div>
                <img src={user} alt="user" width="18" height="18" />
              </div>
              <p>Маша</p>
            </div>
            <div className={s.user}>
              <div>
                <img src={user} alt="user" width="18" height="18" />
              </div>
              <p>Ваня</p>
            </div>
          </div>
          {showApi ? (
            isLoading ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "600px",
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <>
                {showFolder === true ? (
                  <div className={s.show}>
                    {cardNewMonster.map((elem) => (
                      <div
                        onClick={() => changeHandler(elem._id)}
                        className={s.monster__folder}
                        key={elem._id}
                      >
                        {elem.dir}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={s.show}>
                    {secondMonster.map((elem) => (
                      <div className={s.show__items} key={elem._id}>
                        <img
                          style={
                            elem.url.includes("body")
                              ? {
                                  width: `${0.6 * objSize}px`,
                                  height: `${1.5 * objSize}px`,
                                }
                              : {
                                  width: `${0.6 * objSize}px`,
                                  height: `${0.8 * objSize}px`,
                                }
                          }
                          src={elem.url}
                          alt=""
                        />
                        <input
                          type="checkbox"
                          onChange={() => onChange(elem._id)}
                        />
                      </div>
                    ))}
                    <button
                      className={s.show__btn}
                      onClick={() => setShowFolder(true)}
                    >
                      Назад
                    </button>
                  </div>
                )}
              </>
            )
          ) : (
            <div className={s.playfields}>
              <div className={s.frames}>
                <div className={s.frame__top}></div>
                <div className={s.frame__bottom}></div>
              </div>
              <div className={s.subject__toys}>
                {selectMonster.map((item) => (
                  <Draggable
                    key={item._id}
                    nodeRef={nodeRef}
                    // bounds="parent"
                    axis="both"
                    // onDrag={(e) => dragDrag(e, item.id)}
                    onStart={(e) => startDrag(e)}
                    onStop={(e, data) => {
                      stopDrag(e, data, item._id);
                    }}
                    position={item.position}
                  >
                    <div
                      style={
                        item.url.includes("body")
                          ? {
                              width: `${1 * objSize}px`,
                              height: `${1.7 * objSize}px`,
                            }
                          : {
                              width: `${1 * objSize}px`,
                              height: `${1 * objSize}px`,
                            }
                      }
                      className={s.box__toys}
                      ref={nodeRef}
                    >
                      <img
                        style={
                          item.url.includes("body")
                            ? {
                                width: `${0.6 * objSize}px`,
                                height: `${1.5 * objSize}px`,
                              }
                            : {
                                width: `${0.6 * objSize}px`,
                                height: `${0.8 * objSize}px`,
                              }
                        }
                        src={item.url}
                        alt=""
                        className={s.subject}
                      />
                      <button
                        className={s.btn}
                        onClick={() => toggle(item._id)}
                      >
                        &times;
                      </button>
                    </div>
                  </Draggable>
                ))}
              </div>
            </div>
          )}
          <div className={s.panel__controls}>
            <ul className={s.list}>
              <li>
                <img src={scores} alt="scores" width="18" height="18" />
                <a href="#">Баллы</a>
              </li>
              <li>
                <img src={size} alt="size" width="18" height="18" />
                <a href="#">Размер</a>
              </li>
              <li>
                <img src={help} alt="help" width="18" height="18" />
                <a href="#">Подсказки</a>
              </li>
              <li>
                <img src={screen} alt="screen" width="18" height="18" />
                <a href="#">Экран ученика</a>
              </li>
              <li>
                <img src={rules} alt="rules" width="18" height="18" />
                <a href="#">Как играть</a>
              </li>
              <li>
                <img src={change} alt="change" width="18" height="18" />
                {/* <a href="#">Изменить</a> */}
                <button onClick={() => setShowApi(!showApi)}>Изменить</button>
              </li>
            </ul>
          </div>
        </div>
      </Main>
    </>
  );
};
