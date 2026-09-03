import Image from "next/image";

export default function WithoutActivity() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 text-center w-117 font-inter">
      <Image
        src="/icons/activity.svg"
        alt="Sem atividade"
        width={80}
        height={80}
      />
      <h1 className="text-xl font-semibold text-cinza">
        Ainda não há atividades registradas.
      </h1>
      <p className="text-base text-cinza-2 font-normal">
        Após criar ou atualizar um risco, as ações aparecerão aqui.
      </p>
    </div>
  );
}
