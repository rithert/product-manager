import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { productApi, type Product } from "../../../lib/api";

export const useProducts = () => {
    return useQuery({
        queryKey: ["products"],
        queryFn: () => productApi.getAll().then((res) => res.data),
    });
};

export const useProductById = (id: string) => {
    return useQuery({
        queryKey: ["product", id],
        queryFn: () => productApi.getById(id).then((res) => res.data),
        enabled: !!id,
    });
};

export const useCreateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (product: Omit<Product, "id">) => productApi.create(product),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            toast.success("Producto creado correctamente");
        },
        onError: () => {
            toast.error("Error al crear el producto");
        },
    });
};

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, product }: { id: string; product: Partial<Product> }) => productApi.update(id, product),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            queryClient.invalidateQueries({
                queryKey: ["product", variables.id],
            });
            toast.success("Producto actualizado correctamente");
        },
        onError: () => {
            toast.error("Error al actualizar el producto");
        },
    });
};

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => productApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            toast.success("Producto eliminado correctamente");
        },
        onError: () => {
            toast.error("Error al eliminar el producto");
        },
    });
};
