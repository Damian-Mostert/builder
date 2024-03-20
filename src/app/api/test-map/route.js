import { NextResponse } from "next/server";


export async function POST() {
  return NextResponse.json([
    {
      pre: "hello",
      title: "hello world",
    },
    {
      pre: "hello",
      title: "hello world",
    },
    {
      pre: "hello 2",
      title: "hello world 2",
    },
  ]);
}
