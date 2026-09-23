"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import FormInput from "../../ui/FormInput";
import AuthFormLayout from "../../layouts/auth/AuthFormLayout";
import { Eye, EyeOff } from "lucide-react";
import Loading from "@/app/ui/Loading";
import Link from "next/link";
import Image from "next/image";

interface FormFields {
  email: string;
  password: string;
}

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    setLoading(true);

    console.log("Form data:", data);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <AuthFormLayout title="Bem-vindo de volta">
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

        <FormInput label="Senha">
          <div className="flex items-center w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Digite sua senha"
              className="input-primary"
              {...register("password", {
                required: "A senha é obrigatória",
                minLength: {
                  value: 8,
                  message: "A senha deve ter pelo menos 8 caracteres",
                },
              })}
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="text-cinza-3 hover:opacity-70 transition-opacity cursor-pointer ml-2"
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}>
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </FormInput>

        {errors.password && (
          <span className="text-red-500 text-xs -mt-2">
            {errors.password.message}
          </span>
        )}

        <Link
          href={"/forgot-password"}
          className="text-primary w-full text-right text-sm font-normal hover:opacity-70 transition-opacity">
          Esqueceu sua senha?
        </Link>

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
            "Entrar"
          )}
        </button>
      </form>

      <Link
        href={"/register"}
        className="text-cinza-4 w-full text-center text-sm font-normal hover:opacity-70 transition-opacity">
        Não tem conta? <span className="text-primary">Criar organização</span>
      </Link>

      <div className="flex items-center gap-2 w-full text-cinza-4 text-sm font-normal">
        <hr className="w-full border-line" />
        ou <hr className="w-full border-line" />
      </div>

      <Link
        href={"#"}
        className="btn-secondary mt-2">
        <Image
          src="/icons/google.svg"
          alt="Google"
          width={24}
          height={24}
        />
        Entrar com Google
      </Link>
    </AuthFormLayout>
  );
}
