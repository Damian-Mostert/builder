"use client";
import { Input } from "./input";

function TextBox({
  pre,
  title,
  children = [],
  variant = "default",
  className = "",
  functions,
  links,
  medialinks,
  ...props
}) {
  return (
    <div className={`text text-variant-${variant} ${className}`} {...props}>
      {pre && (
        <>
          {" "}
          <h3 className="text-pre-heading">{pre}</h3>
        </>
      )}
      {title && <h2 className="text-heading">{title}</h2>}
      {children}
    </div>
  );
}

TextBox.Options = [
  {
    value: "variant",
    type: "select",
    options: [
      {
        label: "default",
        value: "default",
      },
      {
        label: "title",
        value: "title",
      },
    ],
  },
  {
    value: "pre",
  },
  {
    value: "title",
  },
];

TextBox.canAppend = [
  "ShowOnMd",
  "ShowOnLg",
  "ShowState",
  "Paragraph",
  "Button",
  "Input",
];

export { TextBox };
