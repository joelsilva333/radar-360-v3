"use client";

import { useEffect, useState } from "react";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import FormInput from "../../ui/FormInput";
import { Eye, EyeOff } from "lucide-react";
import Loading from "@/app/ui/Loading";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRegistration } from "@/core/hooks/useRegistration";
import { useStoredStep1Data } from "@/core/hooks/useRegistrationStoredData";
import { RegisterStep1Data } from "@/core/types/register";
import AuthFormLayout from "@/app/layouts/auth/AuthFormLayout";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { saveStep1Data } = useRegistration();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<RegisterStep1Data>({
    mode: "onBlur",
    defaultValues: {},
  });

  /*
   * O localStorage não existe no servidor. Lê-lo aqui durante o render faria
   * o servidor renderizar os campos vazios e o cliente os campos preenchidos,
   * originando hydration mismatch. O valor só chega depois da hidratação,
   * pelo que repomos o formulário nessa altura.
   */
  const [savedStep1Data] = useStoredStep1Data();

  useEffect(() => {
    if (Object.keys(savedStep1Data).length > 0) {
      reset(savedStep1Data);
    }
  }, [savedStep1Data, reset]);

  const password = useWatch({
    control,
    name: "password",
  });

  const onSubmit: SubmitHandler<RegisterStep1Data> = (data) => {
    setLoading(true);

    // Salva os dados na camada /core (localStorage)
    saveStep1Data(data);

    setTimeout(() => {
      setLoading(false);
      router.push("/register/nif");
    }, 800);
  };

  return (
    <AuthFormLayout
      title="Cadastre sua Empresa"
      description="Insira os dados do representante que você deseja cadastrar para gerenciar a governança.">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full">
        <FormInput label="Nome completo">
          <input
            type="text"
            placeholder="Digite seu nome completo"
            className="input-primary"
            {...register("fullname", {
              required: "O nome completo é obrigatório",
            })}
          />
        </FormInput>
        {errors.fullname && (
          <span className="text-red-500 text-xs -mt-2">
            {errors.fullname.message}
          </span>
        )}

        <div>
          <FormInput label="Cargo">
            <input
              type="text"
              placeholder="Ex: Chief Risk Officer"
              className="input-primary"
              {...register("role", { required: "O cargo é obrigatório" })}
            />
          </FormInput>
          {errors.role && (
            <span className="text-red-500 text-xs -mt-2">
              {errors.role.message}
            </span>
          )}
        </div>

        <div className="flex gap-4">
          <div>
            <FormInput label="Email corporativo">
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
          </div>

          <div>
            <FormInput label="Telefone (Opcional)">
              <span className="text-cinza-3">+244</span>
              <input
                type="text"
                className="input-primary"
                {...register("phone", {
                  pattern: {
                    value: /^[0-9]{9}$/,
                    message: "Digite um número de telefone válido",
                  },
                })}
              />
            </FormInput>
            {errors.phone && (
              <span className="text-red-500 text-xs -mt-2">
                {errors.phone.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <div>
            <FormInput label="Palavra-passe">
              <div className="flex items-center w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua palavra-passe"
                  className="input-primary"
                  {...register("password", {
                    required: "A palavra-passe é obrigatória",
                    minLength: {
                      value: 8,
                      message:
                        "A palavra-passe deve ter pelo menos 8 caracteres",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="text-cinza-3 hover:opacity-70 transition-opacity cursor-pointer ml-2">
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </FormInput>
            {errors.password && (
              <span className="text-red-500 text-xs -mt-2">
                {errors.password.message}
              </span>
            )}
          </div>

          <div>
            <FormInput label="Confirmar palavra-passe">
              <div className="flex items-center w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirme a sua palavra-passe"
                  className="input-primary"
                  {...register("confirm_password", {
                    required: "Confirme a palavra-passe",
                    validate: (value) =>
                      value === password || "As palavras-passe não coincidem",
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="text-cinza-3 hover:opacity-70 transition-opacity cursor-pointer ml-2">
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </FormInput>
            {errors.confirm_password && (
              <span className="text-red-500 text-xs -mt-2">
                {errors.confirm_password.message}
              </span>
            )}
          </div>
        </div>

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
            "Continuar"
          )}
        </button>
      </form>

      <Link
        href={"/"}
        className="text-cinza-4 w-full text-center text-sm font-normal hover:opacity-70 transition-opacity">
        Já tem uma conta? <span className="text-primary">Entrar</span>
      </Link>
    </AuthFormLayout>
  );
}
