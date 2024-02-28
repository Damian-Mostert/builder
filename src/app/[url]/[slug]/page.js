"use client";


import { Page } from "@modules";

export default function View({ params }) {
    return <Page url={params.slug} />
}
