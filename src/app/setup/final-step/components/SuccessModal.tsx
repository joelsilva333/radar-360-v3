"use client";

interface SuccessModalProps {
  onGoToDashboard: () => void;
}

export default function SuccessModal({ onGoToDashboard }: SuccessModalProps) {
  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 font-inter">
      <div className="relative flex w-187 flex-col rounded-lg bg-white p-6 shadow-lg items-center justify-center gap-4 text-center">
       <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="60" height="60" rx="30" fill="#0E8D5F"/>
<path d="M18.7725 33.2076L24.3857 38.8208L41.2253 21.1793" stroke="white" stroke-width="1.41509" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

        <div className="flex flex-col items-center justify-center gap-1.5">
          <h1 className="text-xl font-medium text-cinza font-google-sans">
            Configuração concluída com sucesso!
          </h1>

          <p className="text-sm font-normal text-cinza-2">
            A tua estrutura de Governança foi validada e está pronta para
            alimentar os outros módulos.
          </p>
        </div>

        <button
          type="button"
          onClick={onGoToDashboard}
          className="btn-primary w-full">
          Ir para o Dashboard de Risco
        </button>

        <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50/70 text-left text-blue-900 text-sm leading-relaxed">
          <svg
            className="w-5 h-5 text-blue-600 shrink-0 mt-0.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <circle
              cx="12"
              cy="12"
              r="10"
            />
            <line
              x1="12"
              y1="8"
              x2="12"
              y2="12"
            />
            <line
              x1="12"
              y1="16"
              x2="12.01"
              y2="16"
            />
          </svg>
          <span>
            O Governance Hub continuará aprendendo com as tuas decisões e
            adaptará as regras à medida que novas jurisdições ou regulamentações
            surgirem.
          </span>
        </div>
      </div>
    </div>
  );
}
