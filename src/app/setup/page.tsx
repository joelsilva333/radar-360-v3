"use client";

import SettingsLayout from "../layouts/settings/SettingsLayout";
import StepperSidebar from "./components/StepperSidebar";

export default function SetupLayout() {
  return (
    <SettingsLayout
      onNextClick={() => {}}
      isNextDisabled={false}
      nextLabel="Continuar">
      <StepperSidebar currentStep={1} />
    </SettingsLayout>
  );
}
