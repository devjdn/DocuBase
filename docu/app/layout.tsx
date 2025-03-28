import { Geist, Libre_Baskerville, PT_Serif, Playfair_Display } from 'next/font/google';
import { ThemeProvider } from "next-themes";
import "./globals.css";
import HeaderWrapper from "@/components/header/header-wrapper";
import { ClerkProvider } from "@clerk/nextjs";
import { FontKey, FontProvider } from "@/providers/font-provider";
import { cookies } from "next/headers";
import localFont from "next/font/local";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "DocuBase | Streamlining access to developer documentation.",
  description: "DocuBase provides a simple and intuitive way to access developer documentation.",
};

export const geist = Geist({
    subsets: ['latin'],
    variable: '--font-geist',
    display: 'swap',
});

export const playfairDisplay = Playfair_Display({
    weight: ['400'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-playfair-display',
});

export const libreBaskerville = Libre_Baskerville({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-libre-baskerville',
    display: 'swap',
});

export const openDyslexic = localFont({
    src: '../public/fonts/OpenDyslexic-Regular.woff2',
    display: 'swap',
    variable: '--font-open-dyslexic',
})



export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const allCookies = await cookies();
  const fontCookie: FontKey | undefined = allCookies.get("font")?.value as FontKey | undefined;
  const initialFont = fontCookie ?? "geist";

  const fontClass = {
    geist: geist.className,
    libreBaskerville: libreBaskerville.className,
    openDyslexic: openDyslexic.className,
  }[initialFont] || geist.className;

  console.log(fontCookie);

  return (
    <ClerkProvider>
      <FontProvider initialFont={initialFont}>
        <html lang="en" className={fontClass} suppressHydrationWarning>
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
                <main className="w-full flex flex-col grow min-h-[calc(100svh-56px)]">
                    {children}
                </main>
            </ThemeProvider>
          </body>
        </html>
      </FontProvider>
    </ClerkProvider>
  );
}
