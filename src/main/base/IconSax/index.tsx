import tw from "@/src/core/tailwind";
import * as DefaultIconSax from "iconsax-react-native";
import React, { useCallback } from "react";
import { s } from "react-native-size-matters";

export type IconSaxProps = DefaultIconSax.IconProps & {
  name: keyof typeof DefaultIconSax;
  size?: number;
  sizeScheme?: { sm: number };
};

const IconSax = (props: IconSaxProps) => {
  const { name, size = 14, sizeScheme, ...restProps } = props;

  // eslint-disable-next-line import/namespace
  const Icon = DefaultIconSax[name];

  const getSize = useCallback(
    (size: number) => {
      if (tw.prefixMatch(`sm`)) {
        if (sizeScheme?.sm) {
          return s(sizeScheme.sm);
        }

        return s(size - 6);
      }

      return size;
    },
    [sizeScheme?.sm],
  );

  return <Icon {...restProps} size={getSize(size)} />;
};

export default IconSax;
