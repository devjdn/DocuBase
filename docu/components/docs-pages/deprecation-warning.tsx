import { AlertTriangle } from "lucide-react";

export default function DeprecationWarning() {
    return(
        <div className="p-4 rounded-xl border border-border bg-secondary flex flex-col gap-4 w-fit max-w-90">
            <div className="rounded-lg border border-warning-foreground bg-warning h-10 w-10 grid place-items-center">
                <AlertTriangle className="stroke-warning-foreground" size={24}/>
            </div>
            <p className="text-warning-foreground">This link is for a deprecated technology. It is recommended to use an alternative solution.</p>
        </div>
    );
}