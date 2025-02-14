import { Github } from "lucide-react";
import { Button } from "../ui/button";

export default function GithubStar() {
    return(
        <Button asChild size="sm" variant={"default"}>
            <a className="flex flex-row gap-2" target="_blank" href="https://github.com/devjdn/docubase">
                <Github size={18}/>
                <p>Star</p>
            </a>
        </Button>
    );
}