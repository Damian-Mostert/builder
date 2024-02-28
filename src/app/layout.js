"use server";

import '@styles'

import Provider from "./api/auth/[...nextauth]/client-provider"
import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]/route"

import { Analytics, track } from '@vercel/analytics/react';


export default async function RootLayout({ children }) {


  return (
    <Provider session={await getServerSession(authOptions)}>
      <html lang="en">
        <head>
          <title>Console</title>
          <link
            id="tailwind"
            href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
            rel="stylesheet"
          />
        </head>
        <body>
          {children}
          <Analytics />
        </body>
      </html>
    </Provider>
  )
}
