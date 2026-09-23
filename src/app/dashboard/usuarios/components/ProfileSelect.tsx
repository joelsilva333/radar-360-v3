import {
  OWNER_LABEL,
  USER_ROLE_LABELS,
  USER_ROLES,
  UserRole,
} from "@/core/types/user";
import { ChevronDown } from "lucide-react";

interface ProfileSelectProps {
  userName: string;
  isOwner: boolean;
  roles: UserRole[];
  disabled?: boolean;
  onChange: (role: UserRole) => void;
}

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center rounded-full bg-blue-1 px-2 py-0.5 text-xs font-medium text-primary-2">
    {children}
  </span>
);

export default function ProfileSelect({
  userName,
  isOwner,
  roles,
  disabled = false,
  onChange,
}: ProfileSelectProps) {
  /*
   * O proprietário não pode ser alterado a partir da lista.
   */
  if (isOwner) {
    return <Badge>{OWNER_LABEL}</Badge>;
  }

  if (roles.length > 0) {
    return (
      <div className="flex flex-wrap gap-1">
        {roles.map((role) => (
          <Badge key={role}>{USER_ROLE_LABELS[role]}</Badge>
        ))}
      </div>
    );
  }

  return (
    <div className="relative inline-flex items-center">
      <select
        aria-label={`Papel de ${userName}`}
        value=""
        disabled={disabled}
        onChange={(e) => onChange(e.target.value as UserRole)}
        className="cursor-pointer appearance-none bg-transparent py-1 pr-6 text-sm text-primary outline-none focus-visible:underline disabled:cursor-not-allowed disabled:text-cinza-3">
        <option
          value=""
          disabled>
          Selecionar
        </option>

        {USER_ROLES.map((option) => (
          <option
            key={option}
            value={option}>
            {USER_ROLE_LABELS[option]}
          </option>
        ))}
      </select>

      <ChevronDown
        aria-hidden
        size={16}
        className={`pointer-events-none absolute right-0 ${
          disabled ? "text-cinza-3" : "text-primary"
        }`}
      />
    </div>
  );
}
