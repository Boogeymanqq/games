import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";
import Teacher from "../models/Teacher.js";
import Student from "../models/Student.js";
import auth from "../middleware/auth.middleware.js";
import { check, validationResult } from "express-validator";
import getTeacherId from "../query/getTeacherId.js";

const authRouter = express.Router();

// /api/auth/register/teacher
authRouter.post(
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

      const { lastName, firstName, patronymic = "", email, phone, login, password } =
        req.body;

      const candidate = await Teacher.findOne({ email } || { login });

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

// /api/auth/register/student
authRouter.post(
  "/register/student",
  [
    check("password", "Минимальная длина пароля 4 символов").isLength({
      min: 4,
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

      const { lastName, firstName, login, password, comment = "" } = req.body;

      const hashedPassword = await bcrypt.hash(password, 12);
      const student = new Student({
        lastName,
        firstName,
        login,
        password: hashedPassword,
        openPas: password,
        comment,
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

// /api/auth/delete/student
authRouter.delete("/delete/student", auth, async (req, res) => {
  try {
    const {studentId} = req.body;
    const student = await Student.findOne({ _id: studentId});
    console.log(student);

    if (!student) {
      return res.status(400).json({
        message: "Такого ученика нет, попробуйте снова...",
        type: "error",
      });
    }
    await Student.deleteOne(student);
    res.status(200).json({
      message: "Ученик удалён",
      type: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: "Что-то пошло не так, попробуйте снова",
      type: "error",
    });
  }
});

// /api/auth/update/student
authRouter.put("/update/student", auth, async (req, res) => {
  try {
    const {studentId, params} = req.body;
    console.log(req.body);

    const student = await Student.findOne({_id: studentId});
    console.log(student);
    if (!student) {
      return res.status(400).json({
        message: "Такого ученика нет, попробуйте снова...",
        type: "error",
      });
    }
    await Student.updateOne(student, {$set: params});
    res.status(200).json({
      message: "Данные ученика обновлены успешно.",
      type: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: "Что-то пошло не так, попробуйте снова",
      type: "error",
    });
  }
});

// /api/auth/login
authRouter.post(
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

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: "3h",
      });

      // получение айди учителя по айди ученика
      const teacherId = await getTeacherId(user.id);

      res.json({
        token,
        userId: user.id,
        message: "Добро пожаловать",
        type: "success",
        role: user.students ? "teacher" : "student",
        teacherId,
        userName: `${user.lastName} ${user.firstName}`,
      });
    } catch (error) {
      res.status(500).json({
        message: "Что-то полшо не так, попробуйте снова",
        type: "error",
      });
    }
  }
);

// /api/auth/students
authRouter.get("/students", auth, async (req, res) => {
  try {
    const students = await Student.find({ teacher: req.user.userId });
    res.json(students);
  } catch (e) {
    res.status(500).json({ message: "Что-то полшо не так, попробуйте снова" });
  }
});

export default authRouter;
