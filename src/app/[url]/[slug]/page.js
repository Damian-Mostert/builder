"use client";



import { Page } from "@components";

export default function View({ params }) {
    return <Page url={"/" + params.url + "/" + params.slug} />
}
