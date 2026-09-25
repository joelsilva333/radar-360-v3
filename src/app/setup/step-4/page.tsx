"use client";

import SetupLayout from "@/app/layouts/setup/SetupLayout";
import { useSetupData } from "@/core/hooks/useSetupData";
import { isSetupStepComplete, SETUP_STEP_PATHS } from "@/core/setup/steps";
import { useRouter } from "next/navigation";
import RiskTaxonomySelector from "./components/RiskTaxonomySelector";

export default function SetupPage() {
  const router = useRouter();

  const [setupData, updateSetup] = useSetupData();

  return (
    <SetupLayout
      currentStep={4}
      onNextClick={() => router.push(SETUP_STEP_PATHS[5])}
      isNextDisabled={!isSetupStepComplete(4, setupData)}
      nextLabel="Continuar"
      missingMessage="Selecione uma opção de taxonomia antes de continuar.">
      <RiskTaxonomySelector
        value={setupData.taxonomy}
        onChange={(taxonomy) => updateSetup({ taxonomy })}
      />
    </SetupLayout>
  );
}
