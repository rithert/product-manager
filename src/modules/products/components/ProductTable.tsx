import { useNavigate } from "@tanstack/react-router";
import type { Product } from "../../../lib/api";

interface ProductTableProps {
    products: Product[];
    onDelete: (id: string) => void;
}

export const ProductTable = ({ products, onDelete }: ProductTableProps) => {
    const navigate = useNavigate();

    const handleDelete = (id: string) => {
        if (confirm("¿Está seguro de que desea eliminar este producto?")) {
            onDelete(id);
        }
    };

    return (
        <div className="bg-white rounded border border-gray-200 overflow-x-auto">
            <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th className="px-4 py-3 text-left font-semibold text-gray-900">Nombre</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-900">SKU</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-900">Categoría</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-900">Precio</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-900">Stock</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-900">Estado</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-900">Acciones</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {products.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 text-gray-900 font-medium">{product.name}</td>
                            <td className="px-4 py-3 text-gray-600 font-mono text-xs">{product.sku}</td>
                            <td className="px-4 py-3 text-gray-600">{product.category}</td>
                            <td className="px-4 py-3 text-gray-900 font-medium">${product.price.toFixed(2)}</td>
                            <td className="px-4 py-3 text-gray-600">{product.stock}</td>
                            <td className="px-4 py-3">
                                <span className={`px-2 py-1 rounded text-xs font-medium ${product.isActive ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-700"}`}>{product.isActive ? "Activo" : "Inactivo"}</span>
                            </td>
                            <td className="px-4 py-3">
                                <div className="inline-flex flex-wrap gap-2">
                                    <button onClick={() => navigate({ to: "/productos/$id", params: { id: product.id } })} className="px-3 py-1.5 text-xs font-medium rounded border border-gray-300 bg-white text-black  hover:bg-gray-50 transition">
                                        Ver
                                    </button>
                                    <button onClick={() => navigate({ to: "/productos/$id/editar", params: { id: product.id } })} className="px-3 py-1.5 text-xs font-medium rounded border border-gray-300 bg-white text-black  hover:bg-gray-50 transition">
                                        Editar
                                    </button>
                                    <button onClick={() => handleDelete(product.id)} className="px-3 py-1.5 text-xs font-medium rounded border border-red-200 bg-white text-black hover:bg-red-50 transition">
                                        Eliminar
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {products.length === 0 && (
                <div className="text-center py-10">
                    <p className="text-gray-700 text-sm font-medium">No hay productos para mostrar</p>
                    <p className="text-gray-500 text-sm mt-1">Ajusta los filtros o crea un nuevo producto.</p>
                </div>
            )}
        </div>
    );
};
