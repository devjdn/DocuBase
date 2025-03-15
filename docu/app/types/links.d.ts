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

export interface LinkSubmissionTypes {
    id?: number;
    name: string;
    url: string;
    description: string;
    category_id?: number;
    url_slug?: string;
    approval_status: string;
    created_at?: string;
    user_id?: string;
    categories?: {
        name: string;
    }[];
}[];