"use client";

import { CustomFramework } from "@/core/types/setup";
import { useState, useMemo } from "react";
import AddFrameworkModal from "./AddFrameworkModal";

export interface FrameworkOption {
  id: string;
  name: string;
  description: string;
  isSuggested?: boolean;
}

export interface FrameworkSelectorProps {
  selectedIds?: string[];
  onSelect: (ids: string[]) => void;
  /** Frameworks criados pelo utilizador; ficam guardados pela página. */
  customFrameworks?: CustomFramework[];
  onAddCustomFramework: (framework: CustomFramework) => void;
}

export const INITIAL_FRAMEWORKS_DATA: FrameworkOption[] = [
  {
    id: "1",
    name: "ISO 31000",
    description: "Gestão de Risco",
    isSuggested: true,
  },
  {
    id: "2",
    name: "ISO 9001",
    description: "Gestão de Risco",
    isSuggested: true,
  },
  {
    id: "3",
    name: "RGPD",
    description: "Proteção de Dados",
    isSuggested: true,
  },
  { id: "4", name: "Basel III", description: "Capital & Liquidez" },
  { id: "5", name: "Solvência II", description: "Solvência de Seguradoras" },
  { id: "6", name: "DORA", description: "ROD" },
  { id: "7", name: "PCI DSS", description: "Segurança de Pagamentos" },
  { id: "8", name: "COSO ERM", description: "Controlo de Interno" },
  { id: "9", name: "NIS2", description: "Cibersegurança", isSuggested: true },
  { id: "10", name: "ISO 27001", description: "Segurança de Informação" },
  {
    id: "11",
    name: "ISO 14001",
    description: "Gestão Ambiental",
    isSuggested: true,
  },
  {
    id: "12",
    name: "ISO 45001",
    description: "Segurança e Saúde no Trabalho",
    isSuggested: true,
  },
  {
    id: "13",
    name: "ISO 50001",
    description: "Gestão de Energia",
    isSuggested: true,
  },
  { id: "14", name: "HACCP", description: "Segurança Alimentas" },
];

export default function FrameworkSelector({
  selectedIds = [],
  onSelect,
  customFrameworks = [],
  onAddCustomFramework,
}: FrameworkSelectorProps) {
  const frameworks = useMemo<FrameworkOption[]>(
    () => [...customFrameworks, ...INITIAL_FRAMEWORKS_DATA],
    [customFrameworks],
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggle = (id: string) => {
    const exists = selectedIds.includes(id);
    if (exists) {
      onSelect(selectedIds.filter((itemId) => itemId !== id));
    } else {
      onSelect([...selectedIds, id]);
    }
  };

  const handleAddCustomFramework = (data: {
    name: string;
    scope: string;
    file: File | null;
  }) => {
    const newId = `custom-${Date.now()}`;

    onAddCustomFramework({
      id: newId,
      name: data.name,
      description: data.scope,
    });
    onSelect([...selectedIds, newId]);
  };

  const filteredFrameworks = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return frameworks;

    return frameworks.filter(
      (item) =>
        item.name.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term),
    );
  }, [searchTerm, frameworks]);

  return (
    <div className="w-full space-y-6 text-slate-800 h-full overflow-y-auto relative font-inter">
      {/* Cabeçalho */}
      <div className="space-y-2">
        <h1 className="text-2xl font-medium text-cinza font-google-sans">
          Frameworks e regulamentações aplicáveis
        </h1>
        <p className="text-sm text-cinza-2">
          Sugerimos os mais comuns para a sua indústria. Ajuste a seleção e
          adicione frameworks personalizados se necessário.
        </p>
      </div>

      {/* Pesquisa + Botão de Abrir Modal */}
      <div className="flex items-center gap-3">
        <div className="flex-1 p-2.5 flex gap-2 items-center bg-white border border-line rounded-lg text-sm placeholder-cinza-2 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M14.1666 14.1667L17.5 17.5001"
              stroke="#2E2E2E"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667Z"
              stroke="#2E2E2E"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Pesquisa aqui..."
            className="w-full outline-none bg-transparent"
          />
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-primary hover:bg-primary/80 text-white font-medium text-sm rounded-lg transition-colors whitespace-nowrap shadow-sm">
          Adicionar frameworks
        </button>
      </div>

      {/* Renderização dos cards */}
      <div className="pt-2">
        {filteredFrameworks.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-sm">
            Nenhum framework encontrado para &quot;{searchTerm}&quot;.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredFrameworks.map((item) => {
              const isSelected = selectedIds.includes(item.id);

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleToggle(item.id)}
                  className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all duration-150 ${
                    isSelected
                      ? "border-primary bg-blue-50/40 shadow-sm"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}>
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                        isSelected
                          ? "bg-primary text-white"
                          : "bg-blue-50 text-primary"
                      }`}>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M10.8333 1.66675H9.16659C8.70634 1.66675 8.33325 2.03985 8.33325 2.50008V4.16675C8.33325 4.62698 8.70634 5.00008 9.16659 5.00008H10.8333C11.2935 5.00008 11.6666 4.62698 11.6666 4.16675V2.50008C11.6666 2.03985 11.2935 1.66675 10.8333 1.66675Z"
                          stroke="currentColor"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10.8333 15H9.16659C8.70634 15 8.33325 15.3731 8.33325 15.8333V17.5C8.33325 17.9602 8.70634 18.3333 9.16659 18.3333H10.8333C11.2935 18.3333 11.6666 17.9602 11.6666 17.5V15.8333C11.6666 15.3731 11.2935 15 10.8333 15Z"
                          stroke="currentColor"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M11.6667 3.33325H13.3334C14.5119 3.33325 15.1012 3.33325 15.4673 3.69937C15.8334 4.06549 15.8334 4.65474 15.8334 5.83325"
                          stroke="currentColor"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8.33341 3.33325H6.66675C5.48824 3.33325 4.89898 3.33325 4.53286 3.69937C4.16675 4.06549 4.16675 4.65474 4.16675 5.83325"
                          stroke="currentColor"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8.33341 16.6667H6.66675C5.48824 16.6667 4.89898 16.6667 4.53286 16.3007C4.16675 15.9345 4.16675 15.3452 4.16675 14.1667"
                          stroke="currentColor"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M11.6667 16.6667H13.3334C14.5119 16.6667 15.1012 16.6667 15.4673 16.3007C15.8334 15.9345 15.8334 15.3452 15.8334 14.1667"
                          stroke="currentColor"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8.33325 10H11.6666"
                          stroke="currentColor"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M17.5001 10.8333V9.16659C17.5001 8.70634 17.127 8.33325 16.6667 8.33325H15.0001C14.5398 8.33325 14.1667 8.70634 14.1667 9.16659V10.8333C14.1667 11.2935 14.5398 11.6666 15.0001 11.6666H16.6667C17.127 11.6666 17.5001 11.2935 17.5001 10.8333Z"
                          stroke="currentColor"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M5.83333 10.8333V9.16659C5.83333 8.70634 5.46023 8.33325 5 8.33325H3.33333C2.8731 8.33325 2.5 8.70634 2.5 9.16659V10.8333C2.5 11.2935 2.8731 11.6666 3.33333 11.6666H5C5.46023 11.6666 5.83333 11.2935 5.83333 10.8333Z"
                          stroke="currentColor"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-sm font-medium ${
                            isSelected ? "text-blue-900" : "text-slate-800"
                          }`}>
                          {item.name}
                        </span>

                        {item.isSuggested && (
                          <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider text-primary/80 bg-blue-100/70 rounded-full uppercase">
                            Sugerido
                          </span>
                        )}
                      </div>

                      <span className="text-xs font-medium text-slate-400 mt-0.5">
                        {item.description}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                      isSelected
                        ? "bg-primary border-primary text-white"
                        : "border-slate-300 bg-white"
                    }`}>
                    {isSelected && (
                      <svg
                        className="w-3 h-3 fill-current"
                        viewBox="0 0 20 20"
                        fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal */}
      <AddFrameworkModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddCustomFramework}
      />
    </div>
  );
}
