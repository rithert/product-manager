import { Link, Outlet } from "@tanstack/react-router";

function RootLayout() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Navbar */}
            <nav className="bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <Link to="/" className="text-gray-900 font-semibold text-lg hover:text-gray-700 transition">
                        📦 Product Manager
                    </Link>
                    <Link to="/nuevo" className="px-5 py-2 rounded text-sm font-medium text-gray-900 border border-gray-200 hover:bg-gray-50 transition">
                        + Nuevo
                    </Link>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
                <Outlet />
            </main>

            {/* Footer */}
            {/* <footer className="bg-white border-t border-gray-200 mt-16">
                <div className="max-w-7xl mx-auto px-6 py-6 text-center text-gray-600 text-xs">
                    <p>© 2024 Product Manager</p>
                </div>
            </footer> */}

            {/* Devtools (opcional): <TanStackRouterDevtools /> */}
        </div>
    );
}

export default RootLayout;
