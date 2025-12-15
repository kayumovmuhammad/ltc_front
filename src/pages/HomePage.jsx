import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MdCalculate, MdPieChart, MdArrowForward } from "react-icons/md";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-white relative overflow-hidden flex flex-col items-center justify-center p-6">
            {/* Abstract Background Shapes */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-200 rounded-full blur-[100px] opacity-30 animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-200 rounded-full blur-[100px] opacity-30 animate-pulse" style={{ animationDelay: "2s" }}></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative text-center z-10"
            >
                <div className="mb-2 inline-block px-4 py-1.5 rounded-full bg-white border border-indigo-100 shadow-sm">
                    <span className="text-sm font-semibold text-indigo-600 tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                        LTC SOLUTION
                    </span>
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
                    Личный <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4c1d95] to-[#7c3aed]">Кабинет LTC</span>
                </h1>

                <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                    Управляйте своими расходами и подбирайте идеальные тарифы с помощью наших интеллектуальных инструментов.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                    {/* Calculator Card */}
                    <Link to="/calculator" className="group">
                        <motion.div
                            whileHover={{ y: -5 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl border border-indigo-50 transition-all duration-300 relative overflow-hidden h-full"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <MdCalculate size={100} className="text-indigo-600 transform rotate-12" />
                            </div>

                            <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                                <MdCalculate size={32} />
                            </div>

                            <h3 className="text-2xl font-bold text-slate-800 mb-2 group-hover:text-indigo-700 transition-colors">
                                Калькулятор
                            </h3>
                            <p className="text-slate-500 mb-6">
                                Рассчитайте и подберите самый выгодный тариф для ваших нужд.
                            </p>

                            <div className="flex items-center text-indigo-600 font-semibold group-hover:translate-x-2 transition-transform">
                                Перейти <MdArrowForward className="ml-2" />
                            </div>
                        </motion.div>
                    </Link>

                    {/* Expenses Card */}
                    <Link to="/expences" className="group">
                        <motion.div
                            whileHover={{ y: -5 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl border border-purple-50 transition-all duration-300 relative overflow-hidden h-full"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <MdPieChart size={100} className="text-purple-600 transform -rotate-12" />
                            </div>

                            <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                                <MdPieChart size={32} />
                            </div>

                            <h3 className="text-2xl font-bold text-slate-800 mb-2 group-hover:text-purple-700 transition-colors">
                                Расходы
                            </h3>
                            <p className="text-slate-500 mb-6">
                                Аналитика ваших трат и детализация списаний по категориям.
                            </p>

                            <div className="flex items-center text-purple-600 font-semibold group-hover:translate-x-2 transition-transform">
                                Смотреть <MdArrowForward className="ml-2" />
                            </div>
                        </motion.div>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
