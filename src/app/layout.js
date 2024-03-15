"use server";

import '@styles'

import { Analytics, track } from '@vercel/analytics/react';

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          id="tailwind"
          href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
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
