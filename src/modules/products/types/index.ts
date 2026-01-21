export type { ProductFormData } from "../schema/product.schema";

export interface ProductFiltersState {
    search: string;
    category: string;
    isActive: string;
}
