import { OrganizationUser } from "@/core/types/user";

/*
 * Dados de exemplo enquanto não existe API de utilizadores.
 */
export const MOCK_USERS: OrganizationUser[] = [
  {
    id: "1",
    name: "José Vieira Nuno Leiria",
    email: "jose.leiria@agt.ao",
    jobTitle: "Director Geral",
    isOwner: true,
    roles: [],
    joinedAt: "2026-07-26T01:10:00",
    status: "active",
  },
  {
    id: "2",
    name: "Áureo Inácio",
    email: "aureo.inacio@agt.ao",
    jobTitle: null,
    isOwner: false,
    roles: [],
    joinedAt: null,
    status: "invited",
  },
  {
    id: "3",
    name: "Áureo Inácio",
    email: "aureo.inacio@agt.ao",
    jobTitle: null,
    isOwner: false,
    roles: [],
    joinedAt: null,
    status: "revoked",
  },
];
