import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import DirMonsterpart from "../models/DirMonsterpart.js";

export const getDirMonsterparts = async (host = 'localhost:5000') => {
  let dirs = [];

  const SIZES = {
    body: "xl",
    hair: "xl",
    hat: "xl",
    legs: "lg",
    wings: "lg",
    arms: "md",
    mouth: "md",
    eyes: "sm",
    ears: "xs",
    horns: "xs",
    mose: "xs",
    tail: "xs"
  };

  const setDirMonsterpart = (dirs) => {
    // console.log('###DIRS', dirs);
    const { dir, img } = dirs;
    let imageArr = img.map((el) => {
      return {
        url: el,
        position: {
          x: 0,
          y: 0,
        },
        isChecked: false,
        size: SIZES[dir],
      };
    });

    return new DirMonsterpart({
      dir,
      img: imageArr,
    });
  };

  try {
    const _dirname = dirname(fileURLToPath(import.meta.url));

    fs.readdir(join(_dirname, "monsterparts"), "utf8", (err, files) => {
      if (err) throw err;
      files.forEach((dir, ind) => {
        dirs.push({ dir });

        fs.readdir(join(_dirname, "monsterparts", dir), "utf8", (err, img) => {
          if (err) throw err;
          setDirMonsterpart({
            ...dirs[ind],
            img: [
              ...img.map((file) => {
                let str = join(
                  "http:",
                  host,
                  "monster",
                  "monsterparts",
                  dir,
                  file
                ).split("\\");
                str.splice(1, 0, "");
                str = str.join("/");
                return str;
              }),
            ],
          }).save();
        });
      });
    });
  } catch (err) {
    console.log(err);
  }
};
