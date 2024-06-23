import React, { forwardRef, LegacyRef, useCallback, useState } from "react";
import {
  NativeSyntheticEvent,
  Platform,
  TargetedEvent,
  TouchableOpacity,
} from "react-native";
import { TouchableContextProvider } from "./context";

type Props = React.ComponentProps<typeof TouchableOpacity>;

export const Touchable = forwardRef((props: Props, ref) => {
  const { onBlur, onFocus, children, ...restProps } = props;
  const [hasFocus, setHasFocus] = useState(false);

  const onBlurProxy = useCallback(
    (e: NativeSyntheticEvent<TargetedEvent>) => {
      setHasFocus(false);
      onBlur?.(e);
    },
    [onBlur],
  );

  const onFocusProxy = useCallback(
    (e: NativeSyntheticEvent<TargetedEvent>) => {
      setHasFocus(true);
      onFocus?.(e);
    },
    [onFocus],
  );

  return (
    <TouchableOpacity
      ref={ref as LegacyRef<TouchableOpacity>}
      onBlur={onBlurProxy}
      onFocus={onFocusProxy}
      activeOpacity={Platform.isTV ? 1 : 0.7}
      tvParallaxProperties={{ enabled: false }}
      {...restProps}>
      <TouchableContextProvider hasFocus={hasFocus}>
        {children}
      </TouchableContextProvider>
    </TouchableOpacity>
  );
});

Touchable.displayName = "Touchable";
