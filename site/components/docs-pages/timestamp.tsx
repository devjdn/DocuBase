import { parseISO, format } from "date-fns";

export default function Timestamp({timestamp}: {timestamp: string}) {

    const parsedTimestamp = parseISO(timestamp);
    const formattedTimestamp = format(parsedTimestamp, "PPP");

    return(
        <p className="text-sm text-muted-foreground">{formattedTimestamp}</p>
    );
}