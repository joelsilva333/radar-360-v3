"use client";

import { useCallback } from "react";
import { readStoredData, writeStoredData } from "../storage/registrationStorage";
import { SetupData } from "../types/setup";
import { useStoredValue } from "./useStoredValue";

export const SETUP_STORAGE_KEY = "setup_data";

const EMPTY_SETUP: Partial<SetupData> = {};

/**
 * Escolhas da configuração inicial guardadas no localStorage.
 *
 * `updateSetup` junta as alterações ao valor guardado no momento, para que
 * duas actualizações seguidas não se sobreponham.
 */
export function useSetupData() {
  const [setupData] = useStoredValue<SetupData>(SETUP_STORAGE_KEY, EMPTY_SETUP);

  const updateSetup = useCallback((changes: Partial<SetupData>) => {
    writeStoredData(SETUP_STORAGE_KEY, {
      ...readStoredData<SetupData>(SETUP_STORAGE_KEY),
      ...changes,
    });
  }, []);

  return [setupData, updateSetup] as const;
}
