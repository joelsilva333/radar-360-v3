"use client";

import AuthFormLayout from "@/app/layouts/auth/AuthFormLayout";
import Loading from "@/app/ui/Loading";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import CodeInput from "./CodeInput";

const CODE_LENGTH = 6;

/** Segundos de espera até ser possível pedir um novo código. */
const RESEND_COOLDOWN = 60;

const MAIL_PROVIDERS = [
  {
    label: "Abrir o Gmail",
    href: "https://mail.google.com/mail/u/0/#inbox",
    icon: "/icons/gmail.svg",
    width: 24,
    height: 19,
  },
  {
    label: "Abrir o Outlook",
    href: "https://outlook.office.com/mail/",
    icon: "/icons/outlook.svg",
    width: 24,
    height: 24,
  },
];

const emptyCode = () => Array<string>(CODE_LENGTH).fill("");

export default function VerificationForm({ email }: { email?: string }) {
  const [code, setCode] = useState<string[]>(emptyCode);

  const [error, setError] = useState("");

  const [verifying, setVerifying] = useState(false);

  const [resending, setResending] = useState(false);

  /*
   * Começa a 0 para o link estar logo disponível; depois de cada reenvio
   * fica bloqueado durante RESEND_COOLDOWN segundos.
   */
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setTimeout(() => setCooldown((value) => value - 1), 1000);

    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleCodeChange = (value: string[]) => {
    setCode(value);
    setError("");
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const fullCode = code.join("");

    if (fullCode.length < CODE_LENGTH) {
      setError(`Insira os ${CODE_LENGTH} dígitos do código.`);
      return;
    }

    setVerifying(true);

    // TODO: substituir pela chamada à API de verificação.
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setVerifying(false);

    toast.success("Código verificado com sucesso.");
  };

  const handleResend = async () => {
    if (cooldown > 0 || resending) return;

    setResending(true);

    // TODO: substituir pela chamada à API de reenvio.
    await new Promise((resolve) => setTimeout(resolve, 800));

    setResending(false);
    setCode(emptyCode());
    setError("");
    setCooldown(RESEND_COOLDOWN);

    toast.success("Enviámos um novo código para o seu e-mail.");
  };

  return (
    <AuthFormLayout
      title="Verifique seu e-mail para obter um código"
      description={
        <>
          Insira o código de verificação enviado para seu endereço de e-mail
          {email ? (
            <>
              {" "}
              <strong className="font-normal text-cinza">{email}</strong>
            </>
          ) : (
            "."
          )}
        </>
      }>
      <form
        noValidate
        onSubmit={handleSubmit}
        className="flex w-full flex-col gap-6">
        <div className="flex flex-col gap-2">
          <CodeInput
            length={CODE_LENGTH}
            value={code}
            hasError={!!error}
            disabled={verifying}
            onChange={handleCodeChange}
          />

          {error && (
            <p
              role="alert"
              className="text-xs text-red-500">
              {error}
            </p>
          )}
        </div>

        <p
          aria-live="polite"
          className="text-center font-inter text-sm text-cinza-2">
          Não recebeu o código?{" "}
          {cooldown > 0 ? (
            <span>Reenviar em {cooldown}s</span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={resending}
              className="cursor-pointer text-primary hover:underline disabled:cursor-wait disabled:opacity-60">
              {resending ? "A reenviar..." : "Reenviar código"}
            </button>
          )}
        </p>

        <button
          type="submit"
          disabled={verifying}
          className="btn-primary disabled:cursor-wait">
          {verifying ? (
            <Loading
              color="text-white"
              size="sm"
            />
          ) : (
            "Verificar"
          )}
        </button>

        <div className="flex gap-6">
          {MAIL_PROVIDERS.map((provider) => (
            <a
              key={provider.label}
              href={provider.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex-1 text-cinza">
              <Image
                src={provider.icon}
                alt=""
                width={provider.width}
                height={provider.height}
              />
              {provider.label}
            </a>
          ))}
        </div>
      </form>
    </AuthFormLayout>
  );
}
