"use client";

import { EllipsisVertical } from "lucide-react";
import { ComponentType, SVGProps, useEffect, useRef, useState } from "react";

export interface RowAction {
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  onSelect: () => void;
  destructive?: boolean;
}

interface RowActionsProps {
  userName: string;
  actions: RowAction[];
}

export default function RowActions({ userName, actions }: RowActionsProps) {
  const [open, setOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  /*
   * Fecha o menu ao clicar fora ou ao carregar em Escape.
   */
  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const hasActions = actions.length > 0;

  return (
    <div
      ref={containerRef}
      className="relative inline-flex">
      <button
        type="button"
        aria-label={`Ações para ${userName}`}
        aria-haspopup="menu"
        aria-expanded={open}
        disabled={!hasActions}
        title={hasActions ? undefined : "Sem ações disponíveis"}
        onClick={() => setOpen((value) => !value)}
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-cinza transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:text-cinza-3 disabled:hover:bg-transparent">
        <EllipsisVertical
          aria-hidden
          size={18}
        />
      </button>

      {open && (
        <ul
          role="menu"
          className="absolute top-full right-0 z-20 mt-1 flex min-w-52 flex-col gap-1 rounded-lg bg-white p-2 shadow-[0_4px_24px_rgba(0,0,0,0.12)]">
          {actions.map(({ label, icon: Icon, onSelect, destructive }) => (
            <li
              key={label}
              role="none">
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setOpen(false);
                  onSelect();
                }}
                className={`flex w-full cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-left text-sm whitespace-nowrap transition-colors ${
                  destructive
                    ? "text-red-600 hover:bg-red-50"
                    : "text-cinza hover:bg-gray-50"
                }`}>
                <Icon
                  aria-hidden
                  className="shrink-0"
                />
                {label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
