"use client";

import { useState } from "react";

import { BuildBody } from "@modules";

export function Accordion({ className = "", indexes = [], tabs = [], tab = "", variant = "default", inDepthStyles = [],...props }) {

    const [TabIndex, setIndex] = useState(indexes.indexOf(tab));

    return <>

        <div className={`w-full h-full flex flex-col accordion ${"accordion-" + variant} ${className}`} {...props}>
            {indexes.map((label, index) => {
                return <div key={index} className={`flex flex-col ${TabIndex == index ? "h-full tab" : ""}`}>
                    <div className={`w-full accordion-button ${TabIndex == index ? "accordion-button-active" : ""}`} onClick={() => TabIndex != index ? setIndex(index) : setIndex(null)} style={inDepthStyles[index]}>
                        {label}
                    </div>

                    <div className={`w-full h-full overflow-auto  `} style={{ transition: "all 1s", maxHeight: TabIndex == index ? "1000px" : "0px" }}>
                        {tabs[TabIndex] &&index == TabIndex ? tabs[TabIndex]:{}}
                    </div>
                </div>
            })}
        </div >

    </>
};
