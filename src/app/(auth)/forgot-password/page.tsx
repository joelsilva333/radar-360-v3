"use client";

import AuthFormLayout from "@/app/layouts/auth/AuthFormLayout";
import FormInput from "@/app/ui/FormInput";
import Loading from "@/app/ui/Loading";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function ForgotPassword() {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>();

  const onSubmit: SubmitHandler<{ email: string }> = async (data) => {
    setLoading(true);

    // TODO: substituir pela chamada à API que envia o código.
    await new Promise((resolve) => setTimeout(resolve, 1000));

    /*
     * A página de verificação mostra o e-mail para onde o código foi
     * enviado, por isso passamo-lo na query string.
     */
    const email = data.email.trim();

    router.push(`/verification-code?email=${encodeURIComponent(email)}`);
  };

  return (
    <AuthFormLayout
      title={"Recuperar palavra-passe"}
      description={`Indique o email da sua conta e enviaremos uma ligação para definir uma nova palavra-passe.`}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full">
        <FormInput label="Email">
          <input
            type="email"
            placeholder="Digite seu email"
            className="input-primary"
            {...register("email", {
              required: "O email é obrigatório",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Digite um email válido",
              },
            })}
          />
        </FormInput>

        {errors.email && (
          <span className="text-red-500 text-xs -mt-2">
            {errors.email.message}
          </span>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn-primary text-cinza mt-2">
          {loading ? (
            <Loading
              color="text-white"
              size="sm"
            />
          ) : (
            "Enviar código"
          )}
        </button>

        <Link
          href={"/"}
          className="btn-secondary ">
          Voltar à entrada
        </Link>
      </form>
    </AuthFormLayout>
  );
}
