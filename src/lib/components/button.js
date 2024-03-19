"use client";

import Link from "next/link";
import { Input } from "./input";

function Button({
  label,
  variant = "default",
  href,
  onClick = null,
  functions = {},
  functionToCall,
  target,
  className,
  ...props
}) {

  return (
    <>
      {href && (
        <Link
          href={href}
          target={target || "_self"}
          className={`button button-variant-${variant} ${className}`}
          onClick={onClick}
          {...props}
        >
          <span />{label}
        </Link>
      )}
      {!href && !target && (
        <button
          className={`button button-variant-${variant} ${className}`}
          onClick={functionToCall ? functions[functionToCall] : onClick}
          htmlFor={target}
          {...props}
        >
          <span />{label}
        </button >
      )
      }
      {!href && target && (
        <label
          className={`button button-variant-${variant} ${className}`}
          onClick={functionToCall ? functions[functionToCall] : onClick}
          htmlFor={target}
          {...props}
        >
          <span />{label}
        </label >
      )
      }
    </>
  );
}

Button.Options = [
  {
value:"variant",
type:"select",
options:[
  {
    label:"default",
    value:"default"
  },{
    label:"light",
    value:"light"
  }
]
  },
      {
        value:"className"
    },
    {
        value:"value"
    },
    {
      type:"select",
      value:"functionToCall",
      options:"functions"
    }
]

Button.canAppend = false;

export { Button };