export interface Product {
    name: string;
    price: number;
    quantity: number;
    icon?: string;
}

export interface UpdateStock {
    productName: string;
    quantity: number;
}
