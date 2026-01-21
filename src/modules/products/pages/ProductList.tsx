import { useState } from "react";
import { ProductTable } from "../components/ProductTable";
import { ProductFilters } from "../components/ProductFilters";
import type { ProductFiltersState } from "../types";
import type { Product } from "../../../lib/api";
import { useDeleteProduct, useProducts } from "../hooks/userProducts";

export const ProductList = () => {
    const { data: products = [], isLoading, error } = useProducts();
    const { mutate: deleteProduct } = useDeleteProduct();
    const [filters, setFilters] = useState<ProductFiltersState>({
        search: "",
        category: "",
        isActive: "",
    });

    const filteredProducts = products.filter((product: Product) => {
        const matchSearch = product.name.toLowerCase().includes(filters.search.toLowerCase());
        const matchCategory = !filters.category || product.category === filters.category;
        const matchActive = filters.isActive === "" || product.isActive === (filters.isActive === "true");
        return matchSearch && matchCategory && matchActive;
    });

    if (isLoading) return <div className="text-center py-8">Cargando...</div>;
    if (error) return <div className="text-center py-8 text-red-600">Error al cargar productos</div>;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-semibold text-gray-900 mb-1">Gestión de Productos</h1>
                <p className="text-gray-600 text-sm">Administra tu catálogo de productos</p>
            </div>

            {/* Filters */}
            <ProductFilters filters={filters} products={products} onChange={setFilters} />

            {/* Table */}
            <ProductTable products={filteredProducts} onDelete={deleteProduct} />

            {/* Stats */}
            <div className="bg-white rounded border border-gray-200 p-4 flex justify-between items-center">
                <div>
                    <p className="text-gray-600 text-xs mb-1">Total de productos</p>
                    <p className="text-2xl font-semibold text-gray-900">{filteredProducts.length}</p>
                </div>
                <p className="text-xs text-gray-500">Filtrados</p>
            </div>
        </div>
    );
};
