import { Github } from "lucide-react";
import { Button } from "../ui/button";

export default function GithubStar() {
    return(
        <Button asChild size="icon" variant="ghost" justify="center">
            <a target="_blank" href="https://github.com/devjdn/DocuBase">
                <Github size={18}/>
            </a>
        </Button>
    );
}