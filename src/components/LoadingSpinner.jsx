// frontend/src/components/LoadingSpinner.jsx
import React from 'react';

export default function LoadingSpinner({ 
  message = "Loading...", 
  size = "h-12 w-12",         // e.g., "h-8 w-8", "h-16 w-16"
  borderColor = "border-purple-600", // e.g., "border-blue-500"
  textColor = "text-gray-600",   // e.g., "text-purple-700"
  textSize = "text-lg",        // e.g., "text-sm", "text-xl"
  minHeight = "min-h-[200px]"  // e.g., "min-h-[100px]" or "" for no min-height
}) {
  return (
    <div className={`flex flex-col justify-center items-center py-8 text-center ${minHeight}`}>
      <div className={`animate-spin rounded-full border-b-2 border-t-2 ${borderColor} ${size}`}></div>
      {message && <p className={`mt-3 ${textSize} ${textColor}`}>{message}</p>}
    </div>
  );
}