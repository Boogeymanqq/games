const { Router } = require("express");
const router = Router();
const MonsterPart = require("../models/MonsterPart");
const DirMonsterpart = require("../models/DirMonsterpart");
const { addTemplate } = require("../monster/templates");
const auth = require("../middleware/auth.middleware");

// api/monster/monsterparts
router.get("/monsterparts", auth, async (req, res) => {
  try {
    const monsterparts = await MonsterPart.find();
    res.status(201).json(monsterparts);
  } catch (error) {
    res.status(500).json({
      message: "Что-то полшо не так.",
    });
  }
});

// api/monster/dir/monsterparts
router.get("/dir/monsterparts", async (req, res) => {
  try {
    const monsterparts = await DirMonsterpart.find();
    res.status(200).json(monsterparts);
  } catch (error) {
    res.status(500).json({
      message: "Что-то пошло не так, попробуйте снова.",
    });
  }
});

// api/monster/templates
router.post("/templates", auth, async (req, res) => {
  try {
    const { components } = req.body;

    const component = addTemplate(req.user.userId, components);

    await component.save();

    res.status(201).json({
      message: "Шаблон игры успешно создан",
    });
  } catch (error) {
    res.status(500).json({
      message: "Что-то пошло не так, попробуйте снова.",
    });
  }
});

module.exports = router;
