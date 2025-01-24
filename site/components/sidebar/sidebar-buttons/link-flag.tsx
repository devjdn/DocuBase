import { Flag } from "lucide-react";

export default function LinkFlag({className}: {className: string;}) {
    return(
        <button className={`stroke-muted-foreground hover:stroke-warning ${className}`}>
            <Flag className="stroke-inherit" size={18}/>
        </button>
    );
}