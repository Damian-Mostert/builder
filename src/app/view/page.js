"use client";


import { useState, useEffect, useRef } from "react";
import { BuildBody, useInViewClass } from "@modules";

export default function View() {
    useInViewClass();

    const containerRef = useRef();

    const [data, setData] = useState([]);
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

    return <div ref={containerRef} className="w-full h-full">
        {BuildBody((data))}
    </div>
}
