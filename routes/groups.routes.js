const { Router } = require("express");
const router = Router();
const StudentsGroup = require("../models/StudentsGroup");
const auth = require("../middleware/auth.middleware");

// api/groups
router.post("/", auth, async (req, res) => {
  const [group] = req.body;

  const newGroup = new StudentsGroup({
    groupName: group.name,
    students: group.students,
    teacher: req.user.userId,
  });

  await newGroup.save();

  try {
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

module.exports = router;
