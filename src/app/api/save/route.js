import { readFileSync, writeFile, writeFileSync } from 'fs'

import { outputFile, outputFileSync } from 'fs-extra/esm'

import { NextResponse } from "next/server";

import { pages } from "@config";

export async function POST(request, res) {
    const data = await request.json();
    const { links, medialinks, code, template, page, className } = data;


    writeFileSync("src/lib/config/code.json", JSON.stringify(code, null, 4))

    pages[page] = template;

    writeFileSync("src/lib/config/links.json", links)
    writeFileSync("src/lib/config/media-links.json", medialinks)
    writeFileSync("src/lib/config/pages.json", JSON.stringify(pages, null, 4))
    writeFileSync("src/lib/config/styles.json", JSON.stringify(className, null, 4))

    return NextResponse.json({ messsage: "Hello World" });
}