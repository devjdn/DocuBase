export interface CategoryProps {
    category: string;
    icon: React.ReactNode;
    links: {
        name: string;
        url: string;
        url_slug: string;
    }[]
}