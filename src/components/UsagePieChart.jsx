import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Skeleton } from "./ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";

/* const usageData = [
  { name: "SMS", value: 45, color: "hsl(168, 70%, 42%)" },
  { name: "Моб. данные", value: 35, color: "hsl(270, 60%, 50%)" },
  { name: "Голос. звонки", value: 20, color: "hsl(340, 65%, 55%)" },
]; */

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="rounded-lg border border-border bg-white px-4 py-3 shadow-lg">
                <p className="text-sm font-medium text-foreground">{payload[0].name}</p>
                <p className="text-lg font-semibold" style={{ color: payload[0].payload.color }}>
                    {payload[0].value}%
                </p>
            </div>
        );
    }
    return null;
};

const renderLegend = (props) => {
    const { payload } = props;
    return (
        <ul className="mt-4 flex flex-wrap justify-center gap-4">
            {payload.map((entry, index) => (
                <li key={`legend-${index}`} className="flex items-center gap-2">
                    <span
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: entry.color }}
                    />
                    <span className="text-sm text-muted-foreground">{entry.value}</span>
                </li>
            ))}
        </ul>
    );
};

//     return monthly_done;
// }

const UsagePieChart = ({ usageType, setUsageType, data = [], loading = false }) => {
    const [usageData, setUsageData] = useState([
        { name: "SMS", value: 45, color: "hsl(168, 70%, 42%)" },
        { name: "Моб. данные", value: 35, color: "hsl(270, 60%, 50%)" },
        { name: "Голос. звонки", value: 20, color: "hsl(340, 65%, 55%)" },
    ]);
    // const [monthlyData, setMonthlyData] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);

    useEffect(() => {
        if (!loading && data.length > 0) {
            setUsageData([{ name: "SMS", value: data[data.length - 1].sms_usage, color: "hsl(168, 70%, 42%)" },
            { name: "Моб. данные", value: data[data.length - 1].mb_usage / 600, color: "hsl(270, 60%, 50%)" },
            { name: "Голос. звонки", value: data[data.length - 1].mn_usage, color: "hsl(340, 65%, 55%)" }
            ])
        }
    }, [data, loading]);

    if (loading) {
        return (
            <div className="card-shadow animate-fade-in rounded-xl bg-white p-6">
                <div className="mb-6 space-y-2">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-4 w-32" />
                </div>
                <div className="h-[280px] w-full flex items-center justify-center">
                    <Skeleton className="h-[200px] w-[200px] rounded-full" />
                </div>
                <div className="mt-2 flex items-center justify-center">
                    <Skeleton className="h-6 w-64 rounded-lg" />
                </div>
            </div>
        );
    }

    return (
        <div className="card-shadow animate-fade-in rounded-xl bg-white p-6" style={{ animationDelay: '0.3s' }}>
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-foreground">Распределение использования</h2>
                <p className="text-sm text-muted-foreground">По типу услуги</p>
            </div>
            <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={usageData}
                            cx="50%"
                            cy="45%"
                            innerRadius={55}
                            outerRadius={90}
                            paddingAngle={3}
                            dataKey="value"
                            onClick={(_, index) => { console.log("INDEX", index); setUsageType(index) }}
                            stroke="none"
                        >
                            {usageData.map((entry, index) => {
                                const isSelected = index === usageType;
                                return (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.color}
                                        style={{
                                            filter: isSelected ? 'drop-shadow(0 8px 16px rgba(0,0,0,0.2))' : 'none',
                                            stroke: isSelected ? "white" : "none",
                                            strokeWidth: isSelected ? 3 : 0,
                                            transform: isSelected ? 'scale(1.1)' : 'scale(1)',
                                            transformOrigin: 'center',
                                            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)', // Spring-like bezier
                                            cursor: 'pointer',
                                            opacity: isSelected ? 1 : 0.8
                                        }}
                                    />
                                );
                            })}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend content={renderLegend} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-accent/10 py-2">
                <span className="h-2 w-2 rounded-full bg-accent" />
                <span className="text-sm font-medium text-accent">SMS — самая используемая услуга</span>
            </div>
        </div>
    );
};

export default UsagePieChart;
