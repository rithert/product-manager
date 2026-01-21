import { useParams } from "@tanstack/react-router";
import { useProductById, useUpdateProduct } from "../hooks/userProducts";
import { ProductForm } from "../components/ProductForm";

export const ProductEdit = () => {
    const params = useParams({ strict: false });
    const id = typeof (params as Record<string, unknown>).id === "string" ? ((params as Record<string, unknown>).id as string) : "";
    const { data: product, isLoading } = useProductById(id);
    const { mutateAsync: updateProduct, isPending } = useUpdateProduct();

    if (isLoading) return <div className="text-center py-8 text-sm text-gray-600">Cargando...</div>;
    if (!product)
        return (
            <div className="max-w-md mx-auto">
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 text-center">
                    <p className="text-red-600 font-medium">Producto no encontrado</p>
                    <p className="text-gray-600 text-sm mt-1">Es posible que haya sido eliminado.</p>
                </div>
            </div>
        );

    const handleSubmit = async (data: Omit<typeof product, "id">) => {
        await updateProduct({ id, product: data });
    };

    return (
        <div className="max-w-md mx-auto space-y-4">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-5">
                <h1 className="text-lg font-semibold text-gray-900">Editar Producto</h1>
                <p className="text-gray-600 text-sm mt-1">Actualiza la información del producto</p>
            </div>
            <ProductForm initialData={product} onSubmit={handleSubmit} isLoading={isPending} />
        </div>
    );
};
