import { useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; // eslint-disable-line no-unused-vars
import { MdChatBubbleOutline, MdClose, MdSend, MdCheck } from "react-icons/md";
import { API_URL } from "../config";

export default function ComplaintWidget() {
    const { pathname } = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [complaint, setComplaint] = useState("");
    const [status, setStatus] = useState("idle"); // idle, sending, success, error

    const toggleOpen = () => {
        setIsOpen(!isOpen);
        if (!isOpen && status === "success") {
            setTimeout(() => setStatus("idle"), 100);
        }
    };

    const sendComplaint = async (text) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log("Complaint sent:", text);
                resolve(true);
            }, 1500);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!complaint.trim()) return;

        setStatus("sending");
        try {
            await sendComplaint(complaint);
            setStatus("success");
            setComplaint("");
            setTimeout(() => {
                setIsOpen(false);
                setStatus("idle");
            }, 2000);

            fetch(`${API_URL}/report_write`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "accept": "application/json",
                },
                body: JSON.stringify({
                    phone: localStorage.getItem("phone"),
                    details: complaint,
                    stars: 1,
                })
            })
        } catch (error) {
            console.error(error);
            setStatus("error"); // You could handle error state visually too
        }
    };

    if (pathname.startsWith("/admin")) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="mb-4 bg-white rounded-2xl shadow-2xl w-80 sm:w-96 overflow-hidden border border-gray-100"
                    >
                        <div className="bg-[#4c1d95] p-4 flex justify-between items-center">
                            <h3 className="text-white font-bold text-lg">Оставьте жалобу</h3>
                            <button
                                onClick={toggleOpen}
                                className="text-white/80 hover:text-white transition-colors"
                                aria-label="Close"
                            >
                                <MdClose size={24} />
                            </button>
                        </div>
                        <div className="p-6">
                            <p className="text-gray-600 text-sm mb-4">
                                Мы ценим ваше мнение. Пожалуйста, опишите проблему, с которой вы столкнулись.
                            </p>
                            <form onSubmit={handleSubmit}>
                                <textarea
                                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4c1d95] focus:border-transparent outline-none resize-none text-gray-700 bg-gray-50 min-h-[120px]"
                                    placeholder="Опишите вашу проблему..."
                                    value={complaint}
                                    onChange={(e) => setComplaint(e.target.value)}
                                    required
                                    disabled={status === "sending" || status === "success"}
                                />
                                <motion.button
                                    type="submit"
                                    disabled={status === "sending" || status === "success" || !complaint.trim()}
                                    animate={{
                                        backgroundColor: status === "success" ? "#10B981" : "#4c1d95",
                                        scale: status === "success" ? 1.02 : 1
                                    }}
                                    className={`mt-4 w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-shadow shadow-md hover:shadow-lg text-white ${(status === "sending" || (!complaint.trim() && status !== "success")) ? "opacity-70 cursor-not-allowed" : ""
                                        }`}
                                >
                                    {status === "sending" && "Отправка..."}
                                    {status === "success" && (
                                        <motion.div
                                            initial={{ scale: 0.5, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                            className="flex items-center gap-2"
                                        >
                                            Отправлено! <MdCheck size={20} />
                                        </motion.div>
                                    )}
                                    {status === "idle" && (
                                        <>
                                            Отправить <MdSend size={18} />
                                        </>
                                    )}
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                layout
                onClick={toggleOpen}
                className={`flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-colors focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-[#4c1d95] ${isOpen ? "bg-gray-200 text-gray-600 hover:bg-gray-300" : "bg-[#4c1d95] text-white hover:bg-[#371569]"
                    }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={isOpen ? "Close complaint form" : "Open complaint form"}
            >
                {isOpen ? <MdClose size={28} /> : <MdChatBubbleOutline size={28} />}
            </motion.button>
        </div>
    );
}
