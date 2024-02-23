"use client";


import { useState, useEffect, useRef } from "react";
import { BuildBody } from "@modules";

export default function View() {
    const containerRef = useRef();

    const [data, setData] = useState([]);
    useEffect(() => {
        const handleMessage = event => {

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
