import { ThemeSwitcher } from "@/components/theme-switcher";
import { Geist, Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import HeaderWrapper from "@/components/header/header-wrapper";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "DocuBase | Streamlining access to developer documentation.",
  description: "The fastest way to build apps with Next.js and Supabase",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});
const inter = Inter({
  display: "swap",
  subsets: ["latin"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="bg-background text-foreground tracking-normal">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <HeaderWrapper/>
          <main>
            <div className="w-full flex flex-col grow items-center">

              {children}

            </div>
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
  );
}
