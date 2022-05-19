## scripts:

### run app in production mode
>*npm run start*

### run server only
>*npm run server*

### run client only
>*npm run client*

### install dependecies on client
>*npm run client:install*

### build client
>*npm run client:build*

### run app on client and server in development mode
>*npm run dev*

## API:

### create new teacher

> */api/auth/register/teacher*

*example request*

`const data = {
  "lastName": lastName: String,
  "firstName": firstName: String,
  "patronymic": patronymic: String,
  "email": email: String,
  "phone": phone: String,
  "login": login: String,
  "password": password: String
}`

*example response*

`status: 201 - { message: "Учитель успешно зарегистрирован", type: "success" }`

`status: 500 - { message: "Что-то пошло не так, попробуйте снова", type: "error" }`

### create new student

> */api/auth/register/student*

*example request*

`const data = {
  "lastName": lastName: String,
  "firstName": firstName: String,
  "login": login: String,
  "password": password: String
}`

*example response*

`status: 201 - { message: "Ученик успешно зарегистрирован", type: "success" }`

`status: 500 - { message: "Что-то пошло не так, попробуйте снова", type: "error" }`

### authenticate user like teacher or student

> */api/auth/login*

*example request*

`const data = {
  "login": login: String,
  "password": password: String
}`

*example response*

`status: 200 - { token, userId, message: "Добро пожаловать", type: "success", role }`

`status: 400 - { message: "Пользователь не найден", type: "error" }`

`status: 400 - { message: "Неверный пароль, попробуйте снова", type: "error" }`

`status: 500 - { message: "Что-то пошло не так, попробуйте снова", type: "error" }`

### get all students by teacher
> */api/auth/students*

*example response*

`status: 200 - [{ student }]`

`status: 500 - { message: "Что-то пошло не так, попробуйте снова", type: "error" }`

### get monsterparts from database
> *api/monster/monsterparts*

*example response*
`status: 201 - [{ monsterparts }]`

`status: 500 - { message: "Что-то пошло не так, попробуйте снова", type: "error" }`

### create game template
> *api/monster/templates(post)*

*example request*

`const data = {
  "components": [{Monsterparts}],
}`

*example response*
`status: 201 - [{ Шаблон игры успешно создан }]`

`status: 500 - { message: "Что-то пошло не так, попробуйте снова", type: "error" }`

### get game templates
> *api/monster/templates(get)*

*example response*
`status: 200 - [{ templates }]`

`status: 500 - { message: "Что-то пошло не так, попробуйте снова", type: "error" }`