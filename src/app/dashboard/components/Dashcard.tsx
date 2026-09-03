import Image from "next/image";

export default function Dashcard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: string;
}) {
  return (
    <div className="flex flex-col w-full h-full border border-line rounded-2xl p-6 gap-5 hover:bg-cinza-4/5 hover:scale-105 transition-all duration-300 font-inter">
      <div className="flex gap-2.5 items-center">
        <Image
          src={icon}
          alt="Dashbcard"
          width={32}
          height={32}
        />

        <p className="text-base text-cinza-2 font-normal">{title}</p>
      </div>

      <p className="text-2xl text-cinza font-medium">{value}</p>
    </div>
  );
}
