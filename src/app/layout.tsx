import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "Radar 360 - Governança, Risco e Compliance de Nivel Enterprise",
  description:
    "O ambiente completo para gerir a governança da sua organização configuração, avaliações e auditoria, com performance e segurança de nível empresarial.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-PT"
      className={`h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
        />
        {children}
      </body>
    </html>
  );
}
