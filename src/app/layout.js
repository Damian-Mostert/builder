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

        </head>
        <body>
          {children}
          <Analytics />
        </body>
      </html>
    </Provider>
  )
}
