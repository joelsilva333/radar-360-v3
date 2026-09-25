"use client";

import { useHydrated } from "@/core/hooks/useHydrated";
import { useSetupData } from "@/core/hooks/useSetupData";
import {
  FINAL_SETUP_STEP,
  getFirstIncompleteSetupStep,
  SETUP_STEP_PATHS,
} from "@/core/setup/steps";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import SettingsLayout from "../settings/SettingsLayout";
import StepperSidebar from "./components/StepperSidebar";

export default function SetupLayout({
  children,
  onNextClick,
  isNextDisabled,
  missingMessage,
  nextLabel,
  currentStep,
}: {
  children: React.ReactNode;
  onNextClick: () => void;
  isNextDisabled: boolean;
  missingMessage?: string;
  nextLabel?: string;
  currentStep: number;
}) {
  const router = useRouter();

  const hydrated = useHydrated();

  const [setupData] = useSetupData();

  const firstIncompleteStep = getFirstIncompleteSetupStep(setupData);

  /*
   * Com o setup concluído, só o passo final continua acessível (é lá que
   * aparece o modal de sucesso).
   */
  const isSetupDone =
    !!setupData.completedAt && currentStep !== FINAL_SETUP_STEP;

  /*
   * Não se pode saltar passos: se algum passo anterior estiver por
   * preencher, o utilizador é levado para esse passo.
   */
  const isStepLocked = currentStep > firstIncompleteStep;

  const canRender = hydrated && !isSetupDone && !isStepLocked;

  useEffect(() => {
    if (!hydrated) return;

    if (isSetupDone) {
      router.replace("/dashboard");
      return;
    }

    if (isStepLocked) {
      router.replace(SETUP_STEP_PATHS[firstIncompleteStep]);
    }
  }, [hydrated, isSetupDone, isStepLocked, firstIncompleteStep, router]);

  return (
    <SettingsLayout
      onNextClick={onNextClick}
      isNextDisabled={isNextDisabled || !canRender}
      missingMessage={missingMessage}
      nextLabel={nextLabel}>
      <div className="flex w-full h-full">
        <StepperSidebar
          currentStep={currentStep}
          maxReachableStep={firstIncompleteStep}
          onSelectStep={(step) => router.push(SETUP_STEP_PATHS[step])}
        />

        <div className="py-18 px-12 flex justify-center w-full">
          {/*
           * Até o localStorage estar disponível não sabemos se o passo é
           * acessível nem o que já foi escolhido, por isso não mostramos o
           * conteúdo (evita piscar os valores por defeito).
           */}
          <div className="max-w-205 w-full">{canRender && children}</div>
        </div>
      </div>
    </SettingsLayout>
  );
}
