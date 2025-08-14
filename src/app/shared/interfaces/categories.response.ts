export interface iCategoriesResponse {
    id: number;
    name: string;
    description: string;
    created_at: string | Date;
    updated_at: string | Date;
    status: number;
}

export interface iCreateCategoryRequest   {
    name: string;
    description: string;
} 


export interface iCategoriesCreateResponse {
    success: boolean;
    message: string;
    data: iCategoryData;
}

export interface iCategoryData {
    id: number;
}