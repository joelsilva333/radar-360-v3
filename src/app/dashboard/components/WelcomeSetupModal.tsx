"use client";

import Image from "next/image";

interface WelcomeSetupModalProps {
  onStart?: () => void;
  onClose?: () => void;
}

export default function WelcomeSetupModal({
  onStart,
  onClose,
}: WelcomeSetupModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative flex w-187 flex-col rounded-lg bg-white p-6 shadow-lg items-center justify-center gap-4">
        <button
          className="absolute top-4 right-4 hover:bg-gray-100 p-1 cursor-pointer transition-all duration-300"
          onClick={onClose}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M18 6L6.00081 17.9992M17.9992 18L6 6.00085"
              stroke="#2E2E2E"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <Image
          src="/images/logos/logo-blue.svg"
          alt="Logo"
          width={130}
          height={40}
        />

        <div className="flex flex-col items-center justify-center">
          <h1 className="text-center text-xl font-medium text-cinza">
            Bem-vindo ao RADAR 360
          </h1>

          <p className="text-center text-sm font-normal text-cinza-2">
            Antes de começar, configure o ambiente de governança da sua
            organização. Esta configuração inicial define a indústria, as
            jurisdições, os frameworks, a taxonomia de risco e a matriz de
            avaliação, a base sobre a qual todos os módulos da plataforma vão
            operar.
          </p>
        </div>

        <button
          type="button"
          onClick={onStart}
          className="btn-primary w-full">
          <Image
            src="/icons/config.svg"
            alt="Iniciar configuração"
            width={20}
            height={20}
          />
          Iniciar configuração
        </button>
      </div>
    </div>
  );
}
