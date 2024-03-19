import { Input } from "./input";

function Video({ children, ...props }) {
    return <video {...props} />
}


Video.canAppend = false;

Video.Options = [
    {
      value: "className",
    },
    {
      value: "src",
    },
  ];

export { Video };