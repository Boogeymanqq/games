const { Router } = require("express");
const router = Router();
const MonsterPart = require("../models/MonsterPart");
const DirMonsterpart = require("../models/DirMonsterpart");
const GameTemplates = require("../models/GameTemplate");
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
router.get("/dir/monsterparts", auth, async (req, res) => {
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
    const component = new GameTemplates({
      game: "Monster",
      components: req.body,
      teacher: req.user.userId,
    });

    await component.save();

    res.status(201).json({
      message: "Шаблон игры успешно создан",
    });
  } catch (error) {
    res.status(500).json({
      message: "Что-то пошло не так, попробуйте снова.",
      type: "error",
    });
  }
});

// api/monster/templates
router.get("/templates", auth, async (req, res) => {
  try {
    const templates = await GameTemplates.find();

    res.status(200).json({ templates });
  } catch (error) {
    res.status(500).json({
      message: "Что-то пошло не так, попробуйте снова.",
      type: "error",
    });
  }
});

// api/monster/templates
router.delete("/templates", auth, async (req, res) => {
  try {
    const templateId = await GameTemplates.findOne(req.body[0]);
    if (!templateId) {
      return res.status(401).json({
        message: "Такого шаблона нет, попробуйте снова.",
        type: "error"
      })
    }

      await GameTemplates.deleteOne(req.body[0]);

    res.status(201).json({
      message: "Шаблон игры успешно удалён",
    });
  } catch (error) {
    res.status(500).json({
      message: "Что-то пошло не так, попробуйте снова.",
      type: "error",
    });
  }
});

module.exports = router;
