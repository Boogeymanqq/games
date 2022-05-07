const path = require("path");
const fs = require("fs");
const MonsterPart = require("../models/MonsterPart");

module.exports = getFiles = async () => {
  const setMonsterPart = (file) => {
    let str = path.join("http:", "localhost:5000", "monster", "img", file).split('\\');
    str.splice(1, 0, '');
    str = str.join('/');

    return new MonsterPart({
      url: str,
      position: { x: 0, y: 0 },
      isChecked: false,
    });
  };

  try {
    const files = fs.readdirSync(path.join(__dirname, "img"), "utf8");

    files.forEach(async (file) => await setMonsterPart(file).save());
  } catch (error) {
    console.log(error);
  }
};
