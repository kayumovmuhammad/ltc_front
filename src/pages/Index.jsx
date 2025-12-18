import { API_URL } from "../config";

import DashboardHeader from "../components/DashboardHeader";
import DataUsageChart from "../components/DataUsageChart";
import UsagePieChart from "../components/UsagePieChart";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MdTrendingUp, MdDownload } from "react-icons/md";

const responseFormatter = (resp) => {
    const monthly = resp;
    const monthly_done = [];
    for (let i = 0; i < monthly.length; i++) {
        monthly_done.push({
            "timestamp": monthly[i][5],
            "mb_usage": monthly[i][1],
            "mn_usage": monthly[i][2],
            "sms_usage": monthly[i][3],
        })
    }

    return monthly_done;
}

const Index = () => {
    const [usageType, setUsageType] = useState(0);
    const [monthlyData, setMonthlyData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        fetch(`${API_URL}/calc_expenses`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phone: "992917123456" }),
        }).then(res => {
            return res.json();
        }).then(data => {
            let result = responseFormatter(data.sorted_by_time);
            setMonthlyData(result);
        })
            .catch(err => setError(err))
            .finally(() => setLoading(false));
    }, []);

    const handleOptimizeTariff = () => {
        if (!monthlyData.length) return;

        // Data is weekly, so we take the last 4 weeks to approximate a month
        const last4Weeks = monthlyData.slice(-4);

        const totalUsage = last4Weeks.reduce((acc, week) => {
            return {
                mn_usage: acc.mn_usage + (week.mn_usage || 0),
                mb_usage: acc.mb_usage + (week.mb_usage || 0),
                sms_usage: acc.sms_usage + (week.sms_usage || 0)
            };
        }, { mn_usage: 0, mb_usage: 0, sms_usage: 0 });

        console.log("Calculated Monthly Usage (Last 4 Weeks):", totalUsage);

        const params = new URLSearchParams({
            minutes: totalUsage.mn_usage,
            mb: totalUsage.mb_usage,
            sms: totalUsage.sms_usage
        });

        navigate(`/calculator?minutes=${totalUsage.mn_usage}&sms=${totalUsage.sms_usage}&mb=${totalUsage.mb_usage}`);
    };

    const exportToCSV = () => {
        if (!monthlyData.length) return;

        // Add BOM for Excel UTF-8 compatibility
        let csvContent = "\uFEFF";

        // Headers
        csvContent += "Дата,МБ,Минуты,SMS\n";

        // Rows
        monthlyData.forEach(item => {
            const dateStr = item.timestamp ? new Date(item.timestamp).toLocaleDateString() : "Нет даты";
            // Check if usage fields exist, default to 0
            const mb = item.mb_usage || 0;
            const mn = item.mn_usage || 0;
            const sms = item.sms_usage || 0;

            csvContent += `${dateStr},${mb},${mn},${sms}\n`;
        });

        // Create blob and download
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `expenses_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const mass = ['sms', 'гб', 'мин.'];
    return (
        <div className="min-h-screen bg-background">
            <div className="mx-auto max-w-7xl">
                {/* <DashboardHeader /> */}
                <main className="px-6 py-6 mt-16 md:px-8 lg:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, staggerChildren: 0.1 }}
                        className="grid gap-6 lg:grid-cols-2"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="h-full"
                        >
                            <DataUsageChart usedDataType={mass[usageType]} data={monthlyData} loading={loading} />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <UsagePieChart usageType={usageType} setUsageType={setUsageType} data={monthlyData} loading={loading} />
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex justify-end mt-8 gap-4"
                    >
                        <button
                            onClick={exportToCSV}
                            disabled={loading || monthlyData.length === 0}
                            className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-2xl hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed transform duration-200"
                        >
                            <MdDownload className="text-xl" /> Экспорт CSV
                        </button>
                        <button
                            onClick={handleOptimizeTariff}
                            disabled={loading || monthlyData.length === 0}
                            className="flex items-center gap-2 bg-[#4c1d95] text-white px-6 py-3 rounded-2xl hover:bg-[#371569] transition-colors shadow-lg hover:shadow-xl text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed transform duration-200"
                        >
                            <MdTrendingUp className="text-xl" /> Подобрать тариф
                        </button>
                    </motion.div>
                </main>
            </div>
        </div>
    );
};

export default Index;
