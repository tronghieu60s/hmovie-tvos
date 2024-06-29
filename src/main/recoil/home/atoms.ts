import { atom } from "recoil";

export const visibleSwitchTabsState = atom<boolean>({
  key: "VisibleSwitchTabsState",
  default: false,
});
