"use client";

import { Page } from "@components";

import * as path from "path";

export default function View({ params }) {
  return <Page url={path.join("/", params.url1, params.url2)} />;
}
Ï
