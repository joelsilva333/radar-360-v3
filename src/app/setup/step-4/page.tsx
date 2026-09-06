"use client";

import { useState } from "react";
import SetupLayout from "@/app/layouts/setup/SetupLayout";
import RiskTaxonomySelector from "./components/RiskTaxonomySelector";

export default function SetupPage() {
  const [selectedTaxonomy, setSelectedTaxonomy] = useState<string>("sim");

  const handleNext = () => {
    if (!selectedTaxonomy) return;

    console.log("Opção selecionada:", selectedTaxonomy);
  };

  return (
    <SetupLayout
      currentStep={4}
      onNextClick={handleNext}
      isNextDisabled={!selectedTaxonomy}
      nextLabel="Continuar"
      missingMessage="Selecione uma opção de taxonomia antes de continuar.">
      <RiskTaxonomySelector
        defaultValue={selectedTaxonomy}
        onChange={(selectedId) => setSelectedTaxonomy(selectedId)}
      />
    </SetupLayout>
  );
}
