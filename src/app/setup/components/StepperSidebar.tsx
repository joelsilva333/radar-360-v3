"use client";

import React from "react";

export interface Step {
  id: number;
  label: string;
}

interface StepperSidebarProps {
  steps?: Step[];
  currentStep: number;
  onSelectStep?: (stepId: number) => void;
}

const DEFAULT_STEPS: Step[] = [
  { id: 1, label: "Dados da Indústria" },
  { id: 2, label: "Dados da Jurisdições" },
  { id: 3, label: "Dados da Frameworks" },
  { id: 4, label: "Dados da Taxonomia" },
  { id: 5, label: "Dados da Matriz" },
];

export default function StepperSidebar({
  steps = DEFAULT_STEPS,
  currentStep,
  onSelectStep,
}: StepperSidebarProps) {
  return (
    <aside className="w-80 border-r border-slate-200 bg-white p-8 flex flex-col justify-between shrink-0 h-full">
      <div>
        <div className="mb-10">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">
            Configuração Inicial
          </h2>
          <p className="mt-1 text-sm font-medium text-slate-400">
            Passo {Math.min(currentStep, steps.length)} de {steps.length}
          </p>
        </div>

        <div className="relative flex flex-col gap-6">
          {steps.map((step, index) => {
            const isCompleted = step.id < currentStep;
            const isCurrent = step.id === currentStep;
            const isLast = index === steps.length - 1;

            return (
              <div
                key={step.id}
                className="relative flex items-center group">
                {!isLast && (
                  <div
                    className="absolute left-5.75 top-11 h-[calc(100%-8px)] w-0 border-l-2 border-dashed border-slate-200"
                    aria-hidden="true"
                  />
                )}

                <button
                  type="button"
                  onClick={() => isCompleted && onSelectStep?.(step.id)}
                  disabled={!isCompleted && !isCurrent}
                  className={`relative z-10 flex items-center focus:outline-none ${
                    isCompleted ? "cursor-pointer" : "cursor-default"
                  }`}>
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-full border-2 transition-all duration-200 ${
                      isCompleted
                        ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                        : isCurrent
                          ? "border-blue-600 bg-white text-blue-600 ring-4 ring-blue-50 font-semibold"
                          : "border-slate-200 bg-white text-slate-400"
                    }`}>
                    {isCompleted ? (
                      <svg
                        className="h-5 w-5 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2.5">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                    ) : (
                      <span className="text-sm font-medium">{step.id}</span>
                    )}
                  </div>

                  <span
                    className={`ml-4 text-sm transition-colors duration-200 text-left ${
                      isCompleted || isCurrent
                        ? "font-medium text-slate-800"
                        : "font-normal text-slate-400"
                    }`}>
                    {step.label}
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
