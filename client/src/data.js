import { v4 as uuidv4 } from "uuid";

export const classes = {
  tool: {
    fontSize: "20px",
    background: "#fff",
    "&  .MuiFormHelperText-root": {
      backgroundColor: "#ff9e4f",
      margin: 0,
      paddingLeft: "10px",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderRadius: 0,
    },
    "& .css-3v5nb6-MuiFormLabel-root-MuiInputLabel-root": {
      top: "-5px",
    },
    "& .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root": {
      top: "-5px",
    },
  },
};

export const mainPage = [
  {
    title: "о платформе",
    href: "platform",
    alt: "smile",
  },
  { title: "регистрация", href: "signin", alt: "pen" },
  { title: "войти", href: "login", alt: "enter" },
  { title: "контакты", href: "contacts", alt: "contacts" },
];

export const navGames = [
  { title: "Кабинет учителя", href: "/teacher" },
  { title: "Монстер", href: "/monster" },
  { title: "Карточки", href: "/cards" },
  { title: "Комнаты", href: "/room" },
];

export const navRoom = [
  { title: "Стикер", type: "submit", route: "/teacherroom/stickers" },
  { title: "Студенты", type: "submit", route: "/teacherroom/students" },
  { title: "Покупки", type: "submit", route: "/teacherroom/purshases" },
  { title: "Урок", type: "submit", route: "/teacherroom/lesson" },
];

export const teacherStudentsNav = [
  { title: "Студенты", type: "submit", route: "/teacherroom/students" },
  { title: "Регистрация", type: "submit", route: "/teacherroom/sign" },
  { title: "Назад", type: "submit", route: "/teacherroom" },
];

export const teacherPage = [
  { title: "Личный Кабинет", href: "/teacher" },
  { title: "Ученики", href: "/teacher/studentlist" },
  { title: "План", href: "/teacher" },
  { title: "Урок", href: "/teacher" },
  { title: "Игры", href: "/teacher/games" },
  { title: "План Урока", href: "/teacher" },
  { title: "Выйти", href: "/login" },
];

export const rooms = [
  {
    id: uuidv4(),
    url: "/img/room/armchair/armchair.gif",
    position: { x: 0, y: 0 },
    checked: false,
  },
  {
    id: uuidv4(),
    url: "/img/room/armchair/armchair-2.gif",
    position: { x: 0, y: 0 },
    checked: false,
  },
  {
    id: uuidv4(),
    url: "/img/room/bed/bed-flat-2.gif",
    position: { x: 0, y: 0 },
    checked: false,
  },
  {
    id: uuidv4(),
    url: "/img/room/bookcase/bookcase-flat-2.gif",
    position: { x: 0, y: 0 },
    checked: false,
  },
  {
    id: uuidv4(),
    url: "/img/room/bookcase/bookcase-3.gif",
    position: { x: 0, y: 0 },
    checked: false,
  },
  {
    id: uuidv4(),
    url: "/img/room/chair/chair-2.gif",
    position: { x: 0, y: 0 },
    checked: false,
  },
  {
    id: uuidv4(),
    url: "/img/room/chair/chair-3.gif",
    position: { x: 0, y: 0 },
    checked: false,
  },
  {
    id: uuidv4(),
    url: "/img/room/chair/chair-flat2.gif",
    position: { x: 0, y: 0 },
    checked: false,
  },
  {
    id: uuidv4(),
    url: "/img/room/chair/chair-flat3.gif",
    position: { x: 0, y: 0 },
    checked: false,
  },
];
