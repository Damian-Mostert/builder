"use client";

import { Page } from "@components";

import * as path from "path";

export default function View({ params }) {
  return <Page url={path.join("/", params.url,params.url2,params.url3)} />;
}
