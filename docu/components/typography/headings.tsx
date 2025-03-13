export interface HeadingProps {
    text: string;
}

function Heading1({text}: HeadingProps) {
    return(
        <h1 className="font-medium text-3xl text-foreground mb-4">{text}</h1>
    );
}


function Heading2({text}: HeadingProps) {
    return(
        <h2 className="font-medium text-2xl text-foreground mb-2">{text}</h2>
    )
}

function Heading3({text}: HeadingProps) {
    return(
        <h3 className="font-medium text-xl text-foreground mb-2">{text}</h3>
    )
}

export {
    Heading1,
    Heading2,
    Heading3,
}