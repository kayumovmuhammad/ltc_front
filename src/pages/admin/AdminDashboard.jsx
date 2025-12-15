import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { CircularProgress } from "@mui/material";
import { IoSparkles } from "react-icons/io5";
import { API_URL } from "../../config";
import AIResponseModal from "../../components/admin/AIResponseModal";

const COLORS = ["#2e1065", "#4c1d95", "#5b21b6", "#6d28d9", "#1e1b4b", "#312e81"];

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState(-1);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAnimating, setIsAnimating] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [aiResponse, setAiResponse] = useState("");
    const [isLoadingAI, setIsLoadingAI] = useState(false);
    const [aiError, setAiError] = useState(null);

    useEffect(() => {
        fetch(`${API_URL}/view_categories`)
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch statistics");
                return res.json();
            })
            .then(fetchedData => {
                // Assuming endpoint returns array of { name: "Category", value: 123 }
                // Or adapt accordingly. Mapping colors here.
                const dataWithColors = fetchedData.categories.map((item, index) => ({
                    name: item.category,
                    value: item.count,
                    color: COLORS[index % COLORS.length]
                }));
                setData(dataWithColors);
            })
            .catch(err => {
                console.error("Error fetching stats:", err);
                setError("Не удалось загрузить статистику");
            })
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (!loading) {
            const timer = setTimeout(() => setIsAnimating(false), 2300); // Wait for animation to finish
            return () => clearTimeout(timer);
        }
    }, [loading]);

    const onPieEnter = (_, index) => {
        setActiveIndex(index);
    };

    const onPieClick = (_, index) => {
        navigate(`/admin/category/${data[index].name}`);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <CircularProgress />
            </div>
        );
    }

    if (error && data.length === 0) {
        return <div className="text-center text-red-500 mt-10">{error}</div>;
    }

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Статистика жалоб</h2>
                <motion.button
                    whileHover={{ scale: isLoadingAI ? 1 : 1.02, y: isLoadingAI ? 0 : -2 }}
                    whileTap={{ scale: isLoadingAI ? 1 : 0.98 }}
                    onClick={async () => {
                        if (isLoadingAI) return;
                        setIsLoadingAI(true);
                        setAiError(null);
                        try {
                            const response = await fetch("http://localhost:8000/recommend/");
                            if (!response.ok) throw new Error("Failed to fetch AI response");
                            const data = await response.json();
                            setAiResponse(data.recommendations || data.message || JSON.stringify(data, null, 2));
                            setIsModalOpen(true);
                        } catch (err) {
                            console.error("Error fetching AI response:", err);
                            setAiError("Не удалось получить ответ от AI агента");
                        } finally {
                            setIsLoadingAI(false);
                        }
                    }}
                    disabled={isLoadingAI}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-xl font-medium shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isLoadingAI ? (
                        <>
                            <CircularProgress size={18} thickness={5} sx={{ color: 'white' }} />
                            <span>Загрузка...</span>
                        </>
                    ) : (
                        <>
                            <IoSparkles className="text-lg" />
                            <span>AI Ответ</span>
                        </>
                    )}
                </motion.button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-auto w-full"
                >
                    <h3 className="text-lg font-semibold mb-4 text-gray-700">Категории</h3>
                    <div className="flex-grow flex flex-col items-center">
                        <div className={`w-full h-[300px] ${isAnimating ? "pointer-events-none" : ""}`}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        activeIndex={activeIndex}
                                        activeShape={{
                                            fillOpacity: 1,
                                            scale: 1.1,
                                        }}
                                        data={data}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="value"
                                        onMouseEnter={isAnimating ? undefined : onPieEnter}
                                        onClick={onPieClick}
                                        cursor="pointer"
                                        paddingAngle={5}
                                    >
                                        {data.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={entry.color}
                                                stroke="none"
                                                style={{
                                                    outline: 'none',
                                                    transition: 'all 0.3s ease'
                                                }}
                                            />
                                        ))}
                                    </Pie>
                                    {!isAnimating && <Tooltip />}
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 content-start">
                    {data.map((cat, idx) => (
                        <motion.div
                            key={cat.name}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05 }}
                            className="bg-white p-3 rounded-xl border border-gray-100 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors group"
                            onClick={() => navigate(`/admin/category/${cat.name}`)}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-2.5 h-2.5 rounded-full ring-2 ring-white shadow-sm" style={{ backgroundColor: cat.color }}></div>
                                <span className="font-medium text-sm text-gray-600 group-hover:text-gray-900 transition-colors capitalize">{cat.name}</span>
                            </div>
                            <span className="text-base font-bold text-gray-800 bg-gray-50 px-2 py-0.5 rounded-md group-hover:bg-white group-hover:shadow-sm transition-all">{cat.value}</span>
                        </motion.div>
                    ))}
                </div>
            </div>

            {aiError && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                    {aiError}
                </div>
            )}

            <AIResponseModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                content={aiResponse}
                isLoading={isLoadingAI}
            />
        </div>
    );
}
