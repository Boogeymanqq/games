export const $HOST =
  process.env.REACT_APP_HOST === "production"
    ? "http://89.223.125.193"
    : "http://localhost:3000";

// API - регистрация преподавателя
export const REGISTER_TEACHER = "/api/auth/register/teacher";

// API - авторизация пользователя(учитель, ученик)
export const LOGIN_USER = "/api/auth/login";

// API - добавление(регистрация) студента
export const REGISTER_STUDENT = "/api/auth/register/student";

// API - получение списка студентов
export const GET_STUDENTS = "/api/auth/students";

// API - удаление студента
export const DELETE_STUDENT = "/api/auth/delete/student";

// API - редактирование (обновление) данных студента
export const UPDATE_STUDENT = "/api/auth/update/student";

// API - работа с группами
// создание группы method: "POST"
// получение списка групп method: "GET"
// удаление группы method: "DELETE"
// редактирование группы method: "PUT"

export const GROUPS = "/api/groups";

// API for Make a monster game

// API - получение предметов для составления монстра, method: "GET"

export const GET_MONSTERPARTS = "/api/monster/monsterparts";

// API - получение папок с частями монстров
export const GET_MONSTERPARTS_FOLDERS = "/api/monster/dir/monsterparts";

// API - работа с шаблонами игр
// создание шаблона method: "POST"
// получение шаблонов игр method: "GET"
// удаление шаблонов method: "DELETE"
// обновление шаблонов method: "PUT"
export const MONSTER_TEMPLATE = "/api/monster/templates";
