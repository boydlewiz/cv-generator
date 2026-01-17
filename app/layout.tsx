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
            __html: `/*<![CDATA[/* */\n(function(){var r=window,z=\"ab4e8d66390f6a5e1b1c6f192533f319\",n=[[\"siteId\",148-885-597+5271094],[\"minBid\",0],[\"popundersPerIP\",\"0\"],[\"delayBetween\",0],[\"default\",false],[\"defaultPerDay\",0],[\"topmostLayer\",\"auto\"]],x=[\"d3d3LmFudGlhZGJsb2Nrc3lzdGVtcy5jb20vbGpzbWVkaWF0YWdzLm1pbi5jc3M=\",\"ZDNjb2Q4MHRobjdxbmQuY2xvdWRmcm9udC5uZXQvT1V5ZS9ldHlwZWQubWluLmpz\"],a=-1,d,y,g=function(){clearTimeout(y);a++;if(x[a]&&!(1794601685000<(new Date).getTime()&&1<a)){d=r.document.createElement(\"script\");d.type=\"text/javascript\";d.async=!0;var q=r.document.getElementsByTagName(\"script\")[0];d.src=\"https://\"+atob(x[a]);d.crossOrigin=\"anonymous\";d.onerror=g;d.onload=function(){clearTimeout(y);r[z.slice(0,16)+z.slice(0,16)]||g()};y=setTimeout(g,5E3);q.parentNode.insertBefore(d,q)}};if(!r[z]){try{Object.freeze(r[z]=n)}catch(e){}g()}})();\n/*]]>/* */`
          }}
        />
      </body>
    </html>
  )
}
