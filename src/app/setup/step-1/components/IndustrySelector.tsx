"use client";

import Image from "next/image";
import { useState, useMemo } from "react";

export interface IndustryOption {
  id: string;
  name: string;
  icon: string;
  category: string;
}

const INDUSTRIES_DATA: IndustryOption[] = [
  {
    id: "1",
    name: "Alimentar e Bebidas",
    icon: "",
    category: "INDÚSTRIA TRANSFORMADORA",
  },
  {
    id: "2",
    name: "Têxtil e Vestuário",
    icon: "",
    category: "INDÚSTRIA TRANSFORMADORA",
  },
  {
    id: "3",
    name: "Química e Petroquímica",
    icon: "",
    category: "INDÚSTRIA TRANSFORMADORA",
  },
  {
    id: "4",
    name: "Metalomecânica e Siderurgia",
    icon: "",
    category: "INDÚSTRIA TRANSFORMADORA",
  },
  {
    id: "5",
    name: "Madeira e Mobiliária",
    icon: "",
    category: "INDÚSTRIA TRANSFORMADORA",
  },
  {
    id: "6",
    name: "Papel, Gráfica e Editorial",
    icon: "",
    category: "INDÚSTRIA TRANSFORMADORA",
  },
  {
    id: "7",
    name: "Farmacêutica e Biotecnologia",
    icon: "",
    category: "INDÚSTRIA TRANSFORMADORA",
  },
  {
    id: "8",
    name: "Materiais de Construção",
    icon: "",
    category: "INDÚSTRIA TRANSFORMADORA",
  },
  {
    id: "9",
    name: "Eletrônica e Equipamentos Elétricos",
    icon: "",
    category: "INDÚSTRIA TRANSFORMADORA",
  },
  {
    id: "10",
    name: "Automotiva e Componentes",
    icon: "",
    category: "INDÚSTRIA TRANSFORMADORA",
  },
  {
    id: "11",
    name: "Plásticos e Borrachas",
    icon: "",
    category: "INDÚSTRIA TRANSFORMADORA",
  },
  {
    id: "12",
    name: "Cosméticos e Higiene",
    icon: "",
    category: "INDÚSTRIA TRANSFORMADORA",
  },

  {
    id: "13",
    name: "Mineração e Recursos Minerais",
    icon: "",
    category: "RECURSOS NATURAIS E ENERGIA",
  },
  {
    id: "14",
    name: "Petróleo e Gás",
    icon: "",
    category: "RECURSOS NATURAIS E ENERGIA",
  },
  {
    id: "15",
    name: "Carvão e Energia",
    icon: "",
    category: "RECURSOS NATURAIS E ENERGIA",
  },
  {
    id: "16",
    name: "Pedreiras e Matérias Inertes",
    icon: "",
    category: "RECURSOS NATURAIS E ENERGIA",
  },
  {
    id: "17",
    name: "Energia Elétrica e Renováveis",
    icon: "",
    category: "RECURSOS NATURAIS E ENERGIA",
  },
  {
    id: "18",
    name: "Água e Saneamento",
    icon: "",
    category: "RECURSOS NATURAIS E ENERGIA",
  },
  {
    id: "19",
    name: "Agricultura",
    icon: "",
    category: "AGRO, MAR E FLORESTA",
  },
  {
    id: "20",
    name: "Pecuária",
    icon: "",
    category: "AGRO, MAR E FLORESTA",
  },
  {
    id: "21",
    name: "Pescas e Aquacultura",
    icon: "",
    category: "AGRO, MAR E FLORESTA",
  },
  {
    id: "22",
    name: "Florestal e Madeira",
    icon: "",
    category: "AGRO, MAR E FLORESTA",
  },
  {
    id: "23",
    name: "Agroalimentar e Processamento",
    icon: "",
    category: "AGRO, MAR E FLORESTA",
  },
];

interface IndustrySelectorProps {
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export default function IndustrySelector({
  selectedId,
  onSelect,
}: IndustrySelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const groupedIndustries = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    const filtered = INDUSTRIES_DATA.filter(
      (item) =>
        item.name.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term),
    );

    return filtered.reduce<Record<string, IndustryOption[]>>((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {});
  }, [searchTerm]);

  const categories = Object.keys(groupedIndustries);

  return (
    <div className="w-full space-y-6 text-slate-800 h-full overflow-y-auto relative font-inter">
      <div className="space-y-2">
        <h1 className="text-2xl font-medium text-cinza font-google-sans">
          Qual é a sua indústria principal?
        </h1>
        <p className="text-sm text-cinza-2">
          Serve de base às sugestões inteligentes de frameworks e taxonomia da
          plataforma.
        </p>
      </div>

      <div className="sticky top-0 z-10 p-2.5 flex gap-2 items-center bg-white border border-line rounded-lg text-sm placeholder-cinza-2 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
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

      <div className="space-y-8 pt-2">
        {categories.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-sm">
            Nenhuma indústria encontrada para &quot;{searchTerm}&quot;.
          </div>
        ) : (
          categories.map((category) => (
            <div
              key={category}
              className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-cinza-2 tracking-wider uppercase">
                <Image
                  src="/icons/category/industry.svg"
                  alt={category}
                  width={20}
                  height={20}
                  className="w-5 h-5 object-contain"
                />
                <span>{category}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {groupedIndustries[category].map((item) => {
                  const isSelected = selectedId === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onSelect(item.id)}
                      className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all duration-150 ${
                        isSelected
                          ? "border-blue-500 bg-blue-50/40 shadow-sm"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}>
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <rect
                          width="32"
                          height="32"
                          rx="8"
                          fill="#E8F1FA"
                        />
                        <path
                          d="M8.5 23.5001C9.75 21.0001 10.5833 17.6667 10.5833 12.6667H16.4167C16.4167 17.6667 17.25 21.0001 18.5 23.5001"
                          stroke="#1850F5"
                          stroke-width="1.25"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M16 9.55412C16.9753 8.18996 18.2232 8.18996 19.1985 9.55412C19.7866 10.3912 20.5468 10.3602 21.1492 9.52313C22.1102 8.15896 23.358 8.15896 24.3333 9.52313"
                          stroke="#1850F5"
                          stroke-width="1.25"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M16.708 16.0593H19.6697C19.787 17.5911 19.6583 20.2636 22.4126 23.3499"
                          stroke="#1850F5"
                          stroke-width="1.25"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M7.66663 23.5H23.5"
                          stroke="#1850F5"
                          stroke-width="1.25"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>

                      <span
                        className={`text-sm font-medium ${
                          isSelected ? "text-blue-900" : "text-slate-700"
                        }`}>
                        {item.name}
                      </span>
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