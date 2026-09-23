"use client";

import { useCallback, useState } from "react";
import {
  RegisterStep1Data,
  RegisterNifData,
  CompleteRegistrationData,
} from "../types/register";
import { registerCompany } from "../api/auth";
import {
  REGISTRATION_STORAGE_KEYS,
  readStoredData,
  removeStoredData,
  writeStoredData,
} from "../storage/registrationStorage";

export function useRegistration() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Os leitores são estáveis (useCallback) para poderem ser usados como
   * dependência de efeitos sem provocar ciclos de render.
   *
   * Atenção: nunca chamar durante o render. O localStorage não existe no
   * servidor, e ler aqui dentro um `useState` inicial gera hydration mismatch.
   */
  const getStep1Data = useCallback(
    (): Partial<RegisterStep1Data> =>
      readStoredData<RegisterStep1Data>(REGISTRATION_STORAGE_KEYS.STEP_1),
    [],
  );

  const getNifData = useCallback(
    (): Partial<RegisterNifData> =>
      readStoredData<RegisterNifData>(REGISTRATION_STORAGE_KEYS.STEP_2),
    [],
  );

  // --- MÉTODOS DE GRAVAÇÃO (Salvam no localStorage) ---

  const saveStep1Data = useCallback((data: RegisterStep1Data) => {
    writeStoredData(REGISTRATION_STORAGE_KEYS.STEP_1, data);
  }, []);

  const saveNifData = useCallback((data: RegisterNifData) => {
    writeStoredData(REGISTRATION_STORAGE_KEYS.STEP_2, data);
  }, []);

  const clearRegistrationData = useCallback(() => {
    removeStoredData([
      REGISTRATION_STORAGE_KEYS.STEP_1,
      REGISTRATION_STORAGE_KEYS.STEP_2,
      REGISTRATION_STORAGE_KEYS.COMPLETE,
    ]);
  }, []);

  // --- ENVIO FINAL PARA O BACKEND ---

  const submitRegistration = useCallback(
    async (currentNifData: RegisterNifData) => {
      setLoading(true);
      setError(null);

      try {
        // 1. Salva a etapa atual no localStorage
        saveNifData(currentNifData);

        // 2. Consolida todos os dados do localStorage
        const step1 = getStep1Data();
        const completePayload: CompleteRegistrationData = {
          ...step1,
          ...currentNifData,
        } as CompleteRegistrationData;

        writeStoredData(REGISTRATION_STORAGE_KEYS.COMPLETE, completePayload);

        // 3. Executa a chamada no /core
        await registerCompany(completePayload);

        clearRegistrationData();

        setLoading(false);
        return { success: true as const };
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Falha no envio.";

        setLoading(false);
        setError(message);
        return { success: false as const, error: message };
      }
    },
    [clearRegistrationData, getStep1Data, saveNifData],
  );

  return {
    getStep1Data,
    getNifData,
    saveStep1Data,
    saveNifData,
    clearRegistrationData,
    submitRegistration,
    loading,
    error,
  };
}
