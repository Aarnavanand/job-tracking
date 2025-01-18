"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function Toast({ toast, onDismiss }) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (!isVisible) {
      const timer = setTimeout(() => {
        onDismiss()
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onDismiss])

  return (
    <div
      className={cn(
        "pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all",
        {
          "bg-white text-foreground": toast.type === "default",
          "bg-destructive text-destructive-foreground": toast.type === "error",
          "bg-green-500 text-white": toast.type === "success",
        },
        !isVisible && "opacity-0 translate-x-full"
      )}
    >
      <div className="grid gap-1">
        {toast.title && <h3 className="font-medium">{toast.title}</h3>}
        {toast.description && <p className="text-sm opacity-90">{toast.description}</p>}
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100"
      >
        <span className="sr-only">Close</span>
        <svg
          className="h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}

export function Toaster() {
  const { toasts, dismiss } = useToast()

  return (
    <div className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onDismiss={() => dismiss(toast.id)} />
      ))}
    </div>
  )
}