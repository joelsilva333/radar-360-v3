"use client";

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
    <aside className="w-155 bg-primary-4 px-8 py-14 h-fit font-inter flex flex-col items-center justify-center overflow-y-auto">
      <div className="max-w-55.25 w-full flex flex-col gap-6 h-full">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-medium font-google-sans text-cinza">
            Configuração Inicial
          </h2>
          <p className="text-sm font-regular text-cinza-2">
            Passo {Math.min(currentStep, steps.length)} de {steps.length}
          </p>
        </div>

        <div className="relative flex flex-col gap-9">
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
                    className="absolute left-9.5 top-18 h-full w-0 border-l border-dashed border-cinza"
                    aria-hidden="true"
                  />
                )}

                <button
                  type="button"
                  onClick={() => isCompleted && onSelectStep?.(step.id)}
                  disabled={!isCompleted && !isCurrent}
                  className={`relative z-10 flex gap-4 items-center p-2  ${
                    isCompleted ? "cursor-pointer" : "cursor-default"
                  }`}>
                  <div
                    className={`flex min-w-15 min-h-15 items-center justify-center  rounded-full border transition-all duration-200 ${
                      isCompleted
                        ? "border-primary bg-primary min-h-12.5 min-w-12.5 text-white ring-4 ring-[#E8F1FA]"
                        : isCurrent
                          ? "border-line text-cinza-2 bg-white"
                          : "border-slate-200 bg-white text-cinza-2"
                    }`}>
                    {isCompleted ? (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M5 14L8.5 17.5L19 6.5"
                          stroke="white"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    ) : (
                      <span className="text-lg font-medium">{step.id}</span>
                    )}
                  </div>

                  <span
                    className={`transition-colors font-inter duration-200 text-left ${
                      isCompleted
                        ? "font-medium text-cinza"
                        : isCurrent
                          ? "font-normal text-cinza-2"
                          : "font-normal text-cinza-2"
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
