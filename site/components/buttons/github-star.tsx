import { Github } from "lucide-react";

export default function GithubStar() {
    return(
        <a target="_blank" href="https://github.com/devjdn/docubase" className="h-10 px-3 inline-flex text-primary-foreground text-sm bg-primary stroke-primary-foreground items-center gap-2 rounded-md">
            <Github className="stroke-inherit" size={18}/>
            <p>Star</p>
        </a>
    );
}