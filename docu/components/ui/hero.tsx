"use client";

import DocsPreviewLight from "@/public/preview-docs-light.png";
import DocsPreviewDark from "@/public/preview-docs-dark.png";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Hero() {
	const { theme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return (
		<div className="flex flex-col items-center py-16">
			<h1 className="sr-only">Hero section for DocuBase</h1>
			<p className="text-3xl lg:text-4xl leading-tight! mx-auto max-w-2xl text-center">
				A better way to save and organize your favourite websites.
			</p>
			<div className="flex flex-col items-center gap-4 my-8 max-w-2xl">
				<Link
					href={"/sign-in"}
					className="bg-brand shadow-inner shadow-brand/50 hover:shadow-brand/100 transition-shadow duration-200 rounded-md px-4 py-2 text-white"
				>
					<p>Get started</p>
				</Link>
			</div>
			<div className="relative">
				{theme === "dark" ? (
					<Image
						width={500}
						height={600}
						src={DocsPreviewDark.src}
						alt="Docs Preview"
						className="w-full max-w-[800px] rounded-md border-2 border-brand/80 shadow-lg"
					/>
				) : (
					<Image
						width={500}
						height={600}
						src={DocsPreviewLight.src}
						alt="Docs Preview"
						className="w-full max-w-[800px] rounded-md border-2 border-brand/80 shadow-lg"
					/>
				)}
			</div>
		</div>
	);
}
