"use client";
import { Input } from "./input";

import { useState } from "react";

import { BuildBody } from "@modules";

function Accordion({ className = "", indexes = [], tabs = [], tab = "", variant = "default", inDepthStyles = [], ...props }) {

    const [TabIndex, setIndex] = useState(indexes.indexOf(tab));

    return <>

        <div className={`w-full h-full flex flex-col accordion ${"accordion-" + variant} ${className}`} {...props}>
            {indexes.map((label, index) => {
                return <div key={index} className={`flex flex-col ${TabIndex == index ? "h-full tab" : ""}`}>
                    <div className={`w-full accordion-button ${TabIndex == index ? "accordion-button-active" : ""}`} onClick={() => TabIndex != index ? setIndex(index) : setIndex(null)} style={inDepthStyles[index]}>
                        {label}
                    </div>

                    <div className={`w-full h-full overflow-auto  `} style={{ transition: "all 1s", maxHeight: TabIndex == index ? "1000px" : "0px" }}>
                        {tabs[TabIndex] && index == TabIndex ? tabs[TabIndex] : {}}
                    </div>
                </div>
            })}
        </div >

    </>
};

Accordion.Options = function Options({ update, data }) {
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
        <div variant="builder" className='w-[300px] m-auto'>
            <Input label="value" value={data.label} onChange={value => {
                update({
                    ...data,
                    value
                })
            }} />
        </div>
    </div>
}

Accordion.canAppend = [

];

export { Accordion };