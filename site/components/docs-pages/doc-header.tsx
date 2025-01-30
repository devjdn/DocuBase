import { Heading1 } from "../typography/headings";

export default function DocHeader({category, name}: {category: string; name: string;}){
    return(
        <header className="mb-4">
            <h3 className="text-base text-muted-foreground mb-6">{category}</h3>
            <Heading1 text={name}/>
        </header>
    );
}