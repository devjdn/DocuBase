export interface LinkArray {
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

export interface SidebarLinkInfo {
    links: {
        name: string;
        url_slug: string;
        url: string;
        categories: {
            name: string;
        }
    }[];
}

export interface SingleLink {
    id: number;
    name: string;
    url: string;
    description: string;
    created_at: string;
    categories: {
      name: string;
    }
}

export interface SingleLinkSubmission {
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
    };
};

export interface SubmittedLinksArray {
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
    };
}[];

export interface SearchResults {
    result: {
        name: string;
        url_slug: string;
        category_name: string;
    }[];
};