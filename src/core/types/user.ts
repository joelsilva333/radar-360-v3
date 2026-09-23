export type UserStatus = "active" | "invited" | "revoked";

/*
 * Papéis que podem ser atribuídos a um utilizador. Um utilizador pode ter
 * vários. O proprietário não é um papel atribuível: é definido no registo
 * da empresa (`isOwner`).
 */
export type UserRole = "admin" | "risk-manager" | "auditor";

export interface OrganizationUser {
  id: string;
  name: string;
  email: string;
  jobTitle: string | null;
  isOwner: boolean;
  /** Vazio enquanto nenhum papel foi atribuído. */
  roles: UserRole[];
  /** Data ISO em que o utilizador entrou; `null` se ainda não entrou. */
  joinedAt: string | null;
  status: UserStatus;
}

export const USER_STATUS_LABELS: Record<UserStatus, string> = {
  active: "Ativo",
  invited: "Convite enviado",
  revoked: "Revogado",
};

export const OWNER_LABEL = "Proprietário";

export const USER_ROLE_LABELS: Record<UserRole, string> = {
  admin: "Administrador",
  "risk-manager": "Gestor de Risco",
  auditor: "Auditor",
};

export const USER_ROLES = Object.keys(USER_ROLE_LABELS) as UserRole[];

/*
 * Lista provisória de cargos até existir uma fonte no backend.
 */
export const JOB_TITLES = [
  "Presidente do Conselho de Administração",
  "Administrador Executivo",
  "Director Geral",
  "Director de Risco",
  "Director de Compliance",
  "Director Financeiro",
  "Auditor Interno",
  "Gestor de Risco",
  "Analista de Risco",
  "Técnico de Compliance",
];
