import Timestamp from "../typography/timestamp";

export default function DocDetails({url, description, created_at}: {url: string; description: string; created_at: string;}) {
    return(
        <div className="flex flex-col gap-2">
            <a href={url} target="_blank" className="mb-2 text-link-foreground hover:underline">{url}</a>
            <p className="text-muted-foreground max-w-prose mb-4">{description}</p>
            <Timestamp timestamp={created_at} />
        </div>
    );
}