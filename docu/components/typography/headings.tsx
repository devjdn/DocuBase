export interface HeadingProps {
    text: string;
    className?: string;
}

function Heading1({text, className}: HeadingProps) {
    return(
        <h1 className={`font-medium text-3xl text-foreground mb-4 tracking-tight ${className}`}>{text}</h1>
    );
}


function Heading2({text, className}: HeadingProps) {
    return(
        <h2 className={`font-medium text-2xl text-foreground mb-2 tracking-tight ${className}`}>{text}</h2>
    )
}

function Heading3({text, className}: HeadingProps) {
    return(
        <h3 className={`font-medium text-xl text-foreground mb-2 ${className}`}>{text}</h3>
    )
}

export {
    Heading1,
    Heading2,
    Heading3,
}