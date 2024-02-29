"use client";

import Builder from "src/lib/components/builder"
import { Popup, Navigation } from '@components';
import { useEffect } from "react";
import { pages, links, code, mediaLinks, styles } from "@config";
import axios from "axios";



export default function BUILD() {
    useEffect(() => {
        document.getElementById("tailwind")?.remove();
    }, []);
    return <div className="flex flex-col w-screen h-screen">
        <main className="w-full h-full overflow-auto" >
            <Builder
                onSave={(
                    links, mediaLinks, code, template, className, page
                ) => {
                    axios.post("/api/save", { links, mediaLinks, code, template, className, page })
                }} />
            <Popup />

        </main>
    </div>
}