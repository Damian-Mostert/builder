import { default as LINK } from "next/link";
export function Link({ children, ...props }) {
  return <LINK {...props}>{children}</LINK>;
}
