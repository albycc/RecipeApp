// import icon from "../icons/done.png"

export type IconName = "done" | "dots" | "leftArrow" | "trashbin";

type IIcon = {
  id: IconName;
};

export const Icon = {
  ["done"]: {
    src: require("../icons/done.svg"),
  },
  ["dots"]: {
    src: require("../icons/threedots.svg"),
  },
  ["trashbin"]: {
    src: require("../icons/trashbin.svg"),
  },
  ["leftArrow"]: {
    src: require("../icons/left-arrow.svg"),
  },
};
