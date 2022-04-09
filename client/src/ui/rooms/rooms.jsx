import React, { useState } from "react";
import Draggable from "react-draggable";
import { Link } from "react-router-dom";
import { rooms } from "../../data";
import { Button } from "reactstrap";
import s from "./rooms.module.css";

export const Room = () => {
  const [cardRooms, setCardRooms] = useState(rooms);
  const [size, setSize] = React.useState(100);
  const [drag, setDrag] = useState(false);

  // const [position, setPosition] = useState({ x: 100, y: 100 });

  const nodeRef = React.useRef(null);

  function startDrag(e, id) {
    e.preventDefault();
    setCardRooms(
      cardRooms.map((item) => {
        if (item.id === id) {
          item.completed = false;
        }
        return item;
      })
    );
    // console.log(completed);
  }

  function stopDrag(e, completed) {
    e.preventDefault();
  }

  function toggle(id) {
    setCardRooms(
      cardRooms.map((item) => {
        if (item.id === id) {
          item.completed = !item.completed;
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

  return (
    <>
      <Link to="/home">
        <Button outline color="warning">
          Home
        </Button>
      </Link>
      <h2>Make a Room</h2>
      <input
        type="range"
        value={size}
        onInput={(e) => setSize(e.target.value)}
      />
      <div className={s.room}>
        <div
          draggable={true}
          className={s.room15}
          style={{ width: `${9 * size}px`, height: `${6 * size}px` }}
        ></div>
        <div
          className={s.parts}
          style={{ width: `${9 * size}px`, height: `${6 * size}px` }}
        >
          {cardRooms.map((item, index) => (
            <div key={index}>
              <Draggable
                nodeRef={nodeRef}
                // handle="#imhandle"
                // bounds="body"
                axis="both"
                onStart={(e) => startDrag(e, item.id)}
                onStop={(e) => stopDrag(e, item.completed)}
                // defaultPosition={{ x: 0, y: 0 }}
                position={item.completed === true ? item.defaultPos : null}
              >
                <div>
                  <img
                    style={{
                      width: `${1.5 * size}px`,
                      height: `${1.5 * size}px`,
                    }}
                    ref={nodeRef}
                    // id="imhandle"
                    draggable={true}
                    src={item.url}
                    alt=""
                    className={s.room__body}
                  />
                  <button className={s.btn} onClick={() => toggle(item.id)}>
                    &times;
                  </button>
                </div>
              </Draggable>
            </div>
          ))}
        </div>
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
      </div>
    </>
  );
};

// const [currentRoom, setCurrentRoom] = useState(null);
// const [currentItem, setCurrentItem] = useState(null);

// function dragOverHandler(e) {
//   e.preventDefault();
// }

// function dragLeaveHandler(e) {}

// function dragStartHandler(e, room, item) {
//   setCurrentRoom(room);
//   setCurrentItem(item);
// }

// function dragEndHandler(e) {}

// function dropHandler(e, room, item) {
//   e.preventDefault();
//   const currentIndex = currentRoom.items.indexOf(currentItem);
//   currentRoom.items.splice(currentIndex, 1);

//   const dropIndex = room.items.indexOf(item);
//   room.items.splice(dropIndex + 1, 0, currentItem);
//   setCardRooms(
//     room.map((b) => {
//       if (b.id === room.id) {
//         return room;
//       }
//       if (b.id === currentRoom.id) {
//         return currentRoom;
//       }
//       return b;
//     })
//   );
// }

// function dropCardHandler(e, room) {
//   room.items.push(currentItem);
//   const currentIndex = currentRoom.items.indexOf(currentItem);
//   currentRoom.items.splice(currentIndex, 1);
//   setCardRooms(
//     room.map((b) => {
//       if (b.id === room.id) {
//         return room;
//       }
//       if (b.id === currentRoom.id) {
//         return currentRoom;
//       }
//       return b;
//     })
//   );
// }

// return (
//   <div className={s.room}>
//     {cardRooms.map((room) => (
//       <div
//         onDragOver={(e) => dragOverHandler(e)}
//         onDrop={(e) => dropCardHandler(e, room)}
//         className={s.board}
//       >
//         <div>
//           {room.items.map((item) => (
//             <>
//               <img
//                 onDragOver={(e) => dragOverHandler(e)}
//                 onDragLeave={(e) => dragLeaveHandler(e)}
//                 onDragStart={(e) => dragStartHandler(e, room, item)}
//                 onDragEnd={(e) => dragEndHandler(e)}
//                 onDrop={(e) => dropHandler(e, room, item)}
//                 draggable={item.id === 1 ? false : true}
//                 src={item.url}
//                 alt=""
//               />
//               <button>&times;</button>
//             </>
//           ))}
//         </div>
//       </div>
//     ))}
//   </div>
// );
// };
