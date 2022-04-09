import React, { useState } from "react";
import Draggable from "react-draggable";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { monster } from "../../data";
import s from "./monster.module.css";

export const Monster = () => {
  const nodeRef = React.useRef(null);
  const [size, setSize] = React.useState(100);
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
              item.completed = !item.completed;
            }
            return item;
          })
        )
      )
    );
  }

  return (
    <>
      <Link to="/home">
        <Button outline color="warning">
          Home
        </Button>
      </Link>
      <div className="container">
        <h2 className={s.title}>Make a Monster</h2>
        <input
          type="range"
          value={size}
          onInput={(e) => setSize(e.target.value)}
        />
        <p>{size}</p>
        <div className={s.monster}>
          <div
            className={s.frame}
            style={{ width: `${4.5 * size}px`, height: `${6 * size}px` }}
          ></div>
          <div
            className={s.parts}
            style={{ width: `${8 * size}px`, height: `${6 * size}px` }}
          >
            {cardMonster.map((elem) =>
              Object.values(elem).map((item) =>
                item.map((el) => (
                  <Draggable
                    axis="both"
                    bounds="body"
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
                          width: `${0.6 * size}px`,
                          height: `${0.8 * size}px`,
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
