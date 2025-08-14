export type ProductStatus = 'Active' | 'Inactive';

export interface iProductsResponse {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category_id: number | null;
  created_at: Date;
  updated_at: Date; 
  status: ProductStatus;
}

export interface iCreateProductResponse {
    id: number;
    name: string;
    description: string;
    price: string | string;
    stock: number;
    category_id: number;
    created_at: string | Date;
    updated_at: string | Date;
    status: number;
}

export interface iCreateProductRequest {
    name: string;
    description?: string;
    price: number;
    stock?: number;
    category_name: string;
}