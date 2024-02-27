"use client";

import { useState } from "react";

import { Popup } from "@components";

import { Input } from "./input";

import { BuildBody } from "../modules/buildbody";

function Nav({ orientation = "left", children, variant = "default", warnOnExit, setWarnOnExit, className = "", ...props }) {
    const [TabIndex, setIndex] = useState(0);
    return <>
        <div className={`nav nav-orientation-${orientation} ${"nav-variant-" + variant} ${className}`} {...props}>
            <div className="nav-indexes">
                {children?.props?.children?.map((item, index) => {
                    return <div key={index} onClick={async () => {
                        if (warnOnExit) {
                            let result = await Popup.fire(warnOnExit);
                            if (result.confirmed) {
                                setIndex(index);
                                setWarnOnExit(false);
                            }
                        } else {
                            setIndex(index);
                        }
                    }} className={`nav-index ${index === TabIndex ? "nav-index-active" : ""}`} >
                        <span>
                            {item?.props?.__props?.title}
                        </span>
                    </div>
                })}
            </div>
            <div className="nav-tab">
                <div className="nav-tab-body">
                    {children?.props?.children?.[TabIndex]?.props?.children && BuildBody(children?.props?.children?.[TabIndex]?.props?.children)}
                </div>
            </div>
        </div>
    </>
}
Nav.Options = function Options({ update, data }) {
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
            <Input variant="builder" label="orientation" value={data.orientation}
                type="select"
                options={[
                    {
                        label: "left",
                        value: "left"
                    },
                    {
                        label: "top",
                        value: "top"
                    },
                    {
                        label: "right",
                        value: "right"
                    },
                    {
                        label: "bottom",
                        value: "bottom"
                    }


                ]}
                onChange={orientation => {
                    update({
                        ...data,
                        orientation
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
    </div>
}

Nav.canAppend = [
    "IndexItem",
]

export { Nav };