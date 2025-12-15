import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "@/hooks/useAuth";
import { ToastProvider } from "@/hooks/useToast";
import { ToastContainer } from "@/components/ui/Toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ToastProvider>
        <Component {...pageProps} />
        <ToastContainer />
      </ToastProvider>
    </AuthProvider>
  );
}
