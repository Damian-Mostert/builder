"use client";

import { useSession } from "next-auth/react";

import { useInViewClass } from "@modules";

import { useState } from "react";

import { body } from './body';
import { JsonEdit, Popup, remove__Editor } from "@components";

export default function Home() {
    useInViewClass();
    return <>
        <div className="flex w-full h-full">
            <JsonEdit DataIn={body()} devSites={"/view"} />
        </div>
        <Popup />

    </>
};