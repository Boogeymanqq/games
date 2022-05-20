## scripts:

### run app in production mode

> _npm run start_

### run server only

> _npm run server_

### run client only

> _npm run client_

### install dependecies on client

> _npm run client:install_

### build client

> _npm run client:build_

### run app on client and server in development mode

> _npm run dev_

## API:

### create new teacher

> _/api/auth/register/teacher_

_example request_

`const data = { "lastName": lastName: String, "firstName": firstName: String, "patronymic": patronymic: String, "email": email: String, "phone": phone: String, "login": login: String, "password": password: String }`

_example response_

`status: 201 - { message: "Учитель успешно зарегистрирован", type: "success" }`

`status: 500 - { message: "Что-то пошло не так, попробуйте снова", type: "error" }`

### create new student

> _/api/auth/register/student_

_example request_

`const data = { "lastName": lastName: String, "firstName": firstName: String, "login": login: String, "password": password: String }`

_example response_

`status: 201 - { message: "Ученик успешно зарегистрирован", type: "success" }`

`status: 500 - { message: "Что-то пошло не так, попробуйте снова", type: "error" }`

### authenticate user like teacher or student

> _/api/auth/login_

_example request_

`const data = { "login": login: String, "password": password: String }`

_example response_

`status: 200 - { token, userId, message: "Добро пожаловать", type: "success", role }`

`status: 400 - { message: "Пользователь не найден", type: "error" }`

`status: 400 - { message: "Неверный пароль, попробуйте снова", type: "error" }`

`status: 500 - { message: "Что-то пошло не так, попробуйте снова", type: "error" }`

### get all students by teacher

> _/api/auth/students_

_example response_

`status: 200 - [{ student }]`

`status: 500 - { message: "Что-то пошло не так, попробуйте снова", type: "error" }`

### get monsterparts from database

> _api/monster/monsterparts_

_example response_
`status: 201 - [{ monsterparts }]`

`status: 500 - { message: "Что-то пошло не так, попробуйте снова", type: "error" }`

### create game template

> _api/monster/templates(post)_

_example request_

`const data = [ { "_id": "627d0cbd4b851c82dce5426d" } ]`

_example response_
`status: 201 - [{ Шаблон игры успешно создан }]`

`status: 500 - { message: "Что-то пошло не так, попробуйте снова", type: "error" }`

### get game templates

> _api/monster/templates(get)_

_example response_
`status: 200 - [{ templates }]`

`status: 500 - { message: "Что-то пошло не так, попробуйте снова", type: "error" }`

### delete game template

> _api/monster/templates(delete)_

_example request_

`const data = [ { "_id": "628767466fa1ef9fb6aabe1f" } ]`

_example response_
`status: 201 - [{ Шаблон игры успешно удалён }]`
`status: 401 - [{ message: "Такого шаблона нет, попробуйте снова.", type: "error" }]`
`status: 500 - { message: "Что-то пошло не так, попробуйте снова", type: "error" }`
