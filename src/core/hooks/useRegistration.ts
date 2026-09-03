"use client";

import { useState } from "react";
import {
  RegisterStep1Data,
  RegisterNifData,
  CompleteRegistrationData,
} from "../types/register";
import { registerCompany } from "../api/auth";

const STORAGE_KEYS = {
  STEP_1: "register_data",
  STEP_2: "register_nif_data",
  COMPLETE: "complete_register_data",
};

export function useRegistration() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getStep1Data = (): Partial<RegisterStep1Data> => {
    if (typeof window === "undefined") return {};
    const saved = localStorage.getItem(STORAGE_KEYS.STEP_1);
    return saved ? JSON.parse(saved) : {};
  };

  const getNifData = (): Partial<RegisterNifData> => {
    if (typeof window === "undefined") return {};
    const saved = localStorage.getItem(STORAGE_KEYS.STEP_2);
    return saved ? JSON.parse(saved) : {};
  };

  // --- MÉTODOS DE GRAVAÇÃO (Salvam no localStorage) ---
  const saveStep1Data = (data: RegisterStep1Data) => {
    localStorage.setItem(STORAGE_KEYS.STEP_1, JSON.stringify(data));
  };

  const saveNifData = (data: RegisterNifData) => {
    localStorage.setItem(STORAGE_KEYS.STEP_2, JSON.stringify(data));
  };

  // --- ENVIO FINAL PARA O BACKEND ---
  const submitRegistration = async (currentNifData: RegisterNifData) => {
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

      localStorage.setItem(
        STORAGE_KEYS.COMPLETE,
        JSON.stringify(completePayload),
      );

      // 3. Executa a chamada no /core
      await registerCompany(completePayload);

      clearRegistrationData();

      setLoading(false);
      return { success: true };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setLoading(false);
      setError(err.message || "Falha no envio.");
      return { success: false, error: err.message };
    }
  };

  const clearRegistrationData = () => {
    localStorage.removeItem(STORAGE_KEYS.STEP_1);
    localStorage.removeItem(STORAGE_KEYS.STEP_2);
    localStorage.removeItem(STORAGE_KEYS.COMPLETE);
  };

  return {
    getStep1Data,
    getNifData,
    saveStep1Data,
    saveNifData,
    submitRegistration,
    loading,
    error,
  };
}
