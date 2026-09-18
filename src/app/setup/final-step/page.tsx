"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SetupLayout from "@/app/layouts/setup/SetupLayout";
import SetupSummary from "./components/SetupSummary";
import SuccessModal from "./components/SuccessModal";

export default function SetupPage() {
  const router = useRouter();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleNext = () => {
    console.log("Configuração inicial concluída");
    setIsSuccessModalOpen(true);
  };

  return (
    <>
      <SetupLayout
        currentStep={6}
        onNextClick={handleNext}
        isNextDisabled={false}
        nextLabel="Concluir configuração">
        <SetupSummary />
      </SetupLayout>

      {isSuccessModalOpen && (
        <SuccessModal onGoToDashboard={() => router.push("/dashboard")} />
      )}
    </>
  );
}
