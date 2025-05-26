export type VNode =
  | {
      type: "root";
      children: VNode[];
    }
  | {
      type: "rule";
      selector: string;
      declarations: {
        type: "declaration";
        prop: string;
        value: string;
      }[];
    }
  | { type: "declaration"; prop: string; value: string }
  | {
      type: "atrule";
      name: string;
      params: string;
      children: VNode[];
    };
