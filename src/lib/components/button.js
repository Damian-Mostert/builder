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

Button.Options = function Options({ update, data, functions }) {
  return <div className='p-2'>
    <div className='w-[300px] m-auto'>
      <Input variant="builder" label="variant" value={data.variant}
        type="select"
        options={[
          {
            label: "default",
            value: "default"
          }
        ]}
        onChange={variant => {
          update({
            ...data,
            variant
          })
        }} />
    </div>
    <div className='w-[300px] m-auto'>
      <Input variant="builder" label="function to call" value={data.functionToCall}
        type="select"
        options={Object.keys(functions).map(item => {
          return {
            label: item,
            value: item
          }
        })}
        onChange={functionToCall => {
          update({
            ...data,
            functionToCall
          })
        }} />
    </div>
    <div className='w-[300px] m-auto'>
      <Input variant="builder" label="class" value={data.className}
        onChange={className => {
          update({
            ...data,
            className
          })
        }} />
    </div>
    <div className='w-[300px] m-auto'>
      <Input variant="builder" label="label" value={data.label} onChange={label => {
        update({
          ...data,
          label
        })
      }} />
    </div>
  </div>
}

Button.canAppend = false;

export { Button };