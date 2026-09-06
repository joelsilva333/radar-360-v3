"use client";

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
  return (
    <SettingsLayout
      onNextClick={onNextClick}
      isNextDisabled={isNextDisabled}
      missingMessage={missingMessage}
      nextLabel={nextLabel}>
      <div className="flex w-full h-full">
        <StepperSidebar currentStep={currentStep} />
        
        <div className="py-18 px-12 flex justify-center w-full">
          <div className="max-w-205 w-full">{children}</div>
        </div>
      </div>
    </SettingsLayout>
  );
}
