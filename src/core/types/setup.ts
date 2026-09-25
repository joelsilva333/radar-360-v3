export type MatrixSize = "3x3" | "4x4" | "5x5";

export interface CustomFramework {
  id: string;
  name: string;
  description: string;
}

/**
 * Escolhas da configuração inicial, guardadas entre os passos.
 */
export interface SetupData {
  industryId: string;
  jurisdictionIds: string[];
  frameworkIds: string[];
  /** Frameworks criados pelo utilizador no passo 3. */
  customFrameworks: CustomFramework[];
  taxonomy: string;
  matrix: MatrixSize;
  /** Data ISO de conclusão. Enquanto não existir, o setup está pendente. */
  completedAt: string;
}
