"use client";

import Builder from "src/lib/components/builder"
import { Popup } from '@components';

export default function () {
    return <>
        <Builder template={{
            children: [
                {
                    __component: "Root",
                    children: [

                    ]
                }
            ]
        }} />
        <Popup />
    </>
}