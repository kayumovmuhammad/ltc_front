import { Avatar } from "@mui/material";
import { useLocation } from "react-router-dom";


const DashboardHeader = () => {
    const { pathname } = useLocation();

    if (pathname.startsWith("/admin")) return null;

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Доброе утро";
        if (hour < 18) return "Добрый день";
        return "Добрый вечер";
    };

    return (
        <header className="flex items-center justify-between px-6 py-4 md:px-8 lg:px-12">
            <div className="animate-fade-in">
                <h1 className="text-2xl font-semibold text-foreground md:text-3xl">
                    {getGreeting()}, <span className="text-primary">Алекс!</span>
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Обзор использования ваших данных
                </p>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <Avatar
                    sx={{
                        width: 48,
                        height: 48,
                        bgcolor: 'hsl(270, 60%, 50%)',
                        fontSize: '1.125rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                        '&:hover': {
                            transform: 'scale(1.05)',
                            boxShadow: '0 4px 20px -4px hsl(270 60% 50% / 0.4)',
                        },
                    }}
                >
                    А
                </Avatar>
            </div>
        </header>
    );
};

export default DashboardHeader;
