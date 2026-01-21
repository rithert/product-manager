export interface Product {
    id: string;
    name: string;
    sku: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    isActive: boolean;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const STORAGE_KEY = "product-manager.mockProducts";

const seedProducts: Product[] = [
    {
        id: "1",
        name: "Producto 1",
        sku: "PROD-001",
        description: "Descripción del producto",
        price: 99.99,
        category: "Electrónica",
        stock: 50,
        isActive: true,
    },
];

const loadProducts = (): Product[] => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(seedProducts));
            return [...seedProducts];
        }
        const parsed = JSON.parse(raw) as unknown;
        if (!Array.isArray(parsed)) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(seedProducts));
            return [...seedProducts];
        }
        if (parsed.length === 0) {
            // Mantener la app usable si el usuario borró todo
            localStorage.setItem(STORAGE_KEY, JSON.stringify(seedProducts));
            return [...seedProducts];
        }
        return parsed as Product[];
    } catch {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seedProducts));
        return [...seedProducts];
    }
};

const saveProducts = (products: Product[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};

export const productApi = {
    getAll: async () => {
        await delay(300);
        return { data: loadProducts() };
    },

    getById: async (id: string) => {
        await delay(300);
        const normalizedId = String(id);
        const product = loadProducts().find((p) => String(p.id) === normalizedId);
        if (!product) throw new Error("Producto no encontrado");
        return { data: product };
    },

    create: async (product: Omit<Product, "id">) => {
        await delay(300);
        const newProduct: Product = {
            ...product,
            id: Date.now().toString(),
        };
        const products = loadProducts();
        products.push(newProduct);
        saveProducts(products);
        return { data: newProduct };
    },

    update: async (id: string, product: Partial<Product>) => {
        await delay(300);
        const normalizedId = String(id);
        const products = loadProducts();
        const index = products.findIndex((p) => String(p.id) === normalizedId);
        if (index === -1) throw new Error("Producto no encontrado");
        products[index] = { ...products[index], ...product, id: products[index].id };
        saveProducts(products);
        return { data: products[index] };
    },

    delete: async (id: string) => {
        await delay(300);
        const normalizedId = String(id);
        const products = loadProducts();
        const index = products.findIndex((p) => String(p.id) === normalizedId);
        if (index === -1) throw new Error("Producto no encontrado");
        products.splice(index, 1);
        saveProducts(products);
        return { data: { success: true } };
    },
};
