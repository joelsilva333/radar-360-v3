"use client";

import SetupLayout from "@/app/layouts/setup/SetupLayout";
import { useSetupData } from "@/core/hooks/useSetupData";
import { isSetupStepComplete, SETUP_STEP_PATHS } from "@/core/setup/steps";
import { useRouter } from "next/navigation";
import IndustrySelector from "./components/IndustrySelector";

export default function SetupPage() {
  const router = useRouter();

  const [setupData, updateSetup] = useSetupData();

  return (
    <SetupLayout
      currentStep={1}
      onNextClick={() => router.push(SETUP_STEP_PATHS[2])}
      isNextDisabled={!isSetupStepComplete(1, setupData)}
      nextLabel="Continuar"
      missingMessage="Selecione uma indústria principal antes de continuar.">
      <IndustrySelector
        selectedId={setupData.industryId ?? null}
        onSelect={(industryId) => updateSetup({ industryId })}
      />
    </SetupLayout>
  );
}
