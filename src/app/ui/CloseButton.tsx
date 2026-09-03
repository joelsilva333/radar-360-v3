import Image from "next/image";

interface ButtonProps {
  onClick: () => void;
}

export default function CloseButton(prop: ButtonProps) {
  return (
    <button
      onClick={prop.onClick}
      className="cursor-pointer hover:p-1 transition-all duration-300 hover:bg-gray-100 rounded-sm ">
      <Image
        src="/icons/close.svg"
        alt="Botão de fechar menu"
        width={44}
        height={44}
        className="object-contain w-6 h-6"
      />
    </button>
  );
}
