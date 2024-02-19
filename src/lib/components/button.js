"use client";

import Link from "next/link";

export function Button({
  label,
  variant = "default",
  href,
  onClick = null,
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
          onClick={onClick}
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
          onClick={onClick}
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
