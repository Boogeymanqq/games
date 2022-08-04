import express from "express";
import StudentsGroup from "../models/StudentsGroup.js";
import auth from "../middleware/auth.middleware.js";
import Student from "../models/Student.js";

const groupsRouter = express.Router();

// api/groups
groupsRouter.post("/", auth, async (req, res) => {
  try {
    const [group] = req.body;

    const newGroup = new StudentsGroup({
      groupName: group.name,
      students: group.students,
      teacher: req.user.userId,
    });

    await newGroup.save();
    res.status(201).json({
      message: "Группа успешно создана.",
      type: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: "Что-то пошло не так, попробуйте снова.",
      type: "error",
    });
  }
});

// api/groups
groupsRouter.get("/", auth, async (req, res) => {
  try {
    const groups = await StudentsGroup.find({ teacher: req.user.userId });
    console.log("#groups", groups);

    let $res = [];

    for (let key of groups) {
      let firstName = "";
      let lastName = "";
      let studentsArr = [];
      let studentsInGroups = [];

      if (key.students) {
        studentsArr = [...key.students];
        const studentsFromGroup = await Student.find({
          _id: {
            $in: studentsArr,
          },
        });
        studentsFromGroup.forEach((e) => {
          firstName = e.firstName;
          lastName = e.lastName;
          studentsInGroups.push({ firstName, lastName });
        });
      }
      $res.push({ groups: key, studentsInGroups });
    }

    if (!groups) {
      return res.status(400).json({
        message: "Групп не найдено.",
        type: "error",
      });
    }

    res.status(200).json({
      $res,
      type: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: "Что-то пошло не так, попробуйте снова.",
      type: "error",
    });
  }
});

// /api/groups
groupsRouter.put("/", auth, async (req, res) => {
  try {
    const {groupId, params} = req.body;
    console.log(req.body);

    const group = await StudentsGroup.findOne({_id: groupId});
    
    if (!group) {
      return res.status(400).json({
        message: "Такой группы нет, попробуйте снова...",
        type: "error",
      });
    }
    await StudentsGroup.updateOne(group, {$set: params});
    res.status(200).json({
      message: "Данные группы обновлены успешно.",
      type: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: "Что-то пошло не так, попробуйте снова",
      type: "error",
    });
  }
});

// api/groups
groupsRouter.delete("/", auth, async (req, res) => {
  try {
    const [groupId] = req.body;
    const group = await StudentsGroup.findOne(groupId);
    if (!group) {
      return res.status(400).json({
        message: "Такой группы нет, попробуйте снова.",
        type: "error",
      });
    }
    await StudentsGroup.deleteOne(group);
    res.status(200).json({
      message: "Группа успешно удалена",
      type: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: "Что-то пошло не так, попробуйте снова",
      type: "error",
    });
  }
});

export default groupsRouter;
