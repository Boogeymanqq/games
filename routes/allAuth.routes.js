const { Router } = require("express");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const auth = require("../middleware/auth.middleware");
const router = Router();

// /api/auth/register
router.post(
  "/register/teacher",
  [
    check("email", "Некорректный email").isEmail(),
    check("password", "Минимальная длина пароля 6 символов").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }

      const { lastName, firstName, patronymic, email, phone, login, password } =
        req.body;

      const candidate = await Teacher.findOne({ email } || { login }); // ???

      if (candidate) {
        return res.status(400).json({
          message: "Такой учитель уже существует",
          type: "error",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const teacher = new Teacher({
        lastName,
        firstName,
        patronymic,
        email,
        phone,
        login,
        password: hashedPassword,
      });

      await teacher.save();

      res
        .status(201)
        .json({ message: "Учитель успешно зарегистрирован", type: "success" });
    } catch (error) {
      res.status(500).json({
        message: "Что-то пошло не так, попробуйте снова",
        type: "error",
      });
    }
  }
);

// /api/auth/register
router.post(
  "register/student",
  [
    check("password", "Минимальная длина пароля 6 символов").isLength({
      min: 6,
    }),
  ],
  auth,
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }

      const { lastName, firstName, login, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 12);
      const student = new Student({
        lastName,
        firstName,
        login,
        password: hashedPassword,
        teacher: req.user.userId,
      });

      await student.save();

      res
        .status(201)
        .json({ message: "Ученик успешно зарегистрирован", type: "success" });
    } catch (error) {
      res.status(500).json({
        message: "Что-то пошло не так, попробуйте снова",
        type: "error",
      });
    }
  }
);

// /api/auth/login
router.post(
  "/login",
  [
    check("login", "Введите корректный логин").exists(),
    check("password", "Введите пароль").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некорректные данные при входе в систему",
          type: "error",
        });
      }

      const { login, password } = req.body;

      const user =
        (await Teacher.findOne({ login })) ||
        (await Student.findOne({ login }));

      if (!user) {
        return res
          .status(400)
          .json({ message: "Пользователь не найден", type: "error" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          message: "Неверный пароль, попробуйте снова",
          type: "error",
        });
      }

      const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
        expiresIn: "1h",
      });

      res.json({
        token,
        userId: user.id,
        message: "Добро пожаловать",
        type: "success",
        role: user.students ? "teacher" : "student",
      });
    } catch (error) {
      res.status(500).json({
        message: "Что-то полшо не так, попробуйте снова",
        type: "error",
      });
    }
  }
);

// /api/auth
router.get("/students", auth, async (req, res) => {
  try {
    const students = await Student.find({ teacher: req.user.iserId });
    res.json(students);
  } catch (e) {
    res.status(500).json({ message: "Что-то полшо не так, попробуйте снова" });
  }
});

module.exports = router;
