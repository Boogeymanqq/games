const { Router } = require("express");
const router = Router();
const MonsterPart = require("../models/MonsterPart");

// api/monster/monsterparts
router.get("/monsterparts", async (req, res) => {
  try {
    const monsterparts = await MonsterPart.find();
    res.status(201).json(monsterparts);
  } catch (error) {
    res.status(500).json({
      message: "Что-то полшо не так.",
    });
  }
});

module.exports = router;
