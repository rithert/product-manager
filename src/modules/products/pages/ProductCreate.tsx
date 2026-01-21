import { ProductForm } from "../components/ProductForm";
import { useCreateProduct } from "../hooks/userProducts";

export const ProductCreate = () => {
    const { mutateAsync: createProduct, isPending } = useCreateProduct();

    return (
        <div className="max-w-md mx-auto space-y-4">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-5">
                <h1 className="text-lg font-semibold text-gray-900">Crear Producto</h1>
                <p className="text-gray-600 text-sm mt-1">Agrega un nuevo producto a tu catálogo</p>
            </div>
            <ProductForm onSubmit={createProduct} isLoading={isPending} />
        </div>
    );
};
