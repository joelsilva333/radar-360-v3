"use client";

import Image from "next/image";

interface EmailVerificationModalProps {
  email: string;
}

export default function EmailVerificationModal({
  email,
}: EmailVerificationModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-150 rounded-lg bg-white p-8 text-center shadow-xl flex flex-col justify-center items-center">
        <Image
          src="/icons/verify-email.svg"
          alt=""
          width={75}
          height={75}
          className="mb-5 p-1 bg-[#EEF7FF] rounded-full"
        />

        <div className="text-center w-full max-w-116 flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-cinza">
            Verifique o seu e-mail
          </h2>

          <p className="font-normal text-sm  text-cinza-2">
            Enviámos um link de validação para{" "}
            <strong className="font-semibold text-cinza">{email}</strong>.
            Confirme o endereço para continuar sem validação, o acesso à
            plataforma fica bloqueado.
          </p>
        </div>
      </div>
    </div>
  );
}
