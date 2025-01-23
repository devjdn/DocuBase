export interface HeadingProps {
    text: string;
}

export default function Heading1({text}: HeadingProps) {
    return(
        <h1 className="font-semibold text-3xl mb-3 text-foreground">{text}</h1>
    );
}