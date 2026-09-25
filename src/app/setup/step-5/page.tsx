"use client";

import SetupLayout from "@/app/layouts/setup/SetupLayout";
import { useSetupData } from "@/core/hooks/useSetupData";
import { isSetupStepComplete, SETUP_STEP_PATHS } from "@/core/setup/steps";
import { useRouter } from "next/navigation";
import RiskAssessmentMatrix from "./components/RiskAssessmentMatrix";

export default function SetupPage() {
  const router = useRouter();

  const [setupData, updateSetup] = useSetupData();

  return (
    <SetupLayout
      currentStep={5}
      onNextClick={() => router.push(SETUP_STEP_PATHS[6])}
      isNextDisabled={!isSetupStepComplete(5, setupData)}
      nextLabel="Continuar"
      missingMessage="Selecione o tamanho da matriz antes de continuar.">
      <RiskAssessmentMatrix
        value={setupData.matrix ?? null}
        onChange={(matrix) => updateSetup({ matrix })}
      />
    </SetupLayout>
  );
}
