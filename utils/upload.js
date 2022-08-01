import { existsSync, mkdirSync } from "fs";
import multer from "multer";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

// путь к текущей директории
const _dirname = dirname(fileURLToPath(import.meta.url));

const upload = multer({
  storage: multer.diskStorage({
    // директория для записи файлов
    destination: async (req, _, cb) => {

      const dirPath = join(_dirname, "../files", "public");

      // создаем директорию при отсутствии
      if (!existsSync(dirPath)) {
        mkdirSync(dirPath, { recursive: true });
      }

      cb(null, dirPath);
    },
    filename: (_, file, cb) => {
      // названия файлов могут быть одинаковыми
      // добавляем к названию время т дефис
      const fileName = `${Date.now()}-${file.originalname}`;

      cb(null, fileName);
    },
  }),
});

export default upload;
