"use client ";

import { Toaster } from "react-hot-toast";

export const ToastProvider = () => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        error: {
          style: {
            backgroundColor: "hsl(var(--destructive))",
            color: "hsl(var(--text))",
          },
        },
        success: {
          style: {
            backgroundColor: "hsl(var(--secondary))",
            color: "hsl(var(--text))",
          },
        },
      }}
    />
  );
};
