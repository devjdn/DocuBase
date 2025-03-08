import Timestamp from "../typography/timestamp";

export default function DocDetails({url, description, created_at}: {url: string; description: string; created_at: string;}) {
    return(
        <div className="block">
            <a className="text-link-foreground hover:underline mb-10 inline-block" href={url} target="_blank">{url}</a>
            <p className="text-muted-foreground max-w-prose mb-4">{description}</p>
            <Timestamp timestamp={created_at} />
        </div>
    );
}