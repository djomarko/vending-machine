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

export interface ProductPurchase {
    productName: string;
    payment: number;
}

export interface DispenseProduct {
    productName: string;
    change: number;
}
