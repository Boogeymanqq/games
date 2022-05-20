const path = require("path");
const fs = require("fs");
const DirMonsterpart = require("../models/DirMonsterpart");

module.exports = getDirMonsterparts = async () => {
  let dirs = [];

  const setDirMonsterpart = (dirs) => {
    const { dir, img } = dirs;
    let imageArr = img.map(el => {
      return {
        url: el,
        position: {
          x: 0,
          y: 0
        },
        isChecked: false
      }
    })
  
    return new DirMonsterpart({
      dir,
      img: imageArr
    });
  }
    
  try {
    fs.readdir(path.join(__dirname, "monsterparts"), "utf8", (err, files) => {
      if (err) throw err;

      files.forEach((dir, ind) => {
        dirs.push({ dir });
        fs.readdir(
          path.join(__dirname, "monsterparts", dir),
          "utf8",
          (err, img) => {
            if (err) throw err;

            setDirMonsterpart({
              ...dirs[ind],
              img: [
                ...img.map((file) => {
                  let str = path
                    .join("http:", "localhost:5000", "monster", "img", file)
                    .split("\\");
                  str.splice(1, 0, "");
                  str = str.join("/");
                  return str;
                }),
              ],
            }).save()
          }
        );
      });
    });
  } catch (err) {
    console.log(err);
  }
};
