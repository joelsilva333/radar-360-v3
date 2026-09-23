"use client";

import { useState } from "react";

export type MatrixSize = "3x3" | "4x4" | "5x5";

interface MatrixOption {
  size: MatrixSize;
  dimensions: number;
}

const MATRIX_OPTIONS: MatrixOption[] = [
  { size: "3x3", dimensions: 3 },
  { size: "4x4", dimensions: 4 },
  { size: "5x5", dimensions: 5 },
];

const LABELS = {
  "3x3": {
    impact: ["Baixa", "Media", "Alta"],
    probability: ["Alto", "Média", "Baixo"],
  },
  "4x4": {
    impact: ["Muito Baixo", "Baixo", "Médio", "Alto"],
    probability: ["Muito Alto", "Alto", "Médio", "Baixo"],
  },
  "5x5": {
    impact: ["Muito Baixo", "Baixo", "Médio", "Alto", "Muito Alto"],
    probability: ["Muito Alto", "Alto", "Médio", "Alto", "Muito Baixo"],
  },
};

interface RiskAssessmentMatrixProps {
  value?: MatrixSize | null;
  onChange?: (value: MatrixSize) => void;
}

export default function RiskAssessmentMatrix({
  value,
  onChange,
}: RiskAssessmentMatrixProps) {
  const [internalSize, setInternalSize] = useState<MatrixSize | null>("3x3");
  const [hoveredCell, setHoveredCell] = useState<{
    r: number;
    c: number;
  } | null>(null);

  const currentSize = value !== undefined ? value : internalSize;

  const handleSelect = (size: MatrixSize) => {
    if (value === undefined) {
      setInternalSize(size);
    }
    onChange?.(size);
  };

  const currentOption =
    MATRIX_OPTIONS.find((opt) => opt.size === currentSize) || MATRIX_OPTIONS[0];
  const dim = currentOption.dimensions;
  const labels = currentSize ? LABELS[currentSize] : LABELS["3x3"];

  const getCellColor = (rowIndex: number, colIndex: number, total: number) => {
    const probScore = (total - 1 - rowIndex) / (total - 1);
    const impactScore = colIndex / (total - 1);
    const riskScore = (probScore + impactScore) / 2;

    if (riskScore < 0.25) return "bg-emerald-600";
    if (riskScore < 0.6) return "bg-amber-500";
    if (riskScore < 0.8) return "bg-yellow-400";
    return "bg-red-600";
  };

  return (
    <div className="w-full max-w-4xl p-6 bg-white rounded-lg font-sans text-slate-700 select-none">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800">
          Matriz de avaliação de risco
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Defina a granularidade da matriz probabilidade × impacto.
          Pré-visualize antes de confirmar.
        </p>
      </div>

      {/* Seletores de Matriz */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {MATRIX_OPTIONS.map((option) => {
          const isSelected = currentSize === option.size;
          return (
            <button
              key={option.size}
              type="button"
              onClick={() => handleSelect(option.size)}
              className={`flex items-center p-3.5 rounded-xl border transition-all duration-200 text-left ${
                isSelected
                  ? "border-blue-600 bg-white ring-1 ring-blue-600"
                  : "border-slate-200 bg-slate-50/50 hover:border-slate-300"
              }`}>
              <div className="p-2 rounded-lg bg-slate-100 text-blue-600 mr-3">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M3.24268 16.7573C2.08331 15.5978 2.08331 13.7318 2.08331 9.99992C2.08331 6.26797 2.08331 4.40199 3.24268 3.24262C4.40205 2.08325 6.26803 2.08325 9.99998 2.08325C13.7319 2.08325 15.5979 2.08325 16.7573 3.24262C17.9166 4.40199 17.9166 6.26797 17.9166 9.99992C17.9166 13.7318 17.9166 15.5978 16.7573 16.7573C15.5979 17.9166 13.7319 17.9166 9.99998 17.9166C6.26803 17.9166 4.40205 17.9166 3.24268 16.7573Z"
                    stroke="#1850F5"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2.5 7.5H17.5"
                    stroke="#1850F5"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2.5 12.5H17.5"
                    stroke="#1850F5"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 7.5V12.5"
                    stroke="#1850F5"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <div className="font-semibold text-slate-800 text-sm">
                  Matriz {option.size}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  {option.dimensions * option.dimensions} níveis de exposição
                </div>
              </div>
              {isSelected && (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M18.3334 10.0001C18.3334 5.39771 14.6024 1.66675 10 1.66675C5.39765 1.66675 1.66669 5.39771 1.66669 10.0001C1.66669 14.6024 5.39765 18.3334 10 18.3334C14.6024 18.3334 18.3334 14.6024 18.3334 10.0001Z"
                    stroke="#1850F5"
                    strokeWidth="1.25"
                  />
                  <path
                    d="M6.66669 10.4167L8.75002 12.5L13.3334 7.5"
                    stroke="#1850F5"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="flex flex-col gap-2 h-88 justify-end pb-8 pl-8 relative">
        <div className="flex gap-2 absolute left-0 -bottom-5">
          <svg
            width="12"
            height="260"
            viewBox="0 0 12 260"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5.7735 0L-4.29153e-06 10H11.547L5.7735 0ZM4.7735 259C4.7735 259.552 5.22121 260 5.7735 260C6.32578 260 6.7735 259.552 6.7735 259H5.7735H4.7735ZM5.7735 9H4.7735V259H5.7735H6.7735V9H5.7735Z"
              fill="#E5E7EB"
            />
          </svg>

          <p className="-rotate-90 uppercase text-lg text-cinza-2">
            Probabilidade
          </p>
        </div>
        <div className="flex flex-col items-center gap-2 absolute -bottom-10 -left-5">
          <svg
            width="851"
            height="12"
            viewBox="0 0 851 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1 4.77356C0.447715 4.77356 0 5.22127 0 5.77356C0 6.32584 0.447715 6.77356 1 6.77356V5.77356V4.77356ZM851.001 5.77356L841.001 5.67436e-05V11.5471L851.001 5.77356ZM1 5.77356V6.77356H842.001V5.77356V4.77356H1V5.77356Z"
              fill="#E5E7EB"
            />
          </svg>

          <p className="text-lg uppercase text-cinza-2">Impacto</p>
        </div>

        <div
          className="grid gap-2 mb-1"
          style={{ gridTemplateColumns: `repeat(${dim}, minmax(0, 1fr))` }}>
          {labels.impact.map((label, i) => (
            <div
              key={i}
              className="text-center text-xs font-medium text-slate-500">
              {label}
            </div>
          ))}
        </div>

        {Array.from({ length: dim }).map((_, rowIndex) => (
          <div
            key={rowIndex}
            className="flex items-center gap-3">
            <div className="w-16 text-right text-xs font-medium text-slate-500 shrink-0">
              {labels.probability[rowIndex]}
            </div>

            <div
              className="grid gap-2 flex-1"
              style={{
                gridTemplateColumns: `repeat(${dim}, minmax(0, 1fr))`,
              }}>
              {Array.from({ length: dim }).map((_, colIndex) => {
                const isHovered =
                  hoveredCell?.r === rowIndex && hoveredCell?.c === colIndex;
                return (
                  <div
                    key={colIndex}
                    onMouseEnter={() =>
                      setHoveredCell({ r: rowIndex, c: colIndex })
                    }
                    onMouseLeave={() => setHoveredCell(null)}
                    className={`relative h-12 rounded-lg transition-all duration-150 cursor-pointer ${getCellColor(
                      rowIndex,
                      colIndex,
                      dim,
                    )}`}>
                    {isHovered && (
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 py-1 rounded-full shadow-md text-xs font-bold text-slate-800 z-10 animate-in fade-in zoom-in-95 duration-100">
                        {dim - rowIndex + colIndex}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
