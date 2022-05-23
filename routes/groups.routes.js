const { Router } = require("express");
const router = Router();
const StudentsGroup = require("../models/StudentsGroup");
const auth = require("../middleware/auth.middleware");

// api/groups
router.post("/", auth, async (req, res) => {
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
router.get("/", auth, async (req, res) => {
  try {
    const groups = await StudentsGroup.find({ teacher: req.user.userId });
    if (!groups) {
      return res.status(400).json({
        message: "Групп не найдено.",
        type: "error",
      });
    }
    res.status(200).json({
      groups,
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
router.delete("/", auth, async (req, res) => {
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

module.exports = router;
