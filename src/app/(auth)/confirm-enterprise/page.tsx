"use client";

import SettingsLayout from "@/app/layouts/settings/SettingsLayout";
import { useRegistration } from "@/core/hooks/useRegistration";
import { RegisterStep1Data, RegisterNifData } from "@/core/types/register";
import { useState } from "react";
import { toast } from "react-toastify";
import { DataField, DataSection } from "./components/DataSection";
import EmailVerificationModal from "./components/EmailVerificationModal";

const getStringField = <T extends object>(
  data: T | undefined,
  key: keyof T,
): string | undefined => {
  const value = data?.[key];

  return typeof value === "string" && value.trim() ? value.trim() : undefined;
};

export default function ConfirmEnterprise() {
  const {
    getStep1Data,
    getNifData,
    saveStep1Data,
    saveNifData,
    submitRegistration,
    error,
  } = useRegistration();

  const [step1Data, setStep1Data] = useState<Partial<RegisterStep1Data>>(() =>
    getStep1Data(),
  );

  const [nifData, setNifData] = useState<Partial<RegisterNifData>>(() =>
    getNifData(),
  );

  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [showEmailVerification, setShowEmailVerification] = useState(false);

  /*
   * -----------------------------------------
   * CAMPOS OBRIGATÓRIOS
   * -----------------------------------------
   */

  const requiredFields = [
    {
      label: "NIF",
      value: getStringField(nifData, "nif"),
    },
    {
      label: "Firma",
      value: getStringField(nifData, "denomination"),
    },
    {
      label: "Nome",
      value: getStringField(step1Data, "fullname"),
    },
    {
      label: "Cargo",
      value: getStringField(step1Data, "role"),
    },
    {
      label: "E-mail corporativo",
      value: getStringField(step1Data, "email"),
    },
    {
      label: "Telefone",
      value: getStringField(step1Data, "phone"),
    },
  ];

  const missingFields = requiredFields
    .filter((field) => !field.value)
    .map((field) => field.label);

  const isNextDisabled = missingFields.length > 0 || !acceptedTerms;

  const getMissingMessage = () => {
    if (missingFields.length > 0) {
      return `Falta preencher: ${missingFields.join(", ")}.`;
    }

    if (!acceptedTerms) {
      return "Confirme que aceita os Termos e Condições e a Política de Privacidade.";
    }

    return "";
  };

  /*
   * -----------------------------------------
   * EDITAR DADOS DA EMPRESA
   * -----------------------------------------
   */

  const handleCompanySave = (fields: DataField[]) => {
    const updatedNifData: Partial<RegisterNifData> = {
      ...nifData,
    };

    fields.forEach((field) => {
      if (field.key === "nif") {
        return;
      }

      if (field.key === "denomination") {
        updatedNifData.denomination = field.value;
      }
    });

    setNifData(updatedNifData);

    saveNifData(updatedNifData as RegisterNifData);

    toast.success("Dados da empresa actualizados.");
  };

  /*
   * -----------------------------------------
   * EDITAR REPRESENTANTE
   * -----------------------------------------
   */

  const handleRepresentativeSave = (fields: DataField[]) => {
    const updatedStep1Data: Partial<RegisterStep1Data> = {
      ...step1Data,
    };

    fields.forEach((field) => {
      switch (field.key) {
        case "fullname":
          updatedStep1Data.fullname = field.value;
          break;

        case "role":
          updatedStep1Data.role = field.value;
          break;

        case "email":
          updatedStep1Data.email = field.value;
          break;

        case "phone":
          updatedStep1Data.phone = field.value;
          break;
      }
    });

    setStep1Data(updatedStep1Data);

    saveStep1Data(updatedStep1Data as RegisterStep1Data);

    toast.success("Dados do representante actualizados.");
  };

  /*
   * -----------------------------------------
   * SUBMIT
   * -----------------------------------------
   */

  const handleSubmit = async () => {
    if (missingFields.length > 0) {
      toast.warning(getMissingMessage());
      return;
    }

    if (!acceptedTerms) {
      toast.warning(getMissingMessage());
      return;
    }

    /*
     * Como os dados podem ter sido editados no
     * DataSection, garantimos que estão guardados
     * antes do envio.
     */
    saveStep1Data(step1Data as RegisterStep1Data);

    saveNifData(nifData as RegisterNifData);

    /*
     * Envia para o backend.
     */
    const result = await submitRegistration(nifData as RegisterNifData);

    if (!result.success) {
      toast.error(result.error || "Não foi possível concluir o cadastro.");
      return;
    }

    /*
     * Cadastro realizado.
     *
     * Agora mostramos o modal de confirmação
     * do e-mail.
     */
    setShowEmailVerification(true);
  };

  return (
    <>
      <SettingsLayout
        onNextClick={handleSubmit}
        isNextDisabled={isNextDisabled}
        missingMessage={getMissingMessage()}
        nextLabel="Confirmar informações">
        <div className="w-full space-y-6 font-sans text-gray-900 max-w-360.5 mx-auto">
          <header className="mt-12.5 mb-6">
            <h1 className="text-2xl font-medium tracking-tight text-cinza">
              Confirme os dados da sua empresa
            </h1>

            <p className="text-sm text-cinza-2">
              Confira se os dados estão corretos e prossiga para a próxima etapa
            </p>
          </header>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          )}

          <main className="space-y-4">
            {/* Dados da empresa */}

            <DataSection
              title="Dados da empresa"
              onSave={handleCompanySave}
              fields={[
                {
                  label: "NIF",
                  key: "nif",
                  value: nifData.nif,
                  editable: false,
                },
                {
                  label: "Firma",
                  key: "denomination",
                  value: nifData.denomination,
                  editable: true,
                },
              ]}
            />

            {/* Dados do representante */}

            <DataSection
              title="Dados do representante"
              onSave={handleRepresentativeSave}
              fields={[
                {
                  label: "Nome",
                  key: "fullname",
                  value: step1Data.fullname,
                  editable: true,
                },
                {
                  label: "Cargo",
                  key: "role",
                  value: step1Data.role,
                  editable: true,
                },
                {
                  label: "E-mail corporativo",
                  key: "email",
                  value: step1Data.email,
                  editable: true,
                },
                {
                  label: "Telefone",
                  key: "phone",
                  value: step1Data.phone,
                  editable: true,
                },
              ]}
            />

            {/* Dados do endereço */}

            <DataSection
              title="Dados do endereço"
              fields={[
                {
                  label: "Província",
                  value: "-",
                  editable: false,
                },
                {
                  label: "Município",
                  value: "-",
                  editable: false,
                },
                {
                  label: "Distrito Urbano / Comuna",
                  value: "-",
                  editable: false,
                },
                {
                  label: "Rua / Avenida / Alameda",
                  value: "-",
                  editable: false,
                },
              ]}
            />
          </main>

          {/* Termos */}

          <footer className="space-y-4 pt-2">
            <label className="flex cursor-pointer select-none items-center gap-2.5 text-sm font-medium text-gray-500 transition-colors hover:text-gray-700">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="h-4 w-4 cursor-pointer rounded border-gray-300 text-primary accent-primary focus:ring-blue-500"
              />

              <span>
                Aceito os{" "}
                <a
                  href="#"
                  className="text-primary underline hover:text-blue-700">
                  Termos e Condições
                </a>{" "}
                e a{" "}
                <a
                  href="#"
                  className="text-primary underline hover:text-blue-700">
                  Política de Privacidade
                </a>
              </span>
            </label>
          </footer>
        </div>
      </SettingsLayout>

      {/* Modal de confirmação do e-mail */}

      {showEmailVerification && (
        <EmailVerificationModal email={step1Data.email || ""} />
      )}
    </>
  );
}
