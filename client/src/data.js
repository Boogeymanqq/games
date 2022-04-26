import { v4 as uuidv4 } from "uuid";

export const mainPage = [
  { title: "Платформа", href: "/platform" },
  { title: "Контакты", href: "/contacts" },
  { title: "Войти", href: "/login" },
  { title: "Зарегистрироваться", href: "/signin" },
];

export const teacherPage = [
  { title: "Личный Кабинет", href: "/teacher" },
  { title: "Ученики", href: "/teacher" },
  { title: "План", href: "/teacher" },
  { title: "Урок", href: "/teacher" },
  { title: "Игры", href: "/games" },
  { title: "План Урока", href: "/teacher" },
];

export const navGames = [
  { title: "Кабинет учителя", href: "/teacher" },
  { title: "Монстер", href: "/monster" },
  { title: "Карточки", href: "/cards" },
  { title: "Комнаты", href: "/room" },
];

export const monster = [
  {
    body: [
      {
        id: 1,
        url: "/img/monster/img/body/blue-body.gif",
        defaultPos: { x: 0, y: 0 },
        completed: true,
      },
      {
        id: 2,
        url: "/img/monster/img/body/body-yellow.gif",
        defaultPos: { x: 0, y: 0 },
        completed: true,
      },
    ],
  },
  {
    arms: [
      {
        id: 4,
        url: "/img/monster/img/arms/blue-arm-1.gif",
        defaultPos: { x: 0, y: 0 },
        completed: true,
      },
      {
        id: 5,
        url: "/img/monster/img/arms/blue-arm-2.gif",
        defaultPos: { x: 0, y: 0 },
        completed: true,
      },
      {
        id: 6,
        url: "/img/monster/img/arms/green-arm-1.gif",
        defaultPos: { x: 0, y: 0 },
        completed: true,
      },
      {
        id: 7,
        url: "/img/monster/img/arms/green-arm-2.gif",
        defaultPos: { x: 0, y: 0 },
        completed: true,
      },
    ],
  },
  {
    ears: [
      {
        id: 8,
        url: "/img/monster/img/ears/ear-pink-1.gif",
        defaultPos: { x: 0, y: 0 },
        completed: true,
      },
      {
        id: 9,
        url: "/img/monster/img/ears/ear-pink-2.gif",
        defaultPos: { x: 0, y: 0 },
        completed: true,
      },
    ],
  },
  {
    eyes: [
      {
        id: 10,
        url: "/img/monster/img/eyes/big-green-eyes.gif",
        defaultPos: { x: 0, y: 0 },
        completed: true,
      },
      {
        id: 11,
        url: "/img/monster/img/eyes/blue-eyes-3.gif",
        defaultPos: { x: 0, y: 0 },
        completed: true,
      },
    ],
  },
  {
    hairs: [
      {
        id: 12,
        url: "/img/monster/img/hair/green-hair-3.gif",
        defaultPos: { x: 0, y: 0 },
        completed: true,
      },
      {
        id: 13,
        url: "/img/monster/img/hair/pink-hair.gif",
        defaultPos: { x: 0, y: 0 },
        completed: true,
      },
    ],
  },
  {
    hat: [
      {
        id: 14,
        url: "/img/monster/img/hat/hat-1.gif",
        defaultPos: { x: 0, y: 0 },
        completed: true,
      },
      {
        id: 15,
        url: "/img/monster/img/hat/hat-2.gif",
        defaultPos: { x: 0, y: 0 },
        completed: true,
      },
    ],
  },
  {
    horn: [
      {
        id: 16,
        url: "/img/monster/img/horns/horn-7.gif",
        defaultPos: { x: 0, y: 0 },
        completed: true,
      },
      {
        id: 17,
        url: "/img/monster/img/horns/horn-8.gif",
        defaultPos: { x: 0, y: 0 },
        completed: true,
      },
      {
        id: 18,
        url: "/img/monster/img/horns/horn5.gif",
        defaultPos: { x: 0, y: 0 },
        completed: true,
      },
      {
        id: 19,
        url: "/img/monster/img/horns/horn6.gif",
        defaultPos: { x: 0, y: 0 },
        completed: true,
      },
    ],
  },
  {
    legs: [
      {
        id: 20,
        url: "/img/monster/img/legs/red-leg-1.gif",
        defaultPos: { x: 0, y: 0 },
        completed: true,
      },
      {
        id: 21,
        url: "/img/monster/img/legs/red-leg-2.gif",
        defaultPos: { x: 0, y: 0 },
        completed: true,
      },
      {
        id: 22,
        url: "/img/monster/img/legs/pink-leg-5.gif",
        defaultPos: { x: 0, y: 0 },
        completed: true,
      },
      {
        id: 23,
        url: "/img/monster/img/legs/pink-leg-6.gif",
        defaultPos: { x: 0, y: 0 },
        completed: true,
      },
    ],
  },
  {
    mouth: [
      {
        id: 24,
        url: "/img/monster/img/mouth/mouth-6.gif",
        defaultPos: { x: 0, y: 0 },
        completed: true,
      },
      {
        id: 25,
        url: "/img/monster/img/mouth/mouth-7.gif",
        defaultPos: { x: 0, y: 0 },
        completed: true,
      },
      {
        id: 26,
        url: "/img/monster/img/mouth/mouth-8.gif",
        defaultPos: { x: 0, y: 0 },
        completed: true,
      },
    ],
  },
  {
    nose: [
      {
        id: 27,
        url: "/img/monster/img/nose/nose-3.gif",
        defaultPos: { x: 0, y: 0 },
        completed: true,
      },
      {
        id: 28,
        url: "/img/monster/img/nose/nose-4.gif",
        defaultPos: { x: 0, y: 0 },
        completed: true,
      },
      {
        id: 29,
        url: "/img/monster/img/nose/nose-5.gif",
        defaultPos: { x: 0, y: 0 },
        completed: true,
      },
    ],
  },
  {
    tail: [
      {
        id: 30,
        url: "/img/monster/img/tail/tail.gif",
        defaultPos: { x: 0, y: 0 },
        completed: true,
      },
    ],
  },
  {
    wings: [
      {
        id: 31,
        url: "/img/monster/img/wings/wing-1.gif",
        defaultPos: { x: 0, y: 0 },
        completed: true,
      },
      {
        id: 32,
        url: "/img/monster/img/wings/wing-2.gif",
        defaultPos: { x: 0, y: 0 },
        completed: true,
      },
    ],
  },
];

export const rooms = [
  {
    id: uuidv4(),
    url: "/img/room/armchair/armchair.gif",
    defaultPos: { x: 0, y: 0 },
    completed: true,
    checked: false,
  },
  {
    id: uuidv4(),
    url: "/img/room/armchair/armchair-2.gif",
    defaultPos: { x: 0, y: 0 },
    completed: true,
    checked: false,
  },
  {
    id: uuidv4(),
    url: "/img/room/bed/bed-flat-2.gif",
    defaultPos: { x: 0, y: 0 },
    completed: true,
    checked: false,
  },
  {
    id: uuidv4(),
    url: "/img/room/bookcase/bookcase-flat-2.gif",
    defaultPos: { x: 0, y: 0 },
    completed: true,
    checked: false,
  },
  {
    id: uuidv4(),
    url: "/img/room/bookcase/bookcase-3.gif",
    defaultPos: { x: 0, y: 0 },
    completed: true,
    checked: false,
  },
  {
    id: uuidv4(),
    url: "/img/room/chair/chair-2.gif",
    defaultPos: { x: 0, y: 0 },
    completed: true,
    checked: false,
  },
  {
    id: uuidv4(),
    url: "/img/room/chair/chair-3.gif",
    defaultPos: { x: 0, y: 0 },
    completed: true,
    checked: false,
  },
  {
    id: uuidv4(),
    url: "/img/room/chair/chair-flat2.gif",
    defaultPos: { x: 0, y: 0 },
    completed: true,
    checked: false,
  },
  {
    id: uuidv4(),
    url: "/img/room/chair/chair-flat3.gif",
    defaultPos: { x: 0, y: 0 },
    completed: true,
    checked: false,
  },
];
