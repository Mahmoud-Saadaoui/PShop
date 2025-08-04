import { useState } from "react";
import { FiCheckCircle, FiXCircle, FiX } from "react-icons/fi";

const Alert = ({ message, type }) => {
  const [isAlertOpen, setIsAlertOpen] = useState(true);
  const onClose = () => {
    setIsAlertOpen(false)
  }

  const baseClass =
    "w-full flex items-start sm:items-center justify-between gap-3 sm:gap-4 rounded-md px-4 py-3 text-sm sm:text-base border shadow-sm";
  
  const alertTypeClass = {
    success: {
      bg: "bg-emerald-100/80 border-emerald-300 text-emerald-900",
      icon: <FiCheckCircle className="w-6 h-6 text-emerald-600"/>,
    },
    error: {
      bg: "bg-rose-100/80 border-rose-300 text-rose-900",
      icon: <FiXCircle className="w-6 h-6 text-rose-600" />
    },
  };
  const { bg, icon } = alertTypeClass[type] || alertTypeClass.success;

  if (!isAlertOpen) return null;
  return (
    <div className="absolute top-10 left-4 right-4 z-50">
      <div
        className={`w-full mx-4 sm:mx-0 rounded-md border shadow-lg p-4 flex items-start gap-4 ${bg}`}
      >
        {icon}
        <p className="flex-1 break-words leading-relaxed text-sm sm:text-base">
          {message}
        </p>
        <button
          onClick={onClose}
          aria-label="Close alert"
          className="text-inherit hover:opacity-80 transition-opacity"
        >
          <FiX className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

export default Alert