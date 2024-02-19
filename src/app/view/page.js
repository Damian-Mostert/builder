"use client";

import { useState, useEffect } from "react";
import { body } from "../body"
import { BuildBody, useInViewClass } from "@modules";
import { remove__Editor } from "@components";

export default function View() {
    useInViewClass();
    const [data, setData] = useState(body());
    useEffect(() => {
        const handleMessage = event => {
            console.log(JSON.parse(event.data));
            setData(JSON.parse(event.data));
        };
        window.addEventListener("message", handleMessage);
        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, []);

    return <>
        {BuildBody(remove__Editor(data))}
    </>
}
