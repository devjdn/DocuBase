import { Github } from "lucide-react";
import WindowBtn from "./window-btn";
import { Button } from "./button";
import SettingsPopover from "./settings-popover";
import { SidebarTrigger } from "./sidebar";

export default function ActionsHeader() {
	return (
		<header className="flex flex-row items-center gap-2 mb-4 justify-between">
			<div className="flex flex-row items-center justify-center gap-2">
				<SidebarTrigger />

				<div className="h-4 border-l border-l-border"></div>

				<WindowBtn />
			</div>

			<div className="p-1 flex flex-row items-center justify-center gap-2">
				<SettingsPopover />

				<Button className="size-7" asChild size="icon" variant="ghost">
					<a
						target="_blank"
						href="https://github.com/devjdn/DocuBase"
					>
						<Github size={16} />
					</a>
				</Button>
			</div>
		</header>
	);
}
