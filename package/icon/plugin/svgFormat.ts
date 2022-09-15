import { pipe } from "@xunserver/util";
import { camelCase, upperFirst } from "lodash";
import File from "vinyl";

const handleIconName = (file: File) =>
  pipe(() => file.basename.replace(file.extname, ""), camelCase, upperFirst)();

export const formateSvg = (file: File) => {
  return (svgObj: any) => {
    const handle = (svgElement: any) => {
      if (svgElement.type !== "element") {
        return null;
      }

      const children = (svgElement.children || []).map(handle).filter(Boolean);
      let result: any = {
        tag: svgElement.name,
        attrs: svgElement.attributes,
      };

      if (children.length) {
        result.children = children;
      }

      return result;
    };

    return {
      icon: handle(svgObj.children[0]),
      name: handleIconName(file),
    };
  };
};
