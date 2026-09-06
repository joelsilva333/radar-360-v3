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
    <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-sm font-sans text-slate-700 select-none">
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
                <div className="w-5 h-5 border-2 border-blue-600 rounded grid grid-cols-2 gap-0.5 p-0.5">
                  <div className="bg-blue-600 rounded-sm" />
                  <div className="bg-blue-600 rounded-sm" />
                  <div className="bg-blue-600 rounded-sm" />
                  <div className="bg-blue-600 rounded-sm" />
                </div>
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
                <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">
                  ✓
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Pré-visualização */}
      <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">
        <div className="w-4 h-4 border border-slate-400 rounded flex flex-col justify-between p-0.5">
          <div className="h-1 bg-slate-400 rounded-sm" />
          <div className="h-1 bg-slate-400 rounded-sm" />
        </div>
        Pré-visualização
      </div>

      <div className="relative pl-12 pb-12 pr-4 pt-4">
        {/* Eixo Y */}
        <div className="absolute left-0 top-0 bottom-12 w-8 flex items-center justify-center">
          <span className="-rotate-90 text-xs font-semibold text-slate-400 tracking-wider whitespace-nowrap">
            PROBABILIDADE
          </span>
          <div className="absolute left-2 top-2 bottom-2 w-px bg-slate-200">
            <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-slate-300 -rotate-45" />
          </div>
        </div>

        {/* Eixo X */}
        <div className="absolute left-12 right-0 bottom-0 h-8 flex flex-col items-center justify-center">
          <div className="absolute top-0 left-0 right-0 h-px bg-slate-200">
            <div className="absolute -right-1 -top-1 w-2 h-2 border-t border-r border-slate-300 rotate-45" />
          </div>
          <span className="text-xs font-semibold text-slate-400 tracking-wider mt-2">
            IMPACTO
          </span>
        </div>

        {/* Grid */}
        <div className="flex flex-col gap-2">
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
    </div>
  );
}
