import Image from "next/image";

export default function Header({
  menuTitle,
  currentPage,
}: {
  menuTitle: string;
  currentPage: string;
}) {
  return (
    <header className="w-full h-20 px-5 py-6 bg-primary-2 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h1 className="text-sm font-medium text-white">
          <span className="font-normal text-white/50">{menuTitle}</span> /{" "}
          {currentPage}
        </h1>
      </div>

      <ul className="flex items-center gap-4">
        <li>
          <button className="border border-[#E6F1FF] rounded-lg flex items-center justify-center w-8 h-8 cursor-pointer hover:scale-105 transition-all duration-300">
            <Image
              src="/icons/header/notification.svg"
              alt="Notification"
              width={20}
              height={20}
            />
          </button>
        </li>
        <li>
          <button className="border border-[#E6F1FF] rounded-lg flex items-center justify-center w-8 h-8 cursor-pointer hover:scale-105 transition-all duration-300">
            <Image
              src="/icons/header/suporte.svg"
              alt="Suporte"
              width={20}
              height={20}
            />
          </button>
        </li>
        <li>
          <button className=" cursor-pointer hover:scale-105 transition-all duration-300">
            <Image
              src="/images/agt.png"
              alt=" "
              width={40}
              height={40}
              className="rounded-lg"
            />
          </button>
        </li>
      </ul>
    </header>
  );
}
