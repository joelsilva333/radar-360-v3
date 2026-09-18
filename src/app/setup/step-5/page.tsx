"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SetupLayout from "@/app/layouts/setup/SetupLayout";
import RiskAssessmentMatrix, {
  MatrixSize,
} from "./components/RiskAssessmentMatrix";

export default function SetupPage() {
  const router = useRouter();
  const [selectedMatrix, setSelectedMatrix] = useState<MatrixSize | null>(
    "3x3",
  );

  const handleNext = () => {
    if (!selectedMatrix) return;

    console.log("Matriz selecionada:", selectedMatrix);
    router.push("/setup/final-step");
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
