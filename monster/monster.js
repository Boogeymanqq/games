const path = require("path");
const fs = require("fs");
const MonsterPart = require("../models/MonsterPart");

module.exports = getFiles = async () => {
  const setMonsterPart = (file) =>
    new MonsterPart({
      src: path.join("localhost:5000", "monster", "img", file),
      x: 0,
      y: 0,
    });

  try {
    const files = fs.readdirSync(path.join(__dirname, "img"), "utf8");

    files.forEach(async (file) => await setMonsterPart(file).save());

    // await monsterParts.save();
  } catch (error) {
    console.log(error);
  }
};
