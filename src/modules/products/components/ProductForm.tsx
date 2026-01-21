import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import type { Product } from "../../../lib/api";
import type { ProductFormData } from "../schema/product.schema";
import { productSchema } from "../schema/product.schema";

interface ProductFormProps {
    initialData?: Product;
    onSubmit: (data: ProductFormData) => Promise<any>;
    isLoading?: boolean;
}

export const ProductForm = ({ initialData, onSubmit, isLoading = false }: ProductFormProps) => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
        defaultValues: initialData
            ? {
                  name: initialData.name,
                  sku: initialData.sku,
                  description: initialData.description,
                  price: initialData.price,
                  category: initialData.category,
                  stock: initialData.stock,
                  isActive: initialData.isActive,
              }
            : {
                  isActive: true,
              },
    });

    const handleFormSubmit = async (data: ProductFormData) => {
        await onSubmit(data);
        navigate({ to: "/" });
    };

    const categories = ["Electrónica", "Ropa", "Libros", "Alimentos", "Hogar", "Otros"];

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-5">
                <div className="space-y-4">
                    {/* Nombre */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Nombre *</label>
                        <input type="text" {...register("name")} className={`w-full px-3 py-2 border rounded text-sm focus:outline-none focus:border-gray-400 transition ${errors.name ? "border-red-500 bg-red-50" : "border-gray-300"}`} placeholder="Nombre del producto" />
                        {errors.name && <span className="text-red-600 text-xs mt-0.5 block">{errors.name.message}</span>}
                    </div>

                    {/* SKU */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">SKU *</label>
                        <input type="text" {...register("sku")} className={`w-full px-3 py-2 border rounded text-sm focus:outline-none focus:border-gray-400 transition ${errors.sku ? "border-red-500 bg-red-50" : "border-gray-300"}`} placeholder="PROD-001" />
                        {errors.sku && <span className="text-red-600 text-xs mt-0.5 block">{errors.sku.message}</span>}
                    </div>

                    {/* Precio */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Precio *</label>
                        <input
                            type="number"
                            step="0.01"
                            {...register("price", {
                                valueAsNumber: true,
                            })}
                            className={`w-full px-3 py-2 border rounded text-sm focus:outline-none focus:border-gray-400 transition ${errors.price ? "border-red-500 bg-red-50" : "border-gray-300"}`}
                            placeholder="99.99"
                        />
                        {errors.price && <span className="text-red-600 text-xs mt-0.5 block">{errors.price.message}</span>}
                    </div>

                    {/* Stock */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Stock *</label>
                        <input
                            type="number"
                            {...register("stock", {
                                valueAsNumber: true,
                            })}
                            className={`w-full px-3 py-2 border rounded text-sm focus:outline-none focus:border-gray-400 transition ${errors.stock ? "border-red-500 bg-red-50" : "border-gray-300"}`}
                            placeholder="0"
                        />
                        {errors.stock && <span className="text-red-600 text-xs mt-0.5 block">{errors.stock.message}</span>}
                    </div>

                    {/* Categoría */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Categoría *</label>
                        <select {...register("category")} className={`w-full px-3 py-2 border rounded text-sm focus:outline-none focus:border-gray-400 transition cursor-pointer ${errors.category ? "border-red-500 bg-red-50" : "border-gray-300"}`}>
                            <option value="">Selecciona</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                        {errors.category && <span className="text-red-600 text-xs mt-0.5 block">{errors.category.message}</span>}
                    </div>

                    {/* Estado */}
                    <div className="flex items-center">
                        <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                            <input type="checkbox" {...register("isActive")} className="w-4 h-4 rounded border-gray-300 text-gray-900 cursor-pointer" />
                            <span className="text-sm font-medium text-gray-900">Activo</span>
                        </label>
                    </div>

                    {/* Descripción */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Descripción *</label>
                        <textarea {...register("description")} rows={3} className={`w-full px-3 py-2 border rounded text-sm focus:outline-none focus:border-gray-400 transition resize-none ${errors.description ? "border-red-500 bg-red-50" : "border-gray-300"}`} placeholder="Descripción del producto" />
                        {errors.description && <span className="text-red-600 text-xs mt-0.5 block">{errors.description.message}</span>}
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-3 sm:p-4">
                <div className="grid grid-cols-2 gap-3">
                    <button type="submit" disabled={isLoading} className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-semibold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition">
                        {isLoading ? "Guardando..." : "Guardar"}
                    </button>
                    <button type="button" onClick={() => navigate({ to: "/" })} className="w-full px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-semibold border border-gray-200 hover:bg-gray-50 transition">
                        Cancelar
                    </button>
                </div>
            </div>
        </form>
    );
};
