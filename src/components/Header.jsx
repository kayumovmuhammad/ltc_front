import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header() {
    const { pathname } = useLocation();
    const [scrolled, setScrolled] = useState(false);

    // Hide on admin pages
    if (pathname.startsWith("/admin")) return null;

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled
                ? "bg-white/80 backdrop-blur-md shadow-sm py-3"
                : "bg-transparent py-5"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 group">
                    <span className="text-xl font-bold text-slate-900 group-hover:text-[#4c1d95] transition-colors">
                        LTC <span className="text-[#4c1d95]">Solution</span>
                    </span>
                </Link>

                <nav>
                    <Link
                        to="/"
                        className="text-sm font-medium text-slate-600 hover:text-[#4c1d95] transition-colors px-4 py-2 rounded-full hover:bg-indigo-50"
                    >
                        На главную
                    </Link>
                </nav>
            </div>
        </header>
    );
}
