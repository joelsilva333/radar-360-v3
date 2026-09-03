import Logo from "@/app/ui/Logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen items-center justify-between overflow-hidden">
      <div className="w-1/2 h-full relative bg-[url('/images/auth/1.png')] bg-cover bg-center p-10 flex flex-col justify-between">
        <Logo type="primary" />

        <div className="flex flex-col gap-3.5 max-w-131.25 w-full">
          <h1 className="font-medium text-white text-4xl font-google-sans">
            Governança, Risco e Compliance de Nivel Enterprise
          </h1>
          <p className="font-normal text-white/60">
            O ambiente completo para gerir a governança da sua organização
            configuração, avaliações e auditoria, com performance e segurança de
            nível empresarial.
          </p>
        </div>
      </div>
      <div
        className="w-1/2 h-full flex flex-col items-center justify-center p-10 relative
      ">
        {children}

        <p className="absolute bottom-3 text-sm text-cinza-2 font-normal font-inter">
          © {new Date().getFullYear()} RADAR 360. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
}
