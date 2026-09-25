import { SetupData } from "../types/setup";

export const SETUP_STEP_PATHS: Record<number, string> = {
  1: "/setup/step-1",
  2: "/setup/step-2",
  3: "/setup/step-3",
  4: "/setup/step-4",
  5: "/setup/step-5",
  6: "/setup/final-step",
};

export const FINAL_SETUP_STEP = 6;

/**
 * Indica se o passo tem tudo o que é obrigatório preenchido.
 */
export function isSetupStepComplete(
  step: number,
  data: Partial<SetupData>,
): boolean {
  switch (step) {
    case 1:
      return !!data.industryId;
    case 2:
      return (data.jurisdictionIds?.length ?? 0) > 0;
    case 3:
      return (data.frameworkIds?.length ?? 0) > 0;
    case 4:
      return !!data.taxonomy;
    case 5:
      return !!data.matrix;
    case 6:
      return !!data.completedAt;
    default:
      return false;
  }
}

/**
 * Primeiro passo por preencher. Se os passos 1 a 5 estiverem completos,
 * devolve o passo final (resumo).
 */
export function getFirstIncompleteSetupStep(data: Partial<SetupData>): number {
  for (let step = 1; step < FINAL_SETUP_STEP; step++) {
    if (!isSetupStepComplete(step, data)) return step;
  }

  return FINAL_SETUP_STEP;
}
