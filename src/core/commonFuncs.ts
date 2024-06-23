import { scale } from "react-native-size-matters";
import {
  BREAKPOINT_RESPONSIVE_LG,
  BREAKPOINT_RESPONSIVE_MD,
  BREAKPOINT_RESPONSIVE_SM,
} from "./responsive/breakpoints";

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const calculateListItemStyle = (widthSize: number) => {
  const gapSize = 15;

  let perItemSize = 0;
  let numberOfItems = 0;

  if (widthSize < BREAKPOINT_RESPONSIVE_SM) {
    perItemSize = scale(100);
  } else if (widthSize < BREAKPOINT_RESPONSIVE_MD) {
    perItemSize = scale(80);
  } else if (widthSize < BREAKPOINT_RESPONSIVE_LG) {
    perItemSize = scale(70);
  } else {
    perItemSize = scale(60);
  }

  numberOfItems = Math.floor(widthSize / perItemSize);
  if (numberOfItems > 0) {
    let totalGapSize = gapSize * (numberOfItems - 1);
    let remainingWidth = widthSize - totalGapSize;
    perItemSize = remainingWidth / numberOfItems;
  }

  return {
    gapSize,
    perItemSize,
    numberOfItems,
  };
};
