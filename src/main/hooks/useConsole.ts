import * as Device from "expo-device";
import { useEffect } from "react";

const _global = global;

const infoOrig = _global.console.info;

export function useConsole() {
  useEffect(() => {
    _global.console.info = function info() {
      const date = new Date();
      const timeoutOffset = date.getTimezoneOffset() * 60000;
      const timeString = new Date(date.getTime() - timeoutOffset)
        .toISOString()
        .replace("T", " ")
        .replace(/\..+/, "");
      const deviceString = `${Device.osName}${Device.deviceName ? ` - ${Device.deviceName}` : ""}`;
      infoOrig.apply(_global.console, [
        `[${timeString} | ${deviceString}]`,
        ...arguments,
      ]);
    };
    return () => {
      _global.console.info = infoOrig;
    };
  }, []);
}
