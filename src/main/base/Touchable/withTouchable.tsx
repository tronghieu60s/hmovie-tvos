import React, { ComponentType, forwardRef } from "react";
import { Touchable } from "./Touchable";

export const withTouchable = <Props extends Record<string, unknown>>(
  Component: ComponentType<Props>,
) => {
  // eslint-disable-next-line react/display-name
  return forwardRef<unknown, Props & React.ComponentProps<typeof Touchable>>(
    (props: Props, ref) => {
      return (
        <Touchable {...props} ref={ref}>
          <Component {...props} />
        </Touchable>
      );
    },
  );
};
