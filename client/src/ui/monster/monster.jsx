import React, { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";
import { v4 as uuidv4 } from "uuid";
import { navGames } from "../../data";
import { NavigationGames } from "../navigationGames/navigationGames";
import s from "./monster.module.css";

const monsterLink = "Монстер";
const newNavGame = navGames.filter((elem) => elem.title !== monsterLink);

export const Monster = ({
  users,
  log,
  messages,
  sendMessage,
  removeMessage,
}) => {
  const [cardNewMonster, setCardNewMonster] = useState([]);
  const [secondMonster, setSecondMonster] = useState([]);

  // const [template, setTemplate] = useState([]);
  const [nameTemplate, setNameTemplate] = useState("");

  const [showFolder, setShowFolder] = useState(true);
  const [showApi, setShowApi] = useState(false);

  const [size, setSize] = useState(100);
  const [objSize, setObjSize] = useState(100);
  const [objBoxSize, setObjBoxSize] = useState(100);

  const [selectMonster, setSelectMonster] = useState([]);

  const sendCoordinate = {
    messageId: uuidv4(),
    userId: JSON.parse(localStorage.getItem("userId")),
    userName: JSON.parse(localStorage.getItem("login")),
    roomId: JSON.parse(localStorage.getItem("room")),
  };

  // console.log(messageSubject[messageSubject.length - 1]);
  // console.log(selectMonster[selectMonster.length - 1]);
  // selectMonster.map((elem) => console.log(elem));

  sendCoordinate.messageType = "text";
  sendCoordinate.subjectArr = selectMonster;

  const nodeRef = useRef(null);

  useEffect(() => {
    const messageForUsers = messages !== null ? messages : null;
    // console.log(messageForUsers);

    // if (messageForUsers.length !== 0) {
    //   const selectSubjectArr = messageForUsers.filter((elem) =>
    //     elem !== undefined ? elem.subjectArr : null
    //   );
    //   console.log(selectSubjectArr);
    //   setSelectMonster(
    //     selectSubjectArr[selectSubjectArr.length - 1].subjectArr
    //   );
    // }
    setSelectMonster(messageForUsers);
    console.log(selectMonster);
  }, [messages]);
  // console.log(log, users);
  useEffect(() => {
    async function getMonster() {
      const url = "api/monster/dir/monsterparts";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      const data = await response.json();
      // console.log(data);
      setCardNewMonster(data);
    }
    getMonster();

    // console.log(selectSubjectArr[selectSubjectArr.length - 1].subjectArr);
  }, []);

  const saveTemplate = selectMonster.map((elem) => elem._id);

  function postTemplate() {
    const createSelectTemplate = [
      {
        templateName: nameTemplate,
        templateParts: saveTemplate,
      },
    ];
    // console.log(createSelectTemplate);
    async function postTemplates() {
      const url = "http://localhost:3000/api/monster/templates";
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(createSelectTemplate),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      setNameTemplate("");
      const data = await response.json();
      // console.log(data);
    }
    postTemplates();
  }

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

  function onChange(e, id) {
    setSecondMonster(
      secondMonster.map((elem) => {
        if (elem._id === id) {
          elem.isChecked = !elem.isChecked;
          setSelectMonster([...selectMonster, elem]);
          if (e.target.checked === false) {
            setSelectMonster(selectMonster.filter((item) => item._id !== id));
          }
        }
        return elem;
      })
    );
  }

  return (
    <>
      <NavigationGames newNavGame={newNavGame} />
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
      <div style={{ textAlign: "center" }}>
        <input
          type="text"
          value={nameTemplate}
          onChange={(e) => setNameTemplate(e.target.value)}
        />
        <button onClick={postTemplate}>Сохранить шаблон</button>
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
          {selectMonster.map((item, index) => (
            <Draggable
              key={index}
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
              <div ref={nodeRef}>
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
                  className={s.room__body}
                />
                <button className={s.btn} onClick={() => toggle(item._id)}>
                  &times;
                </button>
              </div>
            </Draggable>
          ))}
          <button onClick={() => setShowApi(!showApi)}>изменить</button>
        </div>
        {showApi && (
          <>
            {showFolder === true ? (
              <div
                className={s.show}
                style={{
                  gridColumn: "2 / 3",
                  width: "600px",
                  height: "600px",
                  border: "2px solid rgba(210, 18, 73, 0.9)",
                }}
              >
                {cardNewMonster.map((elem, index) => (
                  <div
                    onClick={() => changeHandler(elem._id)}
                    className={s.monster__folder}
                    key={index}
                  >
                    {elem.dir}
                  </div>
                ))}
                <button onClick={() => setShowApi(!showApi)}>закрыть</button>
              </div>
            ) : (
              <div className={s.show}>
                {secondMonster.map((elem, index) => (
                  <div key={index}>
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
                      onChange={(e) => onChange(e, elem._id)}
                    />
                  </div>
                ))}
                <button onClick={() => setShowFolder(true)}>Назад</button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};
