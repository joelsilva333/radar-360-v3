"use client";

import SetupLayout from "@/app/layouts/setup/SetupLayout";
import { useState } from "react";
import IndustrySelector from "./components/IndustrySelector";

export default function SetupPage() {
  const [selectedIndustryId, setSelectedIndustryId] = useState<string | null>(
    null,
  );

  const handleNext = () => {
    console.log("Indústria selecionada ID:", selectedIndustryId);
  };

  return (
    <SetupLayout
      currentStep={1}
      onNextClick={handleNext}
      isNextDisabled={!selectedIndustryId}
      nextLabel="Continuar"
      missingMessage="Selecione uma indústria principal antes de continuar.">
      <IndustrySelector
        selectedId={selectedIndustryId}
        onSelect={(id) => setSelectedIndustryId(id)}
      />
    </SetupLayout>
  );
}
