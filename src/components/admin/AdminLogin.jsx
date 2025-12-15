import { useState } from "react";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars

export default function AdminLogin({ onLogin }) {
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === "admin") { // Simple hardcoded password for now
            onLogin(true);
        } else {
            setError(true);
            setTimeout(() => setError(false), 2000);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
            >
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Admin Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            className={`w-full p-4 border rounded-xl outline-none transition-all ${error ? "border-red-500 bg-red-50" : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                }`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-colors"
                    >
                        Access Dashboard
                    </button>
                </form>
            </motion.div>
        </div>
    );
}
