export interface CategoryProps {
    category: string;
    icon: React.ReactNode;
    links: {
        id: number;
        name: string;
        url: string;
        url_slug: string;
    }[]
}