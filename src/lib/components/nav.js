"use client";

import { useState } from "react";

import { Popup } from "@components";

import { BuildBody } from "@modules";

export function Nav({ orientation = "left", indexes = [], tabs = [], tab = "", variant = "default", warnOnExit, setWarnOnExit, className = "" ,...props}) {
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