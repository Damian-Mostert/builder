"use client";

import Builder from "src/lib/components/builder"
import { Popup } from '@components';
import { useEffect } from "react";
import axios from "axios";


export default function BUILD() {
    useEffect(() => {
        if (typeof document != "undefined") {
            document.getElementById("tailwind")?.remove();

        }
    }, []);
    return <div className="flex flex-col w-screen h-screen">
        <main className="w-full h-full overflow-auto" >
            <Builder
                onSave={(
                    links, medialinks, code, template, className, page
                ) => {
                    console.log({links,medialinks,code,template,className,page});
                    axios.post("/api/edit-page", { links, medialinks, code, template, className, page })
                }} />
            <Popup />

        </main>
    </div>
}