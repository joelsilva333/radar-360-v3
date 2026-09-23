"use client";

import Title from "@/app/dashboard/components/Title";
import {
  OrganizationUser,
  OWNER_LABEL,
  USER_ROLE_LABELS,
  USER_STATUS_LABELS,
  UserRole,
  UserStatus,
} from "@/core/types/user";
import { ArrowDown, ChevronDown, Plus, Search, User } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { MOCK_USERS } from "../data";
import {
  CopyLinkIcon,
  RemoveIcon,
  ResendIcon,
  RevokeIcon,
} from "./ActionIcons";
import InviteUserModal, { InviteUserData } from "./InviteUserModal";
import ProfileSelect from "./ProfileSelect";
import RowActions, { RowAction } from "./RowActions";
import StatusBadge from "./StatusBadge";

type SortKey = "name" | "email" | "profile" | "joinedAt" | "status";

type SortDirection = "asc" | "desc";

const COLUMNS: { key: SortKey; label: string }[] = [
  { key: "name", label: "Usuário" },
  { key: "email", label: "E-mail" },
  { key: "profile", label: "Perfil" },
  { key: "joinedAt", label: "Data da Entrada" },
  { key: "status", label: "Estado" },
];

/*
 * Formata a data a partir da string ISO, sem passar por `Date`. Assim o
 * resultado não depende do fuso horário e é igual no servidor e no cliente.
 */
const formatJoinedAt = (iso: string | null) => {
  const match = iso?.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);

  if (!match) return "Sem definição";

  const [, year, month, day, hour, minute] = match;

  return `${day}/${month}/${year} às ${hour}h${minute}`;
};

/*
 * Valor usado na ordenação de cada coluna. `null` fica sempre no fim.
 */
const getSortValue = (user: OrganizationUser, key: SortKey) => {
  switch (key) {
    case "profile":
      if (user.isOwner) return OWNER_LABEL;

      return user.roles.length > 0
        ? user.roles.map((role) => USER_ROLE_LABELS[role]).join(", ")
        : null;
    case "status":
      return USER_STATUS_LABELS[user.status];
    default:
      return user[key];
  }
};

export default function UsersManagement() {
  const [users, setUsers] = useState<OrganizationUser[]>(MOCK_USERS);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState<UserStatus | "">("");

  const [sort, setSort] = useState<{ key: SortKey; direction: SortDirection }>({
    key: "name",
    direction: "asc",
  });

  const [showInviteModal, setShowInviteModal] = useState(false);

  const visibleUsers = useMemo(() => {
    const term = search.trim().toLowerCase();

    const filtered = users.filter((user) => {
      const matchesSearch =
        !term ||
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term);

      const matchesStatus = !statusFilter || user.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

    return [...filtered].sort((a, b) => {
      const valueA = getSortValue(a, sort.key);
      const valueB = getSortValue(b, sort.key);

      if (valueA === valueB) return 0;
      if (valueA === null) return 1;
      if (valueB === null) return -1;

      const result = valueA.localeCompare(valueB, "pt");

      return sort.direction === "asc" ? result : -result;
    });
  }, [users, search, statusFilter, sort]);

  const handleSort = (key: SortKey) => {
    setSort((current) =>
      current.key === key
        ? { key, direction: current.direction === "asc" ? "desc" : "asc" }
        : { key, direction: "asc" },
    );
  };

  /*
   * -----------------------------------------
   * ACÇÕES SOBRE OS USUÁRIOS
   * -----------------------------------------
   */

  const updateUser = (id: string, changes: Partial<OrganizationUser>) => {
    setUsers((current) =>
      current.map((user) => (user.id === id ? { ...user, ...changes } : user)),
    );
  };

  const removeUser = (id: string) => {
    setUsers((current) => current.filter((user) => user.id !== id));
  };

  const handleRoleAssign = (user: OrganizationUser, role: UserRole) => {
    updateUser(user.id, { roles: [role] });

    toast.success(
      `Papel de ${user.name} definido como ${USER_ROLE_LABELS[role]}.`,
    );
  };

  /*
   * Enquanto não existe a rota de aceitação de convites, o link usa o id
   * do utilizador como token.
   */
  const copyInviteLink = async (user: OrganizationUser) => {
    const link = `${window.location.origin}/convite/${user.id}`;

    try {
      await navigator.clipboard.writeText(link);
      toast.success("Link do convite copiado.");
    } catch {
      toast.error("Não foi possível copiar o link do convite.");
    }
  };

  const getActions = (user: OrganizationUser): RowAction[] => {
    if (user.isOwner) return [];

    const resend: RowAction = {
      label: "Reenviar convite",
      icon: ResendIcon,
      onSelect: () => {
        updateUser(user.id, { status: "invited" });
        toast.success(`Convite reenviado para ${user.email}.`);
      },
    };

    const remove: RowAction = {
      label: "Remover",
      icon: RemoveIcon,
      destructive: true,
      onSelect: () => {
        removeUser(user.id);
        toast.success(`${user.name} foi removido da organização.`);
      },
    };

    switch (user.status) {
      case "invited":
        return [
          {
            label: "Copiar link do convite",
            icon: CopyLinkIcon,
            onSelect: () => copyInviteLink(user),
          },
          resend,
          {
            label: "Revogar o convite",
            icon: RevokeIcon,
            destructive: true,
            onSelect: () => {
              updateUser(user.id, { status: "revoked" });
              toast.success(`Convite para ${user.email} revogado.`);
            },
          },
          remove,
        ];

      case "active":
        return [
          {
            label: "Revogar acesso",
            icon: RevokeIcon,
            destructive: true,
            onSelect: () => {
              updateUser(user.id, { status: "revoked" });
              toast.success(`Acesso de ${user.name} revogado.`);
            },
          },
          remove,
        ];

      case "revoked":
        return [resend, remove];
    }
  };

  const handleInvite = (data: InviteUserData) => {
    const email = data.email.trim().toLowerCase();

    setUsers((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        name: `${data.firstName.trim()} ${data.lastName.trim()}`,
        email,
        jobTitle: data.jobTitle,
        isOwner: false,
        roles: data.roles,
        joinedAt: null,
        status: "invited",
      },
    ]);

    setShowInviteModal(false);

    toast.success(`Convite enviado para ${email}.`);
  };

  const hasFilters = search.trim() !== "" || statusFilter !== "";

  return (
    <>
      <div className="flex w-full flex-col gap-6 font-inter">
        <div className="flex items-start justify-between gap-4">
          <Title
            title="Usuários"
            subtitle="Convide membros, atribua papéis e faça a gestão de acessos da organização."
          />

          <button
            type="button"
            onClick={() => setShowInviteModal(true)}
            className="btn-primary shrink-0 px-4">
            <Plus
              aria-hidden
              size={20}
            />
            Convidar usuário
          </button>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex w-full max-w-122 items-center gap-2 rounded-lg border border-line px-3 py-2.5 transition-colors focus-within:border-primary">
            <Search
              aria-hidden
              size={18}
              className="shrink-0 text-cinza"
            />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Pesquisa aqui..."
              aria-label="Pesquisar usuários por nome ou e-mail"
              className="w-full text-sm text-cinza outline-none placeholder:text-cinza-3"
            />
          </div>

          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as UserStatus)}
              aria-label="Filtrar por estado"
              className="w-28 cursor-pointer appearance-none rounded-lg border border-line bg-white py-2.5 pr-8 pl-2 text-sm text-cinza-2 outline-none focus:border-primary">
              <option value="">Estado</option>
              {(Object.keys(USER_STATUS_LABELS) as UserStatus[]).map(
                (status) => (
                  <option
                    key={status}
                    value={status}>
                    {USER_STATUS_LABELS[status]}
                  </option>
                ),
              )}
            </select>

            <ChevronDown
              aria-hidden
              size={18}
              className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-cinza"
            />
          </div>
        </div>

        <div className="rounded-xl border border-line">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-line">
                {COLUMNS.map((column) => {
                  const isActive = sort.key === column.key;

                  return (
                    <th
                      key={column.key}
                      scope="col"
                      aria-sort={
                        isActive
                          ? sort.direction === "asc"
                            ? "ascending"
                            : "descending"
                          : "none"
                      }
                      className="px-3 py-2 font-normal">
                      <button
                        type="button"
                        onClick={() => handleSort(column.key)}
                        className={`inline-flex cursor-pointer items-center gap-2 transition-colors hover:text-cinza ${
                          isActive ? "text-cinza" : "text-cinza-2"
                        }`}>
                        {column.label}
                        <ArrowDown
                          aria-hidden
                          size={16}
                          className={`transition-transform ${
                            isActive && sort.direction === "desc"
                              ? "rotate-180"
                              : ""
                          }`}
                        />
                      </button>
                    </th>
                  );
                })}

                <th
                  scope="col"
                  className="w-14 px-3 py-2">
                  <span className="sr-only">Ações</span>
                </th>
              </tr>
            </thead>

            <tbody>
              {visibleUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-line last:border-b-0">
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2 text-cinza">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100">
                        <User
                          aria-hidden
                          size={14}
                          className="text-cinza"
                        />
                      </span>
                      {user.name}
                    </div>
                  </td>

                  <td className="px-3 py-3 text-cinza">{user.email}</td>

                  <td className="px-3 py-3">
                    <ProfileSelect
                      userName={user.name}
                      isOwner={user.isOwner}
                      roles={user.roles}
                      disabled={user.status === "revoked"}
                      onChange={(role) => handleRoleAssign(user, role)}
                    />
                  </td>

                  <td className="px-3 py-3 text-cinza">
                    {formatJoinedAt(user.joinedAt)}
                  </td>

                  <td className="px-3 py-3">
                    <StatusBadge status={user.status} />
                  </td>

                  <td className="px-3 py-3 text-right">
                    <RowActions
                      userName={user.name}
                      actions={getActions(user)}
                    />
                  </td>
                </tr>
              ))}

              {visibleUsers.length === 0 && (
                <tr>
                  <td
                    colSpan={COLUMNS.length + 1}
                    className="px-3 py-12 text-center">
                    <p className="font-medium text-cinza">
                      {hasFilters
                        ? "Nenhum usuário corresponde à pesquisa."
                        : "Ainda não há usuários na organização."}
                    </p>
                    <p className="mt-1 text-cinza-2">
                      {hasFilters
                        ? "Tente outro termo ou limpe o filtro de estado."
                        : "Convide o primeiro membro para começar."}
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showInviteModal && (
        <InviteUserModal
          existingEmails={users.map((user) => user.email.toLowerCase())}
          onClose={() => setShowInviteModal(false)}
          onInvite={handleInvite}
        />
      )}
    </>
  );
}
