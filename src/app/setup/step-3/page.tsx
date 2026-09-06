"use client";

import { useState } from "react";
import SetupLayout from "@/app/layouts/setup/SetupLayout";
import FrameworkSelector from "./components/FrameworkSelector";

export default function SetupPage() {
  const [selectedFrameworkIds, setSelectedFrameworkIds] = useState<string[]>(
    [],
  );

  const handleNext = () => {
    console.log("Frameworks selecionados IDs:", selectedFrameworkIds);
  };

  const handleAddCustomFramework = () => {
    console.log("Abrir modal/fluxo para adicionar framework personalizado");
  };

  return (
    <SetupLayout
      currentStep={3}
      onNextClick={handleNext}
      isNextDisabled={selectedFrameworkIds.length === 0}
      nextLabel="Continuar"
      missingMessage="Selecione pelo menos um framework antes de continuar.">
      <FrameworkSelector
        selectedIds={selectedFrameworkIds}
        onSelect={(ids) => setSelectedFrameworkIds(ids)}
        onAddCustomFramework={handleAddCustomFramework}
      />
    </SetupLayout>
  );
}
