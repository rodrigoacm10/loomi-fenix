import { cn } from "@/lib/utils"
import { ComponentProps } from "react";

export default function Container({ children, className, ...props }: ComponentProps<'div'>) {
    return (
        <div className={cn("bg-[#171d30] max-w-[1370px] p-6 rounded-[20px] border-[#ffffff]/10 border-[1px]", className)} {...props}>
            {children}
        </div>
    );
}