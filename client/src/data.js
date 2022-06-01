import { v4 as uuidv4 } from "uuid";

export const mainPage = [
  {
    title: "о платформе",
    href: "/platform",
    alt: "smile",
  },
  { title: "регистрация", href: "/signin", alt: "pen" },
  { title: "войти", href: "/login", alt: "enter" },
  { title: "контакты", href: "/contacts", alt: "contacts" },
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

export const navGames = [
  { title: "Кабинет учителя", href: "/teacher" },
  { title: "Монстер", href: "/monster" },
  { title: "Карточки", href: "/cards" },
  { title: "Комнаты", href: "/room" },
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
