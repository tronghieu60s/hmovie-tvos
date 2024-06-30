import tw from "@/src/core/tailwind";
import * as DefaultIconSax from "iconsax-react-native";
import React, { useCallback } from "react";
import { s } from "react-native-size-matters";

export type IconSaxProps = DefaultIconSax.IconProps & {
  name: keyof typeof DefaultIconSax;
  size?: number;
};

const IconSax = (props: IconSaxProps) => {
  const { name, size = 14, ...restProps } = props;

  // eslint-disable-next-line import/namespace
  const Icon = DefaultIconSax[name];

  const getSize = useCallback((size: number) => {
    if (tw.prefixMatch(`sm`)) {
      return s(size - 5);
    }

    return size;
  }, []);

  return <Icon {...restProps} size={getSize(size)} />;
};

export default IconSax;
