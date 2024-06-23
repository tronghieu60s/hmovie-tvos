import React, { createContext, ReactNode } from "react";

type Context = {
  hasFocus: boolean;
};

export const TouchableContext = createContext<Context>({ hasFocus: false });

type TouchableContextProviderProps = {
  hasFocus: boolean;
  children: ReactNode;
};

export const TouchableContextProvider = (
  props: TouchableContextProviderProps,
) => {
  const { hasFocus, children } = props;
  return (
    <TouchableContext.Provider value={{ hasFocus }}>
      {children}
    </TouchableContext.Provider>
  );
};
