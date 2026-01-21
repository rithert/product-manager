import { useParams, useNavigate } from "@tanstack/react-router";
import { useProductById } from "../hooks/userProducts";

export const ProductDetail = () => {
    const params = useParams({ strict: false });
    const id = typeof (params as Record<string, unknown>).id === "string" ? ((params as Record<string, unknown>).id as string) : "";
    const navigate = useNavigate();
    const { data: product, isLoading, error } = useProductById(id);

    if (isLoading) return <div className="text-center py-8">Cargando...</div>;
    if (error || !product)
        return (
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded border border-gray-200 p-6 text-center">
                    <p className="text-red-600 font-medium">Producto no encontrado</p>
                    <button onClick={() => navigate({ to: "/" })} className="mt-4 px-4 py-2 bg-gray-900 text-white rounded text-sm font-medium hover:bg-gray-800 transition">
                        Volver a la lista
                    </button>
                </div>
            </div>
        );

    return (
        <div className="max-w-3xl mx-auto">
            <button onClick={() => navigate({ to: "/" })} className="mb-6 text-gray-600 hover:text-gray-900 text-sm font-medium transition">
                ← Volver
            </button>

            <div className="bg-white rounded border border-gray-200">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200">
                    <h1 className="text-2xl font-semibold text-gray-900">{product.name}</h1>
                    <p className="text-gray-600 text-sm mt-1">SKU: {product.sku}</p>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                    {/* Info Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="bg-gray-50 rounded p-3 border border-gray-200">
                            <p className="text-gray-600 text-xs font-semibold mb-1">Precio</p>
                            <p className="text-lg font-semibold text-gray-900">${product.price.toFixed(2)}</p>
                        </div>

                        <div className="bg-gray-50 rounded p-3 border border-gray-200">
                            <p className="text-gray-600 text-xs font-semibold mb-1">Categoría</p>
                            <p className="text-sm font-semibold text-gray-900">{product.category}</p>
                        </div>

                        <div className="bg-gray-50 rounded p-3 border border-gray-200">
                            <p className="text-gray-600 text-xs font-semibold mb-1">Stock</p>
                            <p className="text-sm font-semibold text-gray-900">{product.stock}</p>
                        </div>

                        <div className="bg-gray-50 rounded p-3 border border-gray-200">
                            <p className="text-gray-600 text-xs font-semibold mb-1">Estado</p>
                            <span className={`text-xs font-semibold ${product.isActive ? "text-green-700" : "text-gray-700"}`}>{product.isActive ? "Activo" : "Inactivo"}</span>
                        </div>
                    </div>

                    {/* Descripción */}
                    <div className="bg-gray-50 rounded p-4 border border-gray-200">
                        <p className="text-gray-700 font-semibold text-sm mb-2">Descripción</p>
                        <p className="text-gray-700 text-sm leading-relaxed">{product.description}</p>
                    </div>

                    {/* Acciones */}
                    <div className="flex gap-3 pt-4 border-t">
                        <button onClick={() => navigate({ to: "/productos/$id/editar", params: { id: product.id } })} className="px-4 py-2 bg-gray-900 text-white rounded text-sm font-medium hover:bg-gray-800 transition">
                            Editar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
