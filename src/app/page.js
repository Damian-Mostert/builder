"use client";

import Builder from "src/lib/components/builder"
import { Popup } from '@components';

export default function () {
    return <>
        <header className="w-full h-16 bg-slate-800">

        </header>
        <Builder template={[
            {
                __component:"Paragraph",
                __props:{
                    className:"text-center",
                    text:"hello world"
                }
            }
        ]} />
        <Popup />
    </>
}