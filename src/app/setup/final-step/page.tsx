"use client";

import SetupLayout from "@/app/layouts/setup/SetupLayout";
import { useSetupData } from "@/core/hooks/useSetupData";
import { FINAL_SETUP_STEP } from "@/core/setup/steps";
import { useRouter } from "next/navigation";
import SetupSummary from "./components/SetupSummary";
import SuccessModal from "./components/SuccessModal";

export default function SetupPage() {
  const router = useRouter();

  const [setupData, updateSetup] = useSetupData();

  /*
   * O modal aparece assim que o setup fica concluído, também se a página
   * for recarregada depois de concluir.
   */
  const isCompleted = !!setupData.completedAt;

  const handleComplete = () => {
    // TODO: enviar a configuração para a API antes de marcar como concluída.
    updateSetup({ completedAt: new Date().toISOString() });
  };

  return (
    <>
      <SetupLayout
        currentStep={FINAL_SETUP_STEP}
        onNextClick={handleComplete}
        isNextDisabled={isCompleted}
        nextLabel="Concluir configuração">
        <SetupSummary setupData={setupData} />
      </SetupLayout>

      {isCompleted && (
        <SuccessModal onGoToDashboard={() => router.push("/dashboard")} />
      )}
    </>
  );
}
