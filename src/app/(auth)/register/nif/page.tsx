"use client";

import { useEffect, useRef, useState } from "react";
import FormInput from "../../../ui/FormInput";
import AuthFormLayout from "../../../layouts/auth/AuthFormLayout";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Loading from "@/app/ui/Loading";
import { useRouter } from "next/navigation";
import Processor from "./components/Processor";
import { useRegistration } from "@/core/hooks/useRegistration";
import { useStoredNifData } from "@/core/hooks/useRegistrationStoredData";

interface FormFields {
  nif: string;
}

export default function RegisterNIF() {
  const [checkingNif, setCheckingNif] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [nifError, setNifError] = useState("");

  const nifTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();

  const { saveNifData } = useRegistration();

  /*
   * `denominationInput` é a denominação obtida nesta sessão. Enquanto for
   * nula mostramos a que já estava guardada, que só chega depois da
   * hidratação.
   */
  const [denominationInput, setDenominationInput] = useState<string | null>(
    null,
  );

  const [savedNifData] = useStoredNifData();

  const denomination = denominationInput ?? savedNifData.denomination ?? "";

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: {
      nif: "",
    },
  });

  /*
   * O localStorage não existe no servidor. Preencher o formulário com os
   * dados guardados durante o render faria o servidor renderizar o campo
   * vazio e o cliente o campo preenchido, originando hydration mismatch.
   * O valor guardado só é reposto depois da hidratação.
   */
  useEffect(() => {
    reset({ nif: savedNifData.nif || "" });
  }, [savedNifData, reset]);

  const handleNifChange = (value: string) => {
    const cleanNif = value.trim();

    if (nifTimeout.current) {
      clearTimeout(nifTimeout.current);
    }

    setDenominationInput("");
    setNifError("");

    if (!cleanNif || cleanNif.length < 6) {
      setCheckingNif(false);
      return;
    }

    setCheckingNif(true);

    nifTimeout.current = setTimeout(() => {
      // Temporário: simulação da API da AGT
      setDenominationInput("ÁUREO INÁCIO, SU");
      setCheckingNif(false);
    }, 1200);
  };

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    if (checkingNif) return;

    if (!denomination) {
      setNifError("Informe um NIF válido antes de prosseguir.");
      return;
    }

    setProcessing(true);

    // Apenas guarda os dados desta etapa.
    saveNifData({
      nif: data.nif,
      denomination,
    });
  };

  if (processing) {
    return <Processor onComplete={() => router.push("/confirm-enterprise")} />;
  }

  return (
    <AuthFormLayout
      title="Bem-vindo de volta"
      description="Insira o NIF da empresa que você deseja cadastrar para gerenciar a governança.">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full">
        <Controller
          name="nif"
          control={control}
          rules={{
            required: "O NIF é obrigatório",
          }}
          render={({ field }) => (
            <FormInput label="Identificador Fiscal da Organização">
              <div className="flex items-center gap-2 w-full">
                <input
                  type="text"
                  placeholder="ex.: NIF, CNPJ, EIN, SIREN..."
                  className="input-primary"
                  value={field.value}
                  onChange={(event) => {
                    const value = event.target.value;

                    field.onChange(value);
                    handleNifChange(value);
                  }}
                  onBlur={field.onBlur}
                  name={field.name}
                />

                {checkingNif && (
                  <Loading
                    color="text-primary"
                    size="sm"
                  />
                )}
              </div>
            </FormInput>
          )}
        />

        {errors.nif && (
          <p className="text-red-500 text-sm">{errors.nif.message}</p>
        )}

        {nifError && !errors.nif && (
          <p className="text-red-500 text-sm">{nifError}</p>
        )}

        <div className="flex flex-col gap-2">
          <p className="text-cinza-2 font-normal text-sm">Denominação social</p>

          <div className="min-h-5">
            {checkingNif ? (
              <Loading
                color="text-primary"
                size="sm"
              />
            ) : (
              <p
                className={`text-sm font-semibold ${
                  denomination ? "text-cinza" : "text-cinza-2"
                }`}>
                {denomination || "A denominação aparecerá aqui"}
              </p>
            )}
          </div>
        </div>

        <button
          className="btn-primary w-full text-white disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={checkingNif || !denomination}>
          Confirmar e prosseguir
        </button>
      </form>
    </AuthFormLayout>
  );
}
