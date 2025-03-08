export interface LinkTypes {
    links: {
        id: number;
        name: string;
        url: string;
        description: string;
        created_at: string;
        category_id: number;
        categories: {
          name: string;
        }
        url_slug: string;
    }[];
}