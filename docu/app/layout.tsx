import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { Host_Grotesk } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import HeaderWrapper from "@/components/header/header-wrapper";
import { ClerkProvider } from "@clerk/nextjs";
// import localFont from "next/font/local";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "DocuBase | Streamlining access to developer documentation.",
  description: "DocuBase provides a simple and intuitive way to access developer documentation.",
};

// const switzer = localFont({
//   src: './fonts/Switzer-Variable.woff2',
//   display: 'swap',
// });

const host = Host_Grotesk({
  subsets: ["latin"],
  display: "swap",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={host.className} suppressHydrationWarning>
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
              <main className="w-full flex flex-col grow items-center min-h-[calc(100svh-164px)]">
                  {children}
              </main>
              <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-8">
                <p>
                  Powered by{" "}
                  <a
                    href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
                    target="_blank"
                    className="font-bold hover:underline"
                    rel="noreferrer"
                  >
                    Supabase
                  </a>
                </p>
                <ThemeSwitcher />
              </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
