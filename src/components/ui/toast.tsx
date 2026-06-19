import { useEffect, useState } from "react";

let toastFn: (msg: string) => void;

export function toast(message: string) {
  if (toastFn) toastFn(message);
}

export function ToastContainer() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    toastFn = (msg: string) => {
      setMessage(msg);

      setTimeout(() => {
        setMessage("");
      }, 2000);
    };
  }, []);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-black px-4 py-2 text-sm text-white shadow-lg z-50">
      {message}
    </div>
  );
}