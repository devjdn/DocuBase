"use client";

import DocsPreviewLight from "@/app/preview-docs-light.png";
import DocsPreviewDark from "@/app/preview-docs-dark.png";
import { useTheme } from "next-themes";
import Link from "next/link";

export default function Hero() {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col items-center py-16">
      <h1 className="sr-only">Supabase and Next.js Starter Template</h1>
      <p className="text-3xl lg:text-4xl leading-tight! mx-auto max-w-2xl text-center">
        Streamlining access to professional developer documentation.
      </p>
      <div className="flex flex-col items-center gap-4 mt-8 max-w-2xl">
        <Link href={"/docs"} className="bg-brand shadow-inner shadow-brand/50 hover:shadow-brand/100 transition-shadow duration-200 rounded-md px-4 py-2 text-white">
          <p>Browse links</p>
        </Link>
      </div>
      <div className="mt-6 w-full p-[1px] bg-linear-to-r from-transparent via-brand/80 to-transparent my-8" />
      <img src={theme === "dark" ? DocsPreviewDark.src : DocsPreviewLight.src} alt="Docs Preview" className="w-full max-w-[800px] rounded-md border-2 border-brand/80 shadow-lg" />
    </div>
  );
}
