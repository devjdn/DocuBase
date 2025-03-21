import clsx from "clsx";
import { Heading1 } from "../typography/headings";
import { Badge } from "../ui/badge";
import { categoryColours, categoryIcons } from "@/lib/docubase";

export default function DocHeader({category, name}: {category: string; name: string;}){
    return(
        <header className="mb-4">
            <Badge
                className="mb-4"
                variant={"default"}
            >
                <p>{category}</p>
            </Badge>
            <Heading1 text={name}/>
        </header>
    );
}