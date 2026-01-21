import type { Product } from "../../../lib/api";
import type { ProductFiltersState } from "../types";

interface ProductFiltersProps {
    filters: ProductFiltersState;
    products: Product[];
    onChange: (filters: ProductFiltersState) => void;
}

export const ProductFilters = ({ filters, products, onChange }: ProductFiltersProps) => {
    const categories = Array.from(new Set(products.map((p) => p.category))).sort();

    return (
        <div className="bg-white p-4 rounded border border-gray-200 space-y-3">
            <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Buscar</label>
                <input type="text" placeholder="Nombre del producto..." value={filters.search} onChange={(e) => onChange({ ...filters, search: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-gray-400 transition" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Categoría</label>
                    <select value={filters.category} onChange={(e) => onChange({ ...filters, category: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-gray-400 transition cursor-pointer">
                        <option value="">Todas</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Estado</label>
                    <select value={filters.isActive} onChange={(e) => onChange({ ...filters, isActive: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-gray-400 transition cursor-pointer">
                        <option value="">Todos</option>
                        <option value="true">Activos</option>
                        <option value="false">Inactivos</option>
                    </select>
                </div>
            </div>
        </div>
    );
};
