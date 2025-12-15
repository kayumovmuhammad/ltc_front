import { useEffect, useState } from "react";
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
    AreaChart,
} from "recharts";
import { Skeleton } from "./ui/skeleton";

const fetchData = async () => {
    try {
        const response = await fetch("http://127.0.0.1:8000/calc_expenses", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phone: "992917123456" }),
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        console.log("Data received:", data);
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
};

const russianMonths = ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];

const formatTimestamp = (timestamp) => {
    const [year, month, day] = timestamp.split("T")[0].split("-");
    return `${parseInt(day)} ${russianMonths[parseInt(month) - 1]}`;
};

const CustomTooltip = ({ active, payload, label, type }) => {
    if (!active || !payload || !payload.length) return null;

    return (
        <div className="rounded-lg border border-border bg-white px-4 py-3 shadow-lg">
            <p className="text-sm font-medium text-foreground">{formatTimestamp(label)}</p>
            <p className="text-lg font-semibold text-primary">
                {payload[0].value.toLocaleString()} {typeFormatter(undefined, type)}
            </p>
        </div>
    );
};

const typeFormatter = (value, type) => {
    console.log("TYPE", type)
    const t = type.toLowerCase();

    if (!value) {
        if (t === "гб" || t === "мб") return 'mb';
        else if (t === "мин." || t === "мин") return 'mn';
        else if (t === "sms") { console.log("HERE"); return 'sms' };
    }

    if (t === "гб" || t === "мб") return `${(value / 1000)} ГБ`;
    if (t === "мин." || t === "sms") return `${value} ${type}`;
    return String(value);
};

//     return monthly_done;
// }

const DataUsageChart = ({ usedDataType, data = [], loading = false }) => {
    // const [monthlyData, setMonthlyData] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);

    // useEffect(() => {
    //     fetch("http://127.0.0.1:8000/calc_expenses", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ phone: "992917123456" }),
    //     }).then(res => {
    //         return res.json();
    //     }).then(data => {
    //         console.log(data.sorted_by_time);

    //         let result = responseFormatter(data.sorted_by_time);
    //         console.log(monthlyData)
    //         setMonthlyData(result);

    //         console.log(monthlyData)
    //     })
    //         .catch(err => setError(err))
    //         .finally(() => setLoading(false));
    // }, []);

    if (loading) {
        return (
            <div className="card-shadow animate-fade-in rounded-xl bg-white p-6">
                <div className="mb-6 space-y-2">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-4 w-32" />
                </div>
                <div className="h-[280px] w-full">
                    <Skeleton className="h-full w-full rounded-xl" />
                </div>
            </div>
        );
    }

    return (
        <div className="card-shadow animate-fade-in rounded-xl bg-white p-6 h-full flex flex-col" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-lg font-semibold text-foreground">Динамика использования</h2>
                    <p className="text-sm text-muted-foreground">За последний месяц</p>
                </div>
                <div className="flex items-center gap-2 bg-secondary/50 p-1 rounded-lg">
                    <button className="px-3 py-1 rounded-md text-xs font-medium bg-white shadow-sm transition-all">{usedDataType}</button>
                </div>
            </div>

            <div className="flex-grow min-h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="hsl(270, 60%, 50%)" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="hsl(270, 60%, 50%)" stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(260, 15%, 90%)" vertical={false} />

                        <XAxis
                            dataKey="timestamp"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "hsl(260, 10%, 45%)", fontSize: 12 }}
                            dy={10}
                            tickFormatter={formatTimestamp}
                        />

                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "hsl(260, 10%, 45%)", fontSize: 12 }}
                            tickFormatter={(value) => typeFormatter(Number(value), usedDataType)}
                            width={80}
                        />

                        <Tooltip content={<CustomTooltip type={usedDataType} />} />

                        <Area
                            type="monotone"
                            dataKey={`${typeFormatter(undefined, usedDataType)}_usage`}
                            stroke="hsl(270, 60%, 50%)"
                            strokeWidth={3}
                            fill="url(#colorUsage)"
                            dot={{ fill: "hsl(270, 60%, 50%)", strokeWidth: 2, stroke: "#fff", r: 4 }}
                            activeDot={{ fill: "hsl(270, 60%, 50%)", strokeWidth: 3, stroke: "#fff", r: 6 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default DataUsageChart;
