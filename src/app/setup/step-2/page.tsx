"use client";

import SetupLayout from "@/app/layouts/setup/SetupLayout";
import { useState } from "react";
import OrganizationSelector from "../step-2/components/OrganizationSelector";

export default function SetupPage() {
  const [selectedJurisdictionIds, setSelectedJurisdictionIds] = useState<
    string[]
  >([]);

  const handleNext = () => {
    console.log("Jurisdições selecionadas IDs:", selectedJurisdictionIds);
  };

  return (
    <SetupLayout
      currentStep={2}
      onNextClick={handleNext}
      isNextDisabled={selectedJurisdictionIds.length === 0}
      nextLabel="Continuar"
      missingMessage="Selecione pelo menos uma jurisdição antes de continuar.">
      <OrganizationSelector
        selectedIds={selectedJurisdictionIds}
        onSelect={(ids) => setSelectedJurisdictionIds(ids)}
      />
    </SetupLayout>
  );
}
