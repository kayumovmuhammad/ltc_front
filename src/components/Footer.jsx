import { useLocation, Link } from "react-router-dom";
import { MdPhone, MdEmail, MdLocationOn } from "react-icons/md";
import { FaFacebookF, FaInstagram, FaTelegramPlane, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
    const { pathname } = useLocation();

    // Hide footer on admin pages
    if (pathname.startsWith("/admin")) return null;

    return (
        <footer className="bg-[#1e1b4b] text-gray-300 py-12 border-t border-indigo-900/50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
                    {/* Brand Column */}
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-6 tracking-tight">
                            LTC <span className="text-indigo-400">Solution</span>
                        </h3>
                        <p className="text-sm leading-relaxed text-gray-400 mb-6">
                            Инновационные решения для управления связью. Подбирайте тарифы, контролируйте расходы и получайте максимум от своего оператора.
                        </p>
                        <div className="flex gap-4">
                            <SocialLink href="#" icon={<FaFacebookF />} />
                            <SocialLink href="#" icon={<FaInstagram />} />
                            <SocialLink href="#" icon={<FaTelegramPlane />} />
                            <SocialLink href="#" icon={<FaLinkedinIn />} />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-6">Навигация</h4>
                        <ul className="space-y-3 text-sm">
                            <li><FooterLink to="/">Главная</FooterLink></li>
                            <li><FooterLink to="/calculator">Калькулятор тарифов</FooterLink></li>
                            <li><FooterLink to="/expences">Анализ расходов</FooterLink></li>
                            <li><FooterLink to="#">О компании</FooterLink></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-6">Поддержка</h4>
                        <ul className="space-y-3 text-sm">
                            <li><FooterLink to="#">Помощь</FooterLink></li>
                            <li><FooterLink to="#">Частые вопросы</FooterLink></li>
                            <li><FooterLink to="#">Зона покрытия</FooterLink></li>
                            <li><FooterLink to="/admin">Для сотрудников</FooterLink></li>
                        </ul>
                    </div>

                    {/* Contacts */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-6">Контакты</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-3">
                                <MdPhone className="text-indigo-400 text-lg mt-0.5" />
                                <span>
                                    <span className="block text-white font-medium">7070</span>
                                    <span className="text-xs text-gray-500">Для абонентов LTC</span>
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <MdEmail className="text-indigo-400 text-lg mt-0.5" />
                                <a href="mailto:info@ltc.tj" className="hover:text-white transition-colors">info@ltc.tj</a>
                            </li>
                            <li className="flex items-start gap-3">
                                <MdLocationOn className="text-indigo-400 text-lg mt-0.5" />
                                <span>г. Душанбе, пр. Рудаки 34</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-indigo-900/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                    <p>© 2025 LTC Tajikistan. Все права защищены.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-gray-300 transition-colors">Политика конфиденциальности</a>
                        <a href="#" className="hover:text-gray-300 transition-colors">Условия использования</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function SocialLink({ href, icon }) {
    return (
        <a
            href={href}
            className="w-8 h-8 rounded-full bg-indigo-900/50 flex items-center justify-center text-indigo-300 hover:bg-indigo-600 hover:text-white transition-all duration-300"
        >
            {icon}
        </a>
    );
}

function FooterLink({ to, children }) {
    return (
        <Link to={to} className="hover:text-indigo-400 transition-colors inline-block hover:translate-x-1 duration-200">
            {children}
        </Link>
    );
}
