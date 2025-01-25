import { Flag } from "lucide-react";

export default function LinkFlag({className}: {className: string;}) {
    return(
        <button className={`stroke-muted-foreground cursor-pointer py-2 hover:stroke-warning ${className}`}>
            <Flag className="stroke-inherit" size={18}/>
        </button>
    );
}