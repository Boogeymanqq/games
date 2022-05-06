const path = require("path");
const fs = require("fs");
const MonsterPart = require("../models/MonsterPart");

module.exports = getFiles = async () => {
  const setMonsterPart = (file) =>
    new MonsterPart({
      url: path.join("http://localhost:5000", "monster", "img", file).split("\\").join("/"),
      position: { x: 0, y: 0 },
      isChecked: false,
    });

  try {
    const files = fs.readdirSync(path.join(__dirname, "img"), "utf8");

    files.forEach(async (file) => await setMonsterPart(file).save());
  } catch (error) {
    console.log(error);
  }
};
