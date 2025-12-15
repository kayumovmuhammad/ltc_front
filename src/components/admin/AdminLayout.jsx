import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminLogin from "./AdminLogin";

export default function AdminLayout() {
    const [isAdmin, setIsAdmin] = useState(() => {
        return localStorage.getItem("admin_auth") === "true";
    });

    const handleLogin = (status) => {
        if (status) {
            localStorage.setItem("admin_auth", "true");
            setIsAdmin(true);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("admin_auth");
        setIsAdmin(false);
    };

    if (!isAdmin) {
        return <AdminLogin onLogin={handleLogin} />;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm p-4 px-8 flex justify-between items-center">
                <h1 className="text-xl font-bold text-gray-800">LTC Admin</h1>
                <button
                    onClick={handleLogout}
                    className="text-sm text-red-600 hover:text-red-800 font-medium"
                >
                    Logout
                </button>
            </nav>
            <div className="p-8">
                <Outlet />
            </div>
        </div>
    );
}
