"use server";

import '@styles'

import Provider from "./api/auth/[...nextauth]/client-provider"
import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]/route"

export default async function RootLayout({ children }) {
  return (
    <Provider session={await getServerSession(authOptions)}>
      <html lang="en">
        <head>
          <title>Console</title>
        </head>
        <body>
          <main>
            {children}
          </main>
        </body>
      </html>
    </Provider>
  )
}
