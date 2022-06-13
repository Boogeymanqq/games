import React, { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";
import { io } from "socket.io-client";
import { navGames } from "../../data";
import { NavigationGames } from "../navigationGames/navigationGames";
import s from "./monster.module.css";

var socket = io("http://localhost:5000/");
socket.on("chat message", (msg) => {
  // console.log("i am monster " + msg);
});
// console.log(socket);
const monsterLink = "Монстер";
const newNavGame = navGames.filter((elem) => elem.title !== monsterLink);

export const Monster = () => {
  const [cardNewMonster, setCardNewMonster] = useState([]);
  const [secondMonster, setSecondMonster] = useState([]);
  const [cardMonster, setCardMonster] = useState([]);

  // const [template, setTemplate] = useState([]);
  const [nameTemplate, setNameTemplate] = useState("");

  const [showFolder, setShowFolder] = useState(true);
  const [showApi, setShowApi] = useState(false);

  const [size, setSize] = useState(100);
  const [objSize, setObjSize] = useState(100);
  const [objBoxSize, setObjBoxSize] = useState(100);

  const nodeRef = useRef(null);

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
  }, []);

  const filtredMonster = secondMonster.filter((elem) =>
    elem.isChecked === true ? cardMonster.push(elem) : null
  );
  const monstrik = [...new Set(cardMonster)];
  // console.log(monstrik);

  const saveTemplate = monstrik.map((elem) => elem._id);

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
    setCardMonster(
      monstrik.map((item) => {
        if (item._id === id) {
          item.position = { x: data.x, y: data.y };
        }
        return item;
      })
    );
  }

  function toggle(id) {
    setCardMonster(
      monstrik.map((item) => {
        if (item._id === id) {
          item.position = { x: 0, y: 0 };
        }
        return item;
      })
    );
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
          {monstrik.map((item, index) => (
            <Draggable
              key={index}
              nodeRef={nodeRef}
              // bounds="parent"
              axis="both"
              // onDrag={(e) => dragDrag(e, item.id)}
              onStart={(e) => startDrag(e)}
              onStop={(e, data) => {
                stopDrag(e, data, item._id);

                socket.emit("chat message", e.pageX + "upd" + e.pageY);
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
                      onChange={() => onChange(elem._id)}
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
