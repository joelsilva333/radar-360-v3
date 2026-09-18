"use client";

import { useState } from "react";

export interface TaxonomyOption {
  id: string;
  title: string;
  description: string;
}

export interface RiskTaxonomySelectorProps {
  defaultValue?: string;
  onChange?: (selectedId: string) => void;
}

const TAXONOMY_OPTIONS: TaxonomyOption[] = [
  {
    id: "sim",
    title: "Sim",
    description:
      "Já existe uma taxonomia aprovada. Importar, avaliar e submeter a validação",
  },
  {
    id: "em-construcao",
    title: "Em construção",
    description:
      "Há uma base por consolidar. Continuar a definição a partir do modelo atual",
  },
  {
    id: "nao",
    title: "Não",
    description:
      "Ainda não há taxonomia. Construir a partir do contexto da organização.",
  },
];

export default function RiskTaxonomySelector({
  defaultValue = "sim",
  onChange,
}: RiskTaxonomySelectorProps) {
  const [selectedId, setSelectedId] = useState<string>(defaultValue);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    if (onChange) {
      onChange(id);
    }
  };

  return (
    <div className="w-full max-w-4xl space-y-6 font-inter text-slate-800">
      {/* Cabeçalho */}
      <div className="space-y-1.5">
        <h1 className="text-2xl font-medium tracking-tight text-slate-900">
          A organização possui uma Taxonomia de Risco formalmente definida?
        </h1>
        <p className="text-sm text-slate-500">
          A resposta determina o fluxo de configuração a executar.
        </p>
      </div>
 
      <div className="space-y-4">
        {TAXONOMY_OPTIONS.map((option) => {
          const isSelected = selectedId === option.id;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => handleSelect(option.id)}
              className={`w-full text-left px-3 py-8 overflow-y-auto rounded-2xl border transition-all duration-150 flex flex-col gap-3 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                isSelected
                  ? "border-blue-500 bg-blue-50/20 shadow-sm"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}>
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                  isSelected
                    ? "bg-blue-100/70 text-blue-600"
                    : "bg-blue-50 text-blue-500"
                }`}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <rect
                    width="20"
                    height="20"
                    fill="#E8F1FA"
                  />
                  <path
                    d="M15.8038 3.30381L14.5711 2.07115C14.4133 1.91332 14.3344 1.83441 14.241 1.78001C14.1762 1.74226 14.1066 1.71345 14.0341 1.69431C13.9296 1.66675 13.818 1.66675 13.5948 1.66675C12.5718 1.66675 12.0604 1.66675 11.6779 1.88366C11.4158 2.03228 11.1989 2.24916 11.0503 2.51123C10.8334 2.89371 10.8334 3.4052 10.8334 4.42817V5.41675C10.8334 6.58713 10.8334 7.17232 11.1143 7.5927C11.2359 7.77468 11.3921 7.93093 11.5741 8.05253C11.9945 8.33341 12.5796 8.33341 13.75 8.33341C14.9205 8.33341 15.5056 8.33341 15.926 8.05253C16.108 7.93093 16.2642 7.77468 16.3858 7.5927C16.6667 7.17232 16.6667 6.58017 16.6667 5.39587C16.6667 4.86791 16.6667 4.60393 16.5915 4.36218C16.5614 4.26536 16.5225 4.17147 16.4754 4.08171C16.3575 3.85761 16.173 3.67301 15.8038 3.30381Z"
                    stroke="#1850F5"
                    stroke-width="1.25"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M15.8038 13.3038L14.5711 12.0712C14.4133 11.9133 14.3344 11.8344 14.241 11.78C14.1762 11.7422 14.1066 11.7134 14.0341 11.6943C13.9296 11.6667 13.818 11.6667 13.5948 11.6667C12.5718 11.6667 12.0604 11.6667 11.6779 11.8837C11.4158 12.0322 11.1989 12.2492 11.0503 12.5112C10.8334 12.8937 10.8334 13.4052 10.8334 14.4282V15.4167C10.8334 16.5872 10.8334 17.1723 11.1143 17.5927C11.2359 17.7747 11.3921 17.9309 11.5741 18.0525C11.9945 18.3334 12.5796 18.3334 13.75 18.3334C14.9205 18.3334 15.5056 18.3334 15.926 18.0525C16.108 17.9309 16.2642 17.7747 16.3858 17.5927C16.6667 17.1723 16.6667 16.5802 16.6667 15.3958C16.6667 14.8679 16.6667 14.6039 16.5915 14.3622C16.5614 14.2653 16.5225 14.1715 16.4754 14.0817C16.3575 13.8576 16.173 13.673 15.8038 13.3038Z"
                    stroke="#1850F5"
                    stroke-width="1.25"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8.33337 5.00008H3.33337M3.33337 5.00008V1.66675M3.33337 5.00008V10.0001C3.33337 12.3571 3.33337 13.5356 4.06561 14.2678C4.79784 15.0001 5.97635 15.0001 8.33337 15.0001"
                    stroke="#1850F5"
                    stroke-width="1.25"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>

              {/* Textos */}
              <div className="space-y-1">
                <h3 className="text-base font-medium text-slate-900">
                  {option.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {option.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Banner Informativo */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50/70 text-blue-900 text-sm leading-relaxed">
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
          A taxonomia é a base da governação: define uma linguagem comum de
          risco e alimenta assessments, apetite, KRIs e reporting. Aqui
          recolhemos apenas a situação atual a configuração detalhada acontece
          depois no Governance Hub.
        </span>
      </div>
    </div>
  );
}
