"use client";

import { REGISTRATION_STORAGE_KEYS } from "../storage/registrationStorage";
import { RegisterNifData, RegisterStep1Data } from "../types/register";
import { useStoredValue } from "./useStoredValue";

/**
 * Dados do passo 1 (representante) guardados entre os passos do registo.
 */
export function useStoredStep1Data() {
  return useStoredValue<RegisterStep1Data>(REGISTRATION_STORAGE_KEYS.STEP_1, {});
}

/**
 * Dados do NIF (empresa) guardados entre os passos do registo.
 */
export function useStoredNifData() {
  return useStoredValue<RegisterNifData>(REGISTRATION_STORAGE_KEYS.STEP_2, {});
}
