"use client"

import { Check, CheckCircle2, X } from "lucide-react"
import { toast } from "sonner"

interface SuccessToastProps {
    t: string | number
    title: string
    description: string
}

export function SuccessToast({ t, title, description }: SuccessToastProps) {
    return (
        <div className="flex items-start space-x-4 rounded-lg bg-[#1876D2] p-4 py-5 text-white shadow-lg pointer-events-auto w-[450px]">
            <div className="-mt-1 shrink-0 bg-white rounded-full p-1">
                <Check color="#1876D2" className="h-4 w-4 text-white" strokeWidth={3} />
            </div>
            <div className="flex-1 space-y-1">
                <p className="font-bold text-[16px] leading-none text-white">
                    {title}
                </p>
                <p className="text-[14px] text-white/90">
                    {description}
                </p>
            </div>
            <button
                onClick={() => toast.dismiss(t)}
                className="mt-0.5 shrink-0 rounded-md p-1 text-white hover:bg-white/20 transition-colors"
            >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
            </button>
        </div>
    )
}
