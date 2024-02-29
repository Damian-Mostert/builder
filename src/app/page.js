"use client";

import Builder from "src/lib/components/builder"
import { Popup, Navigation } from '@components';
import { useEffect } from "react";
import { pages, links, code, mediaLinks } from "@config";


const CODE = code.code;

export default function BUILD() {
    useEffect(() => {
        document.getElementById("tailwind")?.remove();
    }, [])
    return <div className="flex flex-col w-screen h-screen">
        <main className="w-full h-full overflow-auto" >
            <Builder
                mediaLinks={mediaLinks}
                code={CODE}
                classNames=".test{}"
                links={links}
                template={pages["/"]}
                onSave={(data) => {

                }} />
            <Popup />

        </main>
    </div>
}