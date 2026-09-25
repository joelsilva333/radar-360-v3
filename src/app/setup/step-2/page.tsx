"use client";

import SetupLayout from "@/app/layouts/setup/SetupLayout";
import { useSetupData } from "@/core/hooks/useSetupData";
import { isSetupStepComplete, SETUP_STEP_PATHS } from "@/core/setup/steps";
import { useRouter } from "next/navigation";
import OrganizationSelector from "./components/OrganizationSelector";

export default function SetupPage() {
  const router = useRouter();

  const [setupData, updateSetup] = useSetupData();

  return (
    <SetupLayout
      currentStep={2}
      onNextClick={() => router.push(SETUP_STEP_PATHS[3])}
      isNextDisabled={!isSetupStepComplete(2, setupData)}
      nextLabel="Continuar"
      missingMessage="Selecione pelo menos uma jurisdição antes de continuar.">
      <OrganizationSelector
        selectedIds={setupData.jurisdictionIds ?? []}
        onSelect={(jurisdictionIds) => updateSetup({ jurisdictionIds })}
      />
    </SetupLayout>
  );
}
