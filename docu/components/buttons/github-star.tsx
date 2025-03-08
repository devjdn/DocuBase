import { Github } from "lucide-react";
import { Button } from "../ui/button";

export default function GithubStar() {
    return(
        <Button asChild size="default" variant="default" justify="center" className="gap-2">
            <a className="flex flex-row gap-2" target="_blank" href="https://github.com/jayden-prime/DocuBase">
                <Github size={18}/>
                <p>Star</p>
            </a>
        </Button>
    );
}