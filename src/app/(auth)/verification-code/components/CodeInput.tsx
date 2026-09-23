"use client";

import { ClipboardEvent, KeyboardEvent, useRef } from "react";

interface CodeInputProps {
  length: number;
  value: string[];
  hasError?: boolean;
  disabled?: boolean;
  onChange: (value: string[]) => void;
}

/*
 * Caixas de código de verificação (um dígito por caixa).
 *
 * - Avança para a caixa seguinte ao escrever.
 * - Backspace numa caixa vazia volta à anterior.
 * - Setas esquerda/direita navegam entre caixas.
 * - Colar um código preenche todas as caixas de uma vez.
 */
export default function CodeInput({
  length,
  value,
  hasError = false,
  disabled = false,
  onChange,
}: CodeInputProps) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const focusInput = (index: number) => {
    const target = inputsRef.current[Math.max(0, Math.min(index, length - 1))];

    target?.focus();
    target?.select();
  };

  const fillFrom = (index: number, digits: string) => {
    const next = [...value];

    digits
      .slice(0, length - index)
      .split("")
      .forEach((digit, offset) => {
        next[index + offset] = digit;
      });

    onChange(next);

    focusInput(index + digits.length);
  };

  const handleChange = (index: number, raw: string) => {
    const digits = raw.replace(/\D/g, "");

    if (!digits) {
      const next = [...value];
      next[index] = "";
      onChange(next);
      return;
    }

    /*
     * O preenchimento automático do SMS/e-mail (autocomplete="one-time-code")
     * pode inserir o código inteiro numa só caixa.
     */
    fillFrom(index, digits);
  };

  const handleKeyDown = (index: number, event: KeyboardEvent) => {
    if (event.key === "Backspace" && !value[index] && index > 0) {
      event.preventDefault();

      const next = [...value];
      next[index - 1] = "";
      onChange(next);

      focusInput(index - 1);
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      focusInput(index - 1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      focusInput(index + 1);
    }
  };

  const handlePaste = (index: number, event: ClipboardEvent) => {
    const digits = event.clipboardData.getData("text").replace(/\D/g, "");

    if (!digits) return;

    event.preventDefault();
    fillFrom(index, digits);
  };

  return (
    <div
      role="group"
      aria-label="Código de verificação"
      className="flex w-full gap-2">
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          ref={(element) => {
            inputsRef.current[index] = element;
          }}
          type="text"
          inputMode="numeric"
          autoComplete={index === 0 ? "one-time-code" : "off"}
          maxLength={length}
          autoFocus={index === 0}
          disabled={disabled}
          value={value[index] ?? ""}
          aria-label={`Dígito ${index + 1} de ${length}`}
          aria-invalid={hasError}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={(e) => handlePaste(index, e)}
          onFocus={(e) => e.target.select()}
          className={`h-12 w-full min-w-0 rounded-lg border text-center font-inter text-lg font-medium text-cinza outline-none transition-colors focus:border-primary disabled:bg-gray-50 ${
            hasError ? "border-red-500" : "border-cinza-3/60"
          }`}
        />
      ))}
    </div>
  );
}
