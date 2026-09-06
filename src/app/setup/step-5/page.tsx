"use client";

import { useState } from "react";
import SetupLayout from "@/app/layouts/setup/SetupLayout";
import RiskAssessmentMatrix, {
  MatrixSize,
} from "./components/RiskAssessmentMatrix";

export default function SetupPage() {
  const [selectedMatrix, setSelectedMatrix] = useState<MatrixSize | null>(
    "3x3",
  );

  const handleNext = () => {
    if (!selectedMatrix) return;

    console.log("Matriz selecionada:", selectedMatrix);
  };

  return (
    <SetupLayout
      currentStep={5}
      onNextClick={handleNext}
      isNextDisabled={!selectedMatrix}
      nextLabel="Continuar"
      missingMessage="Selecione uma opção de taxonomia antes de continuar.">
      <RiskAssessmentMatrix
        value={selectedMatrix}
        onChange={setSelectedMatrix}
      />
    </SetupLayout>
  );
}
