import React from "react";
import { Header } from "../../layouts/header";
import { Main } from "../../layouts/main";
import { Pagelogo } from "../../ui/pageLogo/pageLogo";
import { Navigationroom } from "../../components/navigation-room/navigation-room";
import { Panel } from "../../ui/panel/panel";
import { Panelitem } from "../../ui/panel/panel-item/panel-item";
import { Panelinfo } from "../../ui/panel/panel-info/panel-info";
import { Panellist } from "../../ui/panel/panel-list/panel-list";
import arrowRight from "../teacher-room/img/icon-black-arrow.svg";
import arroWhite from "../teacher-room/img/icon-white-arrow.svg";
import { teacherBookPanel } from "../../data";
import { teacherPlanPanel } from "../../data";
import s from "./teacher-room.module.css";

export const Teacherroom = ({ caption }) => {
  const [activeBooks, setActiveBooks] = React.useState([]);
  const [activePlans, setActivePlans] = React.useState([]);

  const changeBook = (id) => {
    activeBooks.includes(id)
      ? setActiveBooks(activeBooks.filter((activeID) => activeID !== id))
      : setActiveBooks([...activeBooks, id]);
  };

  const changePlan = (id) => {
    activePlans.includes(id)
      ? setActivePlans(activePlans.filter((activeID) => activeID !== id))
      : setActivePlans([...activePlans, id]);
  };

  return (
    <>
      <Header className={s.header}>
        <Pagelogo />
        <h2>{caption}</h2>
      </Header>
      <Navigationroom />
      <Main className={s.main}>
        <div className={s.panels}>
          <Panel caption="Пособия" background="#A7DFFF">
            {teacherBookPanel.map((elem, index) => (
              <div onClick={() => changeBook(elem.id)} key={index}>
                {!activeBooks.includes(elem.id) ? (
                  <Panelitem {...elem} icon={arrowRight} />
                ) : (
                  <Panelinfo {...elem} icon={arroWhite}>
                    {elem.panelList?.map((item, index) => (
                      <Panellist number={index + 1} text={item} key={index} />
                    ))}
                  </Panelinfo>
                )}
              </div>
            ))}
          </Panel>
          <Panel caption="Свой план" background="#B5FF9A">
            {teacherPlanPanel.map((elem, index) => (
              <div onClick={() => changePlan(elem.id)} key={index}>
                {!activePlans.includes(elem.id) ? (
                  <Panelitem {...elem} icon={arrowRight} />
                ) : (
                  <Panelinfo {...elem} icon={arroWhite}>
                    {elem.panelList?.map((item, index) => (
                      <Panellist number={index + 1} text={item} key={index} />
                    ))}
                  </Panelinfo>
                )}
              </div>
            ))}
          </Panel>
        </div>
      </Main>
    </>
  );
};
