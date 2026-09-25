"use client";

import Image from "next/image";
import Title from "./components/Title";
import Dashcard from "./components/Dashcard";
import WithoutActivity from "./components/WithoutActivity";
import WelcomeSetupModal from "./components/WelcomeSetupModal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useHydrated } from "@/core/hooks/useHydrated";
import { useSetupData } from "@/core/hooks/useSetupData";
import {
  getFirstIncompleteSetupStep,
  SETUP_STEP_PATHS,
} from "@/core/setup/steps";

export default function Home() {
  const dashcards = [
    {
      title: "Assessments",
      value: 0,
      icon: "/icons/dashcard/assessment.svg",
    },
    {
      title: "Issues Abertas",
      value: 0,
      icon: "/icons/dashcard/assessment.svg",
    },
    {
      title: "KRIs em Vermelho",
      value: 0,
      icon: "/icons/dashcard/assessment.svg",
    },
    {
      title: "Obrigações em Atraso",
      value: 0,
      icon: "/icons/dashcard/assessment.svg",
    },
    {
      title: "Incidentes Activos",
      value: 0,
      icon: "/icons/dashcard/assessment.svg",
    },
    {
      title: "Controlos",
      value: 0,
      icon: "/icons/dashcard/assessment.svg",
    },
    {
      title: "Terceiros",
      value: 0,
      icon: "/icons/dashcard/assessment.svg",
    },
    {
      title: "Auditorias",
      value: 0,
      icon: "/icons/dashcard/assessment.svg",
    },
  ];

  const router = useRouter();

  const hydrated = useHydrated();

  const [setupData] = useSetupData();

  const [modalDismissed, setModalDismissed] = useState(false);

  /*
   * Só depois da hidratação sabemos se o setup está concluído (vem do
   * localStorage). Antes disso não mostramos nada, para não piscar o modal
   * a quem já concluiu.
   */
  const isSetupPending = hydrated && !setupData.completedAt;

  const hasStartedSetup = getFirstIncompleteSetupStep(setupData) > 1;

  const showSetupModal = isSetupPending && !modalDismissed;

  const handleCloseSetupModal = () => {
    setModalDismissed(true);
  };

  /*
   * Retoma no primeiro passo por preencher.
   */
  const handleStartSetup = () => {
    setModalDismissed(true);

    router.push(SETUP_STEP_PATHS[getFirstIncompleteSetupStep(setupData)]);
  };

  return (
    <>
      {showSetupModal && (
        <WelcomeSetupModal
          onStart={handleStartSetup}
          onClose={handleCloseSetupModal}
        />
      )}
      <div className="flex flex-col gap-6 overflow-y-auto w-full font-inter">
        <div className="flex justify-between items-center w-full">
          <Title
            title="Bem-vindo(a) Barba Azul"
            subtitle={
              setupData.completedAt
                ? "Acompanhe aqui a atividade de governança, risco e compliance da sua organização."
                : "Vamos começar a configurar o seu ambiente para que os dados comecem a aparecer aqui."
            }
          />

          {isSetupPending && (
            <button
              type="button"
              onClick={handleStartSetup}
              className="btn-primary px-4">
              <Image
                src="/icons/config.svg"
                alt=""
                width={20}
                height={20}
              />
              {hasStartedSetup
                ? "Continuar configuração"
                : "Iniciar configuração"}
            </button>
          )}
        </div>

        <ul className="grid grid-cols-4 gap-6">
          {dashcards.map((card, index) => (
            <li
              key={index}
              className="w-full max-w-96.25 h-32">
              <Dashcard
                title={card.title}
                value={card.value}
                icon={card.icon}
              />
            </li>
          ))}
        </ul>

        <ul className="grid grid-cols-2 gap-6">
          <li className="p-6 min-h-198.5 w-full items-center font-inter rounded-2xl border border-line flex flex-col gap-4">
            <div className="flex flex-col w-full">
              <h1 className="text-lg font-medium text-cinza font-google-sans">
                Assessments Recentes
              </h1>
              <p className="text-sm text-cinza-2 font-normal">
                Distribuição de riscos por probabilidade e impacto
              </p>
            </div>

            <div className="h-full flex items-center justify-center">
              <WithoutActivity />
            </div>
          </li>

          <li className="p-6 min-h-198.5 w-full items-center font-inter rounded-2xl border border-line flex flex-col gap-4">
            <div className="flex flex-col w-full">
              <h1 className="text-lg font-medium text-cinza font-google-sans">
                Atividades Recentes
              </h1>
              <p className="text-sm text-cinza-2 font-normal">
                Distribuição de riscos por probabilidade e impacto
              </p>
            </div>

            <div className="h-full flex items-center justify-center">
              <WithoutActivity />
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}
