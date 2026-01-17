import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { CVProvider } from "@/lib/cv-context"
import { Toaster } from "@/components/ui/toaster"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "South African CV & Resume Generator | Professional CV Builder",
  description:
    "Create professional CVs and resumes tailored for the South African job market. AI-powered content suggestions, multiple templates, and instant PDF export.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        type: "image/x-icon",
      },
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <CVProvider>{children}</CVProvider>
        <Toaster />
        <Analytics />
        {/* PopAds Script Integration */}
        <script
          type="text/javascript"
          data-cfasync="false"
          dangerouslySetInnerHTML={{
            __html: `/*<![CDATA[/* */\n(function(){var p=window,t=\"ab4e8d66390f6a5e1b1c6f192533f319\",s=[[\"siteId\",294*198*533+617-393-25757460],[\"minBid\",0],[\"popundersPerIP\",\"0\"],[\"delayBetween\",0],[\"default\",false],[\"defaultPerDay\",0],[\"topmostLayer\",\"auto\"]],u=[\"d3d3LmFudGlhZGJsb2Nrc3lzdGVtcy5jb20vb2pzbWVkaWF0YWdzLm1pbi5jc3M=\",\"ZDNjb2Q4MHRobjdxbmQuY2xvdWRmcm9udC5uZXQvQ0FSdy9jdHlwZWQubWluLmpz\"],e=-1,f,g,b=function(){clearTimeout(g);e++;if(u[e]&&!(1794606588000<(new Date).getTime()&&1<e)){f=p.document.createElement(\"script\");f.type=\"text/javascript\";f.async=!0;var r=p.document.getElementsByTagName(\"script\")[0];f.src=\"https://\"+atob(u[e]);f.crossOrigin=\"anonymous\";f.onerror=b;f.onload=function(){clearTimeout(g);p[t.slice(0,16)+t.slice(0,16)]||b()};g=setTimeout(b,5E3);r.parentNode.insertBefore(f,r)}};if(!p[t]){try{Object.freeze(p[t]=s)}catch(e){}b()}})();\n/*]]>/* */`
          }}
        />
      </body>
    </html>
  )
}
