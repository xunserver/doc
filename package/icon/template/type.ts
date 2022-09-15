export interface SVGAbsNode {
  tag: string;
  attrs?: {
    [k: string]: any;
  };
  children?: SVGAbsNode | SVGAbsNode[];
}

export interface IconDef {
  icon: SVGAbsNode;
  name: string;
}
