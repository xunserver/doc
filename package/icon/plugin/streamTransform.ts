import { obj } from "through2";
import File from "vinyl";

/**
 * 处理gulp中文件流转换成成string
 * @param fn 处理函数
 */
export const streamTransform = (fn: (content: string, file: File) => string) =>
  obj(async (file, encode, cb) => {
    if (file.isBuffer()) {
      file.contents = Buffer.from(
        await fn(file.contents.toString(encode), file)
      );
      cb(null, file);
    } else {
      cb(null, file);
    }
  });
