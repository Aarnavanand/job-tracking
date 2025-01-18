"use client"

import { useEffect, useState } from "react"

const TOAST_TIMEOUT = 5000

export function useToast() {
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    const timer = setInterval(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => !toast.dismissed))
    }, 100)

    return () => clearInterval(timer)
  }, [])

  const toast = ({ title, description, type = "default", duration = TOAST_TIMEOUT }) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast = {
      id,
      title,
      description,
      type,
      dismissed: false
    }

    setToasts((prevToasts) => [...prevToasts, newToast])

    setTimeout(() => {
      setToasts((prevToasts) =>
        prevToasts.map((toast) =>
          toast.id === id ? { ...toast, dismissed: true } : toast
        )
      )
    }, duration)

    return id
  }

  const dismiss = (toastId) => {
    setToasts((prevToasts) =>
      prevToasts.map((toast) =>
        toast.id === toastId ? { ...toast, dismissed: true } : toast
      )
    )
  }

  return {
    toast,
    dismiss,
    toasts
  }
}