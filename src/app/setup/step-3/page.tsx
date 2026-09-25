"use client";

import SetupLayout from "@/app/layouts/setup/SetupLayout";
import { useSetupData } from "@/core/hooks/useSetupData";
import { isSetupStepComplete, SETUP_STEP_PATHS } from "@/core/setup/steps";
import { CustomFramework } from "@/core/types/setup";
import { useRouter } from "next/navigation";
import FrameworkSelector from "./components/FrameworkSelector";

export default function SetupPage() {
  const router = useRouter();

  const [setupData, updateSetup] = useSetupData();

  const customFrameworks = setupData.customFrameworks ?? [];

  const handleAddCustomFramework = (framework: CustomFramework) => {
    updateSetup({ customFrameworks: [framework, ...customFrameworks] });
  };

  return (
    <SetupLayout
      currentStep={3}
      onNextClick={() => router.push(SETUP_STEP_PATHS[4])}
      isNextDisabled={!isSetupStepComplete(3, setupData)}
      nextLabel="Continuar"
      missingMessage="Selecione pelo menos um framework antes de continuar.">
      <FrameworkSelector
        selectedIds={setupData.frameworkIds ?? []}
        onSelect={(frameworkIds) => updateSetup({ frameworkIds })}
        customFrameworks={customFrameworks}
        onAddCustomFramework={handleAddCustomFramework}
      />
    </SetupLayout>
  );
}
