"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * `false` no servidor e durante a hidratação, `true` depois.
 *
 * Os dados do localStorage só ficam disponíveis após a hidratação. Usar este
 * hook evita tomar decisões (redirecionar, mostrar modais) com os valores
 * por defeito do servidor.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
