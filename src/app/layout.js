"use server";

import '@styles'

import { Analytics, track } from '@vercel/analytics/react';

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          id="tailwind"
          href="/tailwind.min.css"
          rel="stylesheet"
        />
        <meta name="description" content=""/>
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
