import Image from "next/image";
import Title from "./components/Title";
import Dashcard from "./components/Dashcard";
import WithoutActivity from "./components/WithoutActivity";

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

  return (
    <div className="flex flex-col gap-6 overflow-y-auto w-full font-inter">
      <div className="flex justify-between items-center w-full">
        <Title
          title="Bem-vindo(a) Barba Azul"
          subtitle="Vamos começar a configurar o seu ambiente para que os dados comecem a aparecer aqui."
        />

        <button className="btn-primary px-4">
          <Image
            src="/icons/config.svg"
            alt="Iniciar configuração"
            width={20}
            height={20}
          />
          Iniciar configuração
        </button>
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
  );
}
