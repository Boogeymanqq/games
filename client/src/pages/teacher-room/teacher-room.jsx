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
import s from "./teacher-room.module.css";

export const Teacherroom = ({ caption }) => {
  const [panel, setPanel] = React.useState(true);

  const changePanel = () => setPanel(!panel);
  const id = 1;
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
            <div onClick={changePanel} key="1">
              {panel ? (
                <Panelitem
                  caption="Small Talk"
                  icon={arrowRight}
                  alt="arrow"
                  width="30"
                  height="25"
                />
              ) : (
                <Panelinfo
                  caption="Small Talk"
                  title="Book 1"
                  icon={arroWhite}
                  alt="arrow"
                  width="25"
                  height="30"
                >
                  <Panellist
                    number="1"
                    text="Text text text text Text text text text Text text text text"
                  />
                  <Panellist
                    number="2"
                    text="Text text text text Text text text text Text text text text"
                  />
                </Panelinfo>
              )}
            </div>
            {/* <div>
              {panel ? (
                <Panelitem
                  caption="Small Talk"
                  icon={arrowRight}
                  alt="arrow"
                  width="30"
                  height="25"
                />
              ) : (
                <Panelinfo
                  caption="Small Talk"
                  title="Book 2"
                  icon={arroWhite}
                  alt="arrow"
                  width="25"
                  height="30"
                >
                  <Panellist
                    number="1"
                    text="Text text text text Text text text text Text text text text"
                  />
                  <Panellist
                    number="2"
                    text="Text text text text Text text text text Text text text text"
                  />
                </Panelinfo>
              )}
            </div> */}
          </Panel>
          <Panel caption="Свой план" background="#B5FF9A"></Panel>
        </div>
      </Main>
    </>
  );
};
