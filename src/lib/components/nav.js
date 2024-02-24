"use client";

import { useState } from "react";

import { Popup } from "@components";


function Nav({ orientation = "left", indexes = [], tabs = [], tab = "", variant = "default", warnOnExit, setWarnOnExit, className = "", ...props }) {
    
    const [TabIndex, setIndex] = useState(indexes.indexOf(tab));
    return <>
        <div className={`nav nav-orientation-${orientation} ${"nav-variant-" + variant} ${className}`} {...props}>
            <div className="nav-indexes">
                {indexes.map((label, index) => {
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
                            {label}
                        </span>
                    </div>
                })}
            </div>
            <div className="nav-tab">
                <div className="nav-tab-body">
                    {tabs[TabIndex] ? tabs[TabIndex] : {}}
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
            <Input variant="builder" label="class" value={data.className}
                onChange={className => {
                    update({
                        ...data,
                        className
                    })
                }} />
        </div>
        <div className='w-[300px] m-auto'>
            <Input variant="builder" label="value" value={data.label} onChange={value => {
                update({
                    ...data,
                    value
                })
            }} />
        </div>
    </div>
}

export { Nav };