import { RouterProvider, createRouter, RootRoute, createRoute } from "@tanstack/react-router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProductList } from "./modules/products/pages/ProductList";
import { ProductCreate } from "./modules/products/pages/ProductCreate";
import { ProductEdit } from "./modules/products/pages/ProductEdit";
import { ProductDetail } from "./modules/products/pages/ProductDetail";
import RootLayout from "./routes/__root";

const queryClient = new QueryClient();

// Root route
const rootRoute = new RootRoute({
    component: RootLayout,
});

// Subrutas
const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: ProductList,
});

const nuevoRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/nuevo",
    component: ProductCreate,
});

const productoRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/productos/$id",
    component: ProductDetail,
});

const productoEditRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/productos/$id/editar",
    component: ProductEdit,
});

// Crear árbol de rutas
const routeTree = rootRoute.addChildren([indexRoute, nuevoRoute, productoRoute, productoEditRoute]);

// Crear router
const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </QueryClientProvider>
    );
}

export default App;
