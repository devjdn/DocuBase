"use client";

import * as React from "react";
import { Popover } from "radix-ui";
import { Settings2 } from "lucide-react";
import { Button } from "./button";
import FontBtn from "./font-btn";
import { ThemeSwitcher } from "./theme-switcher";

export default function SettingsPopover() {
	return (
		<Popover.Root>
			<Popover.Trigger asChild>
				<Button className="size-7" variant="ghost" size={"icon"}>
					<Settings2 />
				</Button>
			</Popover.Trigger>
			<Popover.Portal>
				<Popover.Content
					sideOffset={4}
					align="end"
					className="z-70 flex flex-col gap-2 >*:border-b >*:border-b-border bg-popover rounded-xl border border-border-secondary shadow-lg p-2 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
				>
					<div>
						<p className="text-foreground font-medium text-sm">
							Options
						</p>
					</div>

					<div className="bg-muted rounded-lg p-2">
						<p className="text-muted-foreground font-medium text-xs mb-1">
							Font
						</p>
						<FontBtn />
					</div>

					<div className="bg-muted rounded-lg p-2">
						<p className="text-muted-foreground font-medium text-xs mb-1">
							Theme
						</p>
						<ThemeSwitcher />
					</div>
				</Popover.Content>
			</Popover.Portal>
		</Popover.Root>
	);
}
