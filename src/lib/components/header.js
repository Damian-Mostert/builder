"use client";

import Link from "next/link"
import { useEffect, useState } from "react";
import { Input } from "./input"
import { Device } from "@modules";

function Header({ icon = "/vercel.svg", orientation = "top", mobileOrientation = "left", variant = "default", links = [] }) {

    const window = Device();

    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const toggleNav = () => showMobileMenu ? setShowMobileMenu(false) : setShowMobileMenu(true);

    useEffect(() => {
        if (showMobileMenu && window.md)
            return document.body.classList.add("overflow-hidden");
        document.body.classList.remove("overflow-hidden");
    }, [showMobileMenu, window])

    return <>
        {window.lg && <header className={`header header-variant-${variant} `}>
            <div className={`header-body header-${orientation}`}>
                <div className="header-icon-container">
                    <img src={icon} />
                </div>
                <nav className="header-nav">
                    {links.map((item, index) => {
                        if (item.links) {
                            return <div key={index} className="header-dropdown">
                                <div className="header-title">{item.label}</div>
                                <div className="header-dropdown-links">
                                    {item.links.map((item, sub_index) => {
                                        return <Link className="header-title" key={index + "-" + sub_index} href={item.href}>{item.label}</Link>
                                    })}
                                </div>
                            </div>
                        }
                        return <Link key={index} href={item.href} className="header-title">{item.label}</Link>
                    })}
                </nav>
            </div>
        </header>}
        {window.md && <header className={`relative header-mobile  header-variant-${variant}  `}>
            <div className={`flex w-full header-${mobileOrientation} ${showMobileMenu ? "overflow-hidden" : ""}`}>
                <div className="header-mobile-icon-container">
                    <img src={icon} />
                </div>
                <svg id="hamburger" className={`w-[40px] h-[40px] ${showMobileMenu ? "activeHamburger" : ""}`} viewBox="0 0 60 40" onClick={toggleNav}>
                    <g stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                        <path id="top-line" d="M10,10 L50,10 Z"></path>
                        <path id="middle-line" d="M10,20 L50,20 Z"></path>
                        <path id="bottom-line" d="M10,30 L50,30 Z"></path>
                    </g>
                </svg>
            </div>
            <nav className={`sheader ${showMobileMenu ? "header-open" : "header-close"}`} style={{ transition: "height 0.5s" }}>
                {links.map((item, index) => {
                    if (item.links) {
                        return
                    }
                    return <Link key={index} href={item.href} className="header-title">{item.label}</Link>
                })}
            </nav>

        </header>}


    </>
}

Header.Options = function Options({ data, update }) {
    return <>
        <div className='w-[300px] m-auto'>
            <Input variant="builder" label="variant" type="select" value={data.variant} size="full" options={[
                {
                    label: "default",
                    value: "default",
                }
            ]} onChange={variant => {
                update({
                    ...data,
                    variant
                })
            }} />
        </div>
        <div className='w-[300px] m-auto'>
            <Input variant="builder" label="orientation" type="select" value={data.orientation} size="full" options={[
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
                }
            ]} onChange={orientation => {
                update({
                    ...data,
                    orientation
                })
            }} />
        </div>
        <div className='w-[300px] m-auto'>
            <Input variant="builder" label="mobile orientation" type="select" value={data.mobileOrientation} size="full" options={[
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
                }
            ]} onChange={mobileOrientation => {
                update({
                    ...data,
                    mobileOrientation
                })
            }} />
        </div>
        <div className='w-[300px] m-auto'>
            <Input variant="builder" label="icon" value={data.icon} onChange={icon => {
                update({
                    ...data,
                    icon
                })
            }} />
        </div>
    </>
}

Header.canAppend = false;

export { Header };