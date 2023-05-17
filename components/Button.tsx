import { ButtonHTMLAttributes } from "react";

type Colors = "green" | "blue" | "defualt";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    color?: Colors;
}

export default function Button({ children, className, color, ...props }: ButtonProps) {
    const colorClasses: Record<Colors, string> = {
        green: "bg-green-500 hover:bg-green-400 avtive:bg-green-500",
        blue: "bg-blue-500 hover:bg-blue-400 avtive:bg-blue-500",
        defualt: "bg-rose-500 hover:bg-rose-400 avtive:bg-rose-500",
    };

    return (
        <button
            className={`w-full rounded-lg p-3 font-semibold text-white shadow-lg ${colorClasses[color || "defualt"]} ${
                className || ""
            }`}
            {...props}
        >
            {children}
        </button>
    );
}
