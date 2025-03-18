import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import HeaderWrapper from "@/components/header/header-wrapper";
import { ClerkProvider } from "@clerk/nextjs";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "DocuBase | Streamlining access to developer documentation.",
  description: "DocuBase provides a simple and intuitive way to access developer documentation.",
};

const geist = Geist({
  subsets: ["latin"],
  display: "swap"
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={geist.className} suppressHydrationWarning>
        <body className="bg-background overflow-x-hidden text-foreground tracking-normal">
          {/* <script
              crossOrigin="anonymous"
              src="//unpkg.com/react-scan/dist/auto.global.js"
          /> */}
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
              <HeaderWrapper/>
              <main className="w-full flex flex-col grow min-h-[calc(100svh-65px)]">
                  {children}
              </main>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
