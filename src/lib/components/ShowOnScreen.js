import { Device } from "@modules";


export function ShowOnLg({ children }) {
  const device = Device();
  return <>{device.lg && <>{children}</>}</>;
}
ShowOnLg.Options = false;
ShowOnLg.canAppend = true;

export function ShowOnMd({ children }) {
  const device = Device();
  return <>{device.md && <>{children}</>}</>;
}
ShowOnMd.Options = false;
ShowOnMd.canAppend = true;
