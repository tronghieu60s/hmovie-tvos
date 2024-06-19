import { scale } from "react-native-size-matters";

export const calculatePerItemSize = (widthSize: number, gapSize: number) => {
  let perItemSize = scale(70);
  let numberOfItem = 0;

  if (widthSize < 400) {
    perItemSize = scale(100);
  }

  numberOfItem = Math.floor(widthSize / perItemSize);
  if (numberOfItem > 0) {
    let totalGapSize = gapSize * (numberOfItem - 1);
    let remainingWidth = widthSize - totalGapSize;
    perItemSize = remainingWidth / numberOfItem;
  }

  return perItemSize;
};
