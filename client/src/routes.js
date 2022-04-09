import React from "react";
import { Routes, Route, Redirect } from "react-router-dom";
import { Main } from "./pages/main/main";
import { Home } from "./pages/home/home";
import { Login } from "./pages/login/login";
import { Platform } from "./pages/platform/platform";
import { Board } from "./pages/board/board";
import { Costs } from "./pages/costs/costs";
import { Contacts } from "./pages/contacts/contacts";
import { Signin } from "./pages/signin/signin";
import { Monster } from "./ui/monster/monster";
import { Cards } from "./ui/cards/cards";
import { Room } from "./ui/rooms/rooms";

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/home" element={<Home />} />
        <Route path="/platform" element={<Platform />} />
        <Route path="/board" element={<Board />} />
        <Route path="/costs" element={<Costs />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/login" element={<Login caption="Войти" />} />
        <Route
          path="/signin"
          element={<Signin caption="Зарегистрироваться" />}
        />
        <Route path="/monster" element={<Monster />} />
        <Route path="/cards" element={<Cards />} />
        <Route path="/room" element={<Room />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/signin" element={<Signin caption="Зарегистрироваться" />} />
    </Routes>
  );
};
