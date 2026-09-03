import Image from "next/image";
import Link from "next/link";

type LogoType = {
  type: "primary" | "secondary";
};

export default function Logo({ type }: LogoType) {
  return (
    <Link href={"/"}>
      <Image
        src={
          type === "primary"
            ? "/images/logos/logo.svg"
            : type === "secondary"
              ? "/images/logos/logo-blue.svg"
              : ""
        }
        alt=""
        width={130}
        height={39}
        className="object-contain w-auto h-auto"
      />{" "}
    </Link>
  );
}
