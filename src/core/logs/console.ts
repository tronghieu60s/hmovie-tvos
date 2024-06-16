import * as Device from "expo-device";

const _global = global;

const infoOrig = _global.console.info;

_global.console.info = function info() {
  const newDate = new Date();
  const timeoutOffset = newDate.getTimezoneOffset() * 60000;
  const timeString = new Date(newDate.getTime() - timeoutOffset)
    .toISOString()
    .replace("T", " ")
    .replace(/\..+/, "");
  const deviceString = `${Device.osName}${Device.osVersion ? ` ${Device.osVersion}` : ""}`;
  infoOrig.apply(_global.console, [
    `[${timeString} | ${deviceString}]`,
    ...arguments,
  ]);
};
