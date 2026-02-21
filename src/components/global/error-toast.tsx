"use client"

import { Check, X } from "lucide-react"
import { toast } from "sonner"

interface ErrorToastProps {
    t: string | number
    title: string
    description: string
}

export function ErrorToast({ t, title, description }: ErrorToastProps) {
    return (
        <div className="flex items-start space-x-4 rounded-lg bg-[#d21818ff] p-4 py-5 text-white shadow-lg pointer-events-auto w-[450px]">
            <div className="-mt-1 shrink-0 bg-white rounded-full p-1">
                <X color="#d21818ff" className="h-4 w-4 text-white" strokeWidth={3} />
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
