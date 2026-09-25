"use client";

import Image from "next/image";
import { useState, useMemo } from "react";

export interface JurisdictionOption {
  id: string;
  name: string;
  code: string;
  region: string;
}

// 1. Defina e exporte a interface das Props aqui:
export interface OrganizationSelectorProps {
  selectedIds?: string[];
  onSelect: (ids: string[]) => void;
}

export const JURISDICTIONS_DATA: JurisdictionOption[] = [
  // Europa
  { id: "pt", name: "Portugal", code: "PT", region: "EUROPA" },
  { id: "es", name: "Espanha", code: "PT", region: "EUROPA" },
  { id: "fr", name: "França", code: "PT", region: "EUROPA" },
  { id: "de", name: "Alemanha", code: "PT", region: "EUROPA" },
  { id: "uk", name: "Reino Unido", code: "PT", region: "EUROPA" },
  { id: "be", name: "Bélgica", code: "PT", region: "EUROPA" },
  { id: "at", name: "Áustria", code: "PT", region: "EUROPA" },
  { id: "ie", name: "Irlanda", code: "PT", region: "EUROPA" },
  { id: "no", name: "Noruega", code: "PT", region: "EUROPA" },

  // África
  { id: "ao", name: "Angola", code: "PT", region: "ÁFRICA" },
  { id: "mz", name: "Moçambique", code: "PT", region: "ÁFRICA" },
  { id: "cv", name: "Cabo Verde", code: "PT", region: "ÁFRICA" },
  { id: "za", name: "África do Sul", code: "PT", region: "ÁFRICA" },
  { id: "na", name: "Namíbia", code: "PT", region: "ÁFRICA" },
  { id: "cd", name: "República Democrática do Congo", code: "PT", region: "ÁFRICA" },
  { id: "ng", name: "Nigéria", code: "PT", region: "ÁFRICA" },
  { id: "ie_af", name: "Irlanda", code: "PT", region: "ÁFRICA" },
  { id: "no_af", name: "Noruega", code: "PT", region: "ÁFRICA" },
];

// 2. Aplique a interface nas props da função do componente:
export default function OrganizationSelector({
  selectedIds = [],
  onSelect,
}: OrganizationSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleToggle = (id: string) => {
    const exists = selectedIds.includes(id);
    if (exists) {
      onSelect(selectedIds.filter((itemId) => itemId !== id));
    } else {
      onSelect([...selectedIds, id]);
    }
  };

  const groupedJurisdictions = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    const filtered = JURISDICTIONS_DATA.filter(
      (item) =>
        item.name.toLowerCase().includes(term) ||
        item.region.toLowerCase().includes(term) ||
        item.code.toLowerCase().includes(term)
    );

    return filtered.reduce<Record<string, JurisdictionOption[]>>((acc, item) => {
      if (!acc[item.region]) {
        acc[item.region] = [];
      }
      acc[item.region].push(item);
      return acc;
    }, {});
  }, [searchTerm]);

  const regions = Object.keys(groupedJurisdictions);

  return (
    <div className="w-full space-y-6 text-slate-800 h-full overflow-y-auto relative font-inter">
      <div className="space-y-2">
        <h1 className="text-2xl font-medium text-cinza font-google-sans">
          Onde é que a organização opera?
        </h1>
        <p className="text-sm text-cinza-2">
          Selecione uma ou mais jurisdições ativas países ou regiões sob os quais a organização está sujeita.
        </p>
      </div>

      <div className="sticky top-0 z-10 p-2.5 flex gap-2 items-center bg-white border border-line rounded-lg text-sm placeholder-cinza-2 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
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

      <div className="space-y-8 pt-2">
        {regions.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-sm">
            Nenhuma jurisdição encontrada para &quot;{searchTerm}&quot;.
          </div>
        ) : (
          regions.map((region) => (
            <div key={region} className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-cinza-2 tracking-wider uppercase">
                <Image
                  src="/icons/category/country.svg"
                  alt={region}
                  width={20}
                  height={20}
                  className="w-5 h-5 object-contain"
                />
                <span>{region}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {groupedJurisdictions[region].map((item) => {
                  const isSelected = selectedIds.includes(item.id);

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleToggle(item.id)}
                      className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all duration-150 ${
                        isSelected
                          ? "border-blue-500 bg-blue-50/40 shadow-sm"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      <div className="flex flex-col">
                        <span
                          className={`text-sm font-medium ${
                            isSelected ? "text-blue-900" : "text-slate-800"
                          }`}
                        >
                          {item.name}
                        </span>
                        <span className="text-xs font-medium text-slate-400 mt-0.5">
                          {item.code}
                        </span>
                      </div>

                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                          isSelected
                            ? "bg-blue-600 border-blue-600 text-white"
                            : "border-slate-300 bg-white"
                        }`}
                      >
                        {isSelected && (
                          <svg
                            className="w-3 h-3 fill-current"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
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
            </div>
          ))
        )}
      </div>
    </div>
  );
}