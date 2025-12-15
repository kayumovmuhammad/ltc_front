import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { MdArrowBack, MdPhone, MdDateRange, MdDescription, MdDownload } from "react-icons/md";
import { CircularProgress } from "@mui/material";
import { API_URL } from "../../config";

export default function CategoryComplaints() {
    const { categoryName } = useParams();
    const navigate = useNavigate();
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch(`${API_URL}/view_by_category`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ category: categoryName }),
        })
            .then(res => {
                // if (!res.ok) throw Error("Failed to fetch complaints");
                return res.json();
            })
            .then(data => {
                setComplaints(data.reports.map((item) => {
                    return {
                        phone: item.phone,
                        date: item.report_date,
                        details: item.details,
                    }
                }));
            })
            .catch(err => {
                console.error("Error fetching complaints:", err);
                setError("Не удалось загрузить список жалоб");
            })
            .finally(() => setLoading(false));
    }, [categoryName]);

    const exportToCSV = () => {
        if (!complaints.length) return;

        // Add BOM for Excel UTF-8 compatibility
        let csvContent = "\uFEFF";

        // Headers
        csvContent += "Телефон,Дата,Детали\n";

        // Rows
        complaints.forEach(item => {
            const dateStr = item.date ? new Date(item.date).toLocaleDateString() : "Нет даты";
            // Escape quotes in details and wrap in quotes to handle commas/newlines
            const escapedDetails = item.details ? `"${item.details.replace(/"/g, '""')}"` : "";
            const phone = item.phone || "";

            csvContent += `${phone},${dateStr},${escapedDetails}\n`;
        });

        // Create blob and download
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `complaints_${categoryName}_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <CircularProgress />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <button
                    onClick={() => navigate("/admin")}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                    <MdArrowBack /> Назад к статистике
                </button>

                {complaints.length > 0 && (
                    <button
                        onClick={exportToCSV}
                        className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors shadow-sm font-medium text-sm"
                    >
                        <MdDownload className="text-lg" /> Экспорт CSV
                    </button>
                )}
            </div>

            <h2 className="text-3xl font-bold text-gray-800 mb-8">
                Жалобы: <span className="text-[#4c1d95] capitalize">{categoryName}</span>
            </h2>

            {error ? (
                <p className="text-red-500 text-center py-8 bg-red-50 rounded-xl">{error}</p>
            ) : (
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 animate-appear">
                    {complaints.map((complaint, index) => (
                        <motion.div
                            key={index}
                            className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col h-full group"
                        >
                            <div className="flex justify-between items-start mb-4 pb-4 border-b border-gray-50">
                                <div className="flex items-center gap-2 text-indigo-700 font-semibold bg-indigo-50 px-3 py-1 rounded-full text-sm">
                                    <MdPhone className="text-indigo-600" />
                                    <span>{complaint.phone || "Не указан"}</span>
                                </div>
                                <div className="flex items-center gap-1 text-gray-400 text-xs">
                                    <MdDateRange />
                                    <span>{complaint.date ? new Date(complaint.date).toLocaleDateString() : "Нет даты"}</span>
                                </div>
                            </div>

                            <div className="flex-grow">
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <MdDescription /> Детали жалобы
                                </h4>
                                <p className="text-gray-700 leading-relaxed text-sm">
                                    {complaint.details || "Нет описания."}
                                </p>
                            </div>


                        </motion.div>
                    ))}
                    {complaints.length === 0 && (
                        <div className="col-span-full text-center py-12">
                            <p className="text-gray-500 italic text-lg">Нет жалоб в этой категории.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
