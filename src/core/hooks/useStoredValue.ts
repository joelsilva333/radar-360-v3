"use client";

import { useCallback, useRef, useSyncExternalStore } from "react";
import {
  getStoredSnapshot,
  subscribeToStoredValues,
  writeStoredData,
} from "../storage/registrationStorage";

/**
 * Lê um objeto guardado no localStorage como se fosse uma store externa.
 *
 * O localStorage não existe no servidor. Lê-lo durante o render (por exemplo
 * como valor inicial de `useState`) faz o servidor renderizar o `fallback` e
 * o cliente o valor guardado, o que provoca hydration mismatch e obriga o
 * React a regenerar a árvore. Com `useSyncExternalStore` o React usa
 * `getServerSnapshot` na hidratação e só depois troca para o valor real,
 * mantendo o HTML do servidor válido.
 *
 * O setter escreve no localStorage e notifica os subscritores, pelo que o
 * storage é a única fonte de verdade destes dados.
 */
export function useStoredValue<T extends object>(
  storageKey: string,
  fallback: Partial<T>,
): readonly [Partial<T>, (nextValue: Partial<T>) => void] {
  /*
   * O snapshot do servidor tem de ser estável (mesma referência em todas as
   * chamadas), por isso fica fixo no primeiro render.
   */
  const serverSnapshotRef = useRef(fallback);

  const getSnapshot = useCallback(
    () => getStoredSnapshot<T>(storageKey, serverSnapshotRef.current),
    [storageKey],
  );

  const getServerSnapshot = useCallback(
    () => serverSnapshotRef.current,
    [],
  );

  const storedValue = useSyncExternalStore(
    subscribeToStoredValues,
    getSnapshot,
    getServerSnapshot,
  );

  const setStoredValue = useCallback(
    (nextValue: Partial<T>) => {
      writeStoredData(storageKey, nextValue);
    },
    [storageKey],
  );

  return [storedValue, setStoredValue] as const;
}
