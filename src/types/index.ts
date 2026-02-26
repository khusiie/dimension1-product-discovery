export interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    description: string;
    tags: string[];
}

export interface AskResponse {
    productIds: string[];
    summary: string;
}
