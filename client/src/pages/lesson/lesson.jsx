import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMonster,
  setObjMonsters,
  setShowFolder,
  setChangeTerminal,
} from "../../redux/slices/monsterSlice";
import useSocket from "../../hooks/useSocket";
import Draggable from "react-draggable";
import { v4 as uuidv4 } from "uuid";
import { getData, $HOST, GET_MONSTERPARTS_FOLDERS } from "../../api-info";
import { Header } from "../../layouts/header";
import { Pagelogo } from "../../ui/pageLogo/pageLogo";
import { Burger } from "../../ui/burger/burger";
import { Main } from "../../layouts/main";
import { Box, CircularProgress } from "@mui/material";
import { xl, lg, md, sm, xs } from "./monsterGameSize";
import { InputRange } from "../../ui/InputRange/InputRange";
import { LessonTool } from "../../ui/LessonTool/LessonTool";
import { StudentInGame } from "./components/StudentInGame";
import { ObjectInFolders } from "./components/ObjectInFolders";
import { FoldersMonster } from "./components/FoldersMonster";
import scores from "./img/icon-star.svg";
import size from "./img/icon-size.svg";
import help from "./img/icon-help.svg";
import screen from "./img/icon-screen.svg";
import rules from "./img/icon-info.svg";
import change from "./img/icon-change.svg";
import home from "./img/icon-home.svg";
import imageBorder from "./img/frame.png";
import exit from "./img/exit.svg";
import s from "./lesson.module.css";

export const Lesson = ({ caption, selectStudents }) => {
  const navigate = useNavigate();

  const {
    messages,
    sendMessage,
    sendSelect,
    connectGames,
    text,
    monsterSize,
    objSizeMonster,
    monsterBorderSize,
    borderSizeMonster,
  } = useSocket();

  const dispatch = useDispatch();
  const { monsters, status, objMonsters, showFolder, changeTerminal } =
    useSelector((state) => state.monsterSlice);

  const [cardNewMonster, setCardNewMonster] = useState([]);
  const [secondMonster, setSecondMonster] = useState([]);
  const [selectMonster, setSelectMonster] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isShowFolder, setIsShowFolder] = useState(true);

  const [sizeBorder, setSizeBorder] = useState(50);
  const [objSize, setObjSize] = useState(0.6);

  const [newIndex, setNewIndex] = useState(0);

  const [hovered, setHovered] = useState();
  const [rangePanel, setRangePanel] = useState(false);
  const userRole = JSON.parse(localStorage.getItem("role"));

  const sendCoordinate = {
    messageId: uuidv4(),
    userId: JSON.parse(localStorage.getItem("userId")),
    userName: JSON.parse(localStorage.getItem("login")),
    roomId: JSON.parse(localStorage.getItem("room")),
  };
  sendCoordinate.messageType = "text";
  sendCoordinate.subjectArr = selectMonster;

  const nodeRef = useRef(null);

  const arr = [];

  const arrBorder = () => {
    for (let i = 0; i < selectStudents.length; i++) {
      arr.push(
        <div key={i} className={s.frame__top}>
          <img
            style={{
              width: `${7.83 * sizeBorder}px`,
              height: `${5.5 * sizeBorder}px`,
            }}
            src={imageBorder}
            alt="border"
          />
        </div>
      );
    }
  };

  arrBorder();

  useEffect(() => {
    const messageForUsers = messages !== null ? messages : null;
    setSelectMonster(messageForUsers);

    const sizeM = objSizeMonster === undefined ? objSize : objSizeMonster;
    setObjSize(sizeM);

    const borderM =
      borderSizeMonster === undefined ? sizeBorder : borderSizeMonster;
    setSizeBorder(borderM);
  }, [messages, objSizeMonster, borderSizeMonster]);

  if (text === "exit") {
    userRole === "teacher" ? navigate("/teacherroom") : navigate("/student");
    // setSelectMonster();
    sendSelect([]);
  }

  useEffect(() => {
    async function getMonster() {
      const data = await getData($HOST, GET_MONSTERPARTS_FOLDERS, "GET");
      setCardNewMonster(data);
      setIsLoading(false);
    }
    getMonster();

    // dispatch(fetchMonster());
  }, []);

  // console.log("#monsters", monsters);

  function startDrag(e) {
    e.preventDefault();
  }

  function stopDrag(e, data, id) {
    e.preventDefault();
    setSelectMonster(
      selectMonster.map((item) => {
        setNewIndex(newIndex + 1);
        if (item._id === id) {
          item.position = { x: data.x, y: data.y };
          item.zIndexObj = newIndex;
        }
        return item;
      })
    );
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
          setIsShowFolder(false);
          setSecondMonster(elem.img.map((item) => ({ ...item, zIndexObj: 0 })));
        }
        return elem;
      })
    );
    // dispatch(setObjMonsters(id));
  }

  // console.log("objMonsters", objMonsters);
  // console.log("Monsters", monsters);

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

  // console.log(text);

  function endGame() {
    connectGames("exit");
    // setSelectMonster();
    // sendSelect();
  }

  return (
    <>
      <Header className={s.header}>
        <Pagelogo />
        <h2>{caption}</h2>
        <Burger />
      </Header>

      <Main className={s.main}>
        <div
          className={s.ranges__bar}
          style={
            !rangePanel ? { visibility: "hidden" } : { visibility: "visible" }
          }
        >
          <InputRange
            title={`???????????? ?????????? ${sizeBorder}`}
            step="10"
            min="10"
            max="100"
            value={sizeBorder}
            onInput={(e) => {
              setSizeBorder(e.target.value);
              monsterBorderSize(e.target.value);
            }}
          />

          <InputRange
            title={`???????????? ???????????????? ${objSize}`}
            step="0.2"
            min="0.2"
            max="1"
            value={objSize}
            onInput={(e) => {
              setObjSize(e.target.value);
              monsterSize(e.target.value);
            }}
          />
        </div>

        <div className={s.playground}>
          <div className={s.users__online}>
            {selectStudents.length > 0 ? (
              selectStudents.map((elem) => (
                <StudentInGame key={elem._id} firstName={elem.firstName} />
              ))
            ) : (
              <StudentInGame firstName="???????????? ???? ????????????" />
            )}
          </div>
          {changeTerminal ? (
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
            ) : isLoading === false ? (
              <>
                {isShowFolder === true ? (
                  <div className={s.show}>
                    {cardNewMonster.map((elem) => (
                      <FoldersMonster
                        key={elem._id}
                        onClick={() => changeHandler(elem._id)}
                        dir={elem.dir}
                      />
                    ))}
                  </div>
                ) : (
                  <div className={s.show}>
                    {secondMonster.map((elem) => (
                      <ObjectInFolders
                        key={elem._id}
                        src={elem.url}
                        onChange={() => onChange(elem._id)}
                      />
                    ))}
                    <button
                      className={s.show__btn}
                      onClick={() => setIsShowFolder(true)}
                      // onClick={() => dispatch(setShowFolder())}
                    >
                      ??????????
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p className={s.error}>????????????, ?????????????????? ??????????</p>
            )
          ) : (
            <div className={s.playfields}>
              <div className={s.frames}>{arr}</div>
              <div className={s.subject__toys}>
                {selectMonster.map((item, index) => (
                  <Draggable
                    key={item._id}
                    nodeRef={nodeRef}
                    // bounds="parent"
                    // offsetParent="HTMLElement"
                    axis="both"
                    // onDrag={(e) => dragDrag(e, item.id)}
                    onStart={(e) => startDrag(e)}
                    onStop={(e, data) => {
                      stopDrag(e, data, item._id);
                    }}
                    position={item.position}
                  >
                    <div
                      className={s.box__toys}
                      style={{ zIndex: item.zIndexObj }}
                      ref={nodeRef}
                      onMouseMove={() => setHovered(index)}
                      onMouseLeave={() => setHovered()}
                    >
                      <img
                        style={
                          item.size === "xl"
                            ? {
                                width: `${xl.width * objSize}px`,
                                height: `${xl.height * objSize}px`,
                              }
                            : item.size === "lg"
                            ? {
                                width: `${lg.width * objSize}px`,
                                height: `${lg.height * objSize}px`,
                              }
                            : item.size === "md"
                            ? {
                                width: `${md.width * objSize}px`,
                                height: `${md.height * objSize}px`,
                              }
                            : item.size === "sm"
                            ? {
                                width: `${sm.width * objSize}px`,
                                height: `${sm.height * objSize}px`,
                              }
                            : {
                                width: `${xs.width * objSize}px`,
                                height: `${xs.height * objSize}px`,
                              }
                        }
                        src={item.url}
                        alt=""
                        className={s.subject}
                      />
                      {userRole === "teacher" ? (
                        <button
                          className={s.btn__home}
                          style={
                            hovered === index
                              ? { visibility: "visible" }
                              : { visibility: "hidden" }
                          }
                          onClick={() => toggle(item._id)}
                        >
                          <img src={home} alt="" />
                        </button>
                      ) : (
                        <button
                          className={s.btn__home}
                          style={{ visibility: "hidden" }}
                        >
                          <img src={home} alt="" />
                        </button>
                      )}
                    </div>
                  </Draggable>
                ))}
              </div>
            </div>
          )}
          {userRole === "teacher" ? (
            <div className={s.toolsbar}>
              <ul className={s.list}>
                <LessonTool
                  src={scores}
                  width="18"
                  height="18"
                  caption="??????????"
                />
                <LessonTool
                  src={size}
                  width="18"
                  height="18"
                  caption="????????????"
                  onClick={() => setRangePanel(!rangePanel)}
                />
                <LessonTool
                  src={help}
                  width="18"
                  height="18"
                  caption="??????????????????"
                />
                <LessonTool
                  src={screen}
                  width="18"
                  height="18"
                  caption="?????????? ??????????????"
                />
                <LessonTool
                  src={rules}
                  width="18"
                  height="18"
                  caption="?????? ????????????"
                />
                <LessonTool
                  src={change}
                  width="18"
                  height="18"
                  caption="????????????????"
                  onClick={() => dispatch(setChangeTerminal())}
                />
                <LessonTool
                  src={exit}
                  width="18"
                  height="18"
                  caption="?????????????????? ????????"
                  onClick={() => endGame()}
                />
              </ul>
            </div>
          ) : null}
        </div>
      </Main>
    </>
  );
};
