import { USER_STATUS_LABELS, UserStatus } from "@/core/types/user";

const STATUS_STYLES: Record<UserStatus, string> = {
  active: "bg-green-50 text-green-700",
  invited: "bg-blue-1 text-primary-2",
  revoked: "bg-red-50 text-red-600",
};

export default function StatusBadge({ status }: { status: UserStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[status]}`}>
      {USER_STATUS_LABELS[status]}
    </span>
  );
}
