import { LinkArray, SidebarLinkInfo } from "@/app/types/links";
import { Box, BrainCircuit, CircleFadingPlus, Container, Database, FlaskConical, Layers, LayoutDashboard, LibraryBig, Server, Shield, TerminalSquare } from "lucide-react";

export const linkCategories = [
    "Frameworks",
    "Libraries",
    "Databases",
    "Authentication",
    "UI",
    "DevOps",
    "Hosting & Deployment",
    "Testing",
    "AI & Machine Learning",
    "CMS",
    "CLI Tools",
    "Other",
]

export const categoryIcons: Record<string, React.ReactNode> = {
    'Frameworks': <Box className="stroke-muted-foreground" size={20}/>,
    'Libraries': <LibraryBig className="stroke-muted-foreground" size={20}/>,
    'Databases': <Database className="stroke-muted-foreground" size={20}/>,
    'Authentication': <Shield className="stroke-muted-foreground" size={20}/>,
    'UI': <LayoutDashboard className="stroke-muted-foreground" size={20}/>,
    'DevOps': <Container className="stroke-muted-foreground" size={20}/>,
    'Hosting & Deployment': <Server className="stroke-muted-foreground" size={20}/>,
    'Testing': <FlaskConical className="stroke-muted-foreground" size={20}/>,
    'AI & Machine Learning': <BrainCircuit className="stroke-muted-foreground" size={20}/>,
    'CMS': <CircleFadingPlus className="stroke-muted-foreground" size={20}/>,
    'CLI Tools': <TerminalSquare className="stroke-muted-foreground"size={20}/>,
    'Other': <Layers className="stroke-muted-foreground" size={20}/>,
}

export const groupLinksByCategory = (links: SidebarLinkInfo['links']) => {
    // The reduce method is used to accumulate a result
    // In this case, it is an object
    return links.reduce((acc, link) => {

        // If a link category doesn't exist
        // Initialize that category as an empty array
        if(!acc[link.categories.name]) {
            acc[link.categories.name] = [];
        }

        // Uses the push method to add the current link 
        // to its corresponding category array
        acc[link.categories.name].push(link);
        return acc;

        // The initial value of `acc` is an empty object, typed as `Record<string, LinkTypes['links']>`.
        // `acc` will become an object where the keys are strings
        // and the values are arrays of links
    }, {} as Record<string, SidebarLinkInfo['links']>);
};