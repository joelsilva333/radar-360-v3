export const REGISTRATION_STORAGE_KEYS = {
  STEP_1: "register_data",
  STEP_2: "register_nif_data",
  COMPLETE: "complete_register_data",
} as const;

type StoredValueListener = () => void;

const storedValueListeners = new Set<StoredValueListener>();

interface CachedSnapshot {
  rawValue: string | null;
  value: unknown;
}

/*
 * O `useSyncExternalStore` exige que `getSnapshot` devolva sempre a mesma
 * referência enquanto o valor guardado não mudar, caso contrário entra em
 * ciclo infinito de renders. Este cache guarda o valor bruto associado ao
 * snapshot, para reutilizar a referência quando nada mudou.
 */
const snapshotCache = new Map<string, CachedSnapshot>();

const isBrowserStorageAvailable = (): boolean =>
  typeof window !== "undefined" && typeof window.localStorage !== "undefined";

function parseStoredValue<T>(rawValue: string | null): Partial<T> {
  if (!rawValue) {
    return {};
  }

  try {
    const parsedValue: unknown = JSON.parse(rawValue);

    if (
      !parsedValue ||
      typeof parsedValue !== "object" ||
      Array.isArray(parsedValue)
    ) {
      return {};
    }

    return parsedValue as Partial<T>;
  } catch {
    return {};
  }
}

export function subscribeToStoredValues(
  listener: StoredValueListener,
): () => void {
  storedValueListeners.add(listener);

  return () => {
    storedValueListeners.delete(listener);
  };
}

export function notifyStoredValuesChanged(): void {
  storedValueListeners.forEach((listener) => listener());
}

/**
 * Snapshot do valor guardado, com referência estável entre leituras
 * consecutivas enquanto o localStorage não for alterado.
 *
 * No servidor devolve sempre `fallback`: é esse o valor com que o HTML é
 * renderizado, e é o que o React espera durante a hidratação.
 */
export function getStoredSnapshot<T extends object>(
  key: string,
  fallback: Partial<T>,
): Partial<T> {
  if (!isBrowserStorageAvailable()) {
    return fallback;
  }

  const rawValue = window.localStorage.getItem(key);
  const cachedSnapshot = snapshotCache.get(key);

  if (cachedSnapshot && cachedSnapshot.rawValue === rawValue) {
    return cachedSnapshot.value as Partial<T>;
  }

  const value = (
    rawValue === null ? fallback : parseStoredValue<T>(rawValue)
  ) as Partial<T>;

  snapshotCache.set(key, { rawValue, value });

  return value;
}

export function readStoredData<T>(key: string): Partial<T> {
  if (!isBrowserStorageAvailable()) {
    return {};
  }

  return parseStoredValue<T>(window.localStorage.getItem(key));
}

export function writeStoredData<T>(key: string, data: T): void {
  if (!isBrowserStorageAvailable()) {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(data));

  notifyStoredValuesChanged();
}

export function removeStoredData(keys: readonly string[]): void {
  if (!isBrowserStorageAvailable()) {
    return;
  }

  keys.forEach((key) => {
    window.localStorage.removeItem(key);
    snapshotCache.delete(key);
  });

  notifyStoredValuesChanged();
}
