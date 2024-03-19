"use client";

import { useState } from "react";

import { Popup } from "@components";

import { Input } from "./input";

import { BuildBody } from "../modules/buildbody";

function Nav({
  orientation = "left",
  children,
  variant = "default",
  warnOnExit,
  setWarnOnExit,
  className = "",
  ...props
}) {
  const [TabIndex, setIndex] = useState(0);
  return (
    <>
      <div
        className={`nav nav-orientation-${orientation} ${
          "nav-variant-" + variant
        } ${className}`}
        {...props}
      >
        <div className="nav-indexes">
          {children?.props?.children?.map((item, index) => {
            return (
              <div
                key={index}
                onClick={async () => {
                  if (warnOnExit) {
                    let result = await Popup.fire(warnOnExit);
                    if (result.confirmed) {
                      setIndex(index);
                      setWarnOnExit(false);
                    }
                  } else {
                    setIndex(index);
                  }
                }}
                className={`nav-index ${
                  index === TabIndex ? "nav-index-active" : ""
                }`}
              >
                <span>{item?.props?.__props?.title}</span>
              </div>
            );
          })}
        </div>
        <div className="nav-tab">
          <div className="nav-tab-body">
            {children?.props?.children?.[TabIndex]?.props?.children &&
              BuildBody({
                template:
                  children?.props?.children?.[TabIndex]?.props?.children,
                ...props,
              })}
          </div>
        </div>
      </div>
    </>
  );
}
Nav.Options = [
  {
    type: "select",
    value: "variant",
    options: [
      {
        label: "default",
        value: "default",
      },
    ],
  },
  {
    type: "select",
    value: "orientation",
    options: [
      {
        label: "top",
        value: "top",
      },
      {
        label: "bottom",
        value: "bottom",
      },
      {
        label: "right",
        value: "right",
      },
      {
        label: "left",
        value: "left",
      },
    ],
  },
  {
    value: "className",
  },
];

Nav.canAppend = ["ShowOnMd", "ShowOnLg", "ShowState", "IndexItem"];

export { Nav };
