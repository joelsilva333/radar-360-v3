import Image from "next/image";
import Link from "next/link";

type LogoType = "primary" | "secondary";

interface LogoAsset {
  src: string;
  width: number;
  height: number;
}

/*
 * As dimensões têm de corresponder ao tamanho intrínseco de cada ficheiro
 * (logo.svg tem 180x56 e logo-blue.svg tem 130x40). Se apenas uma delas
 * divergir, o Next.js avisa que a imagem pode ficar com a proporção errada.
 */
const LOGOS: Record<LogoType, LogoAsset> = {
  primary: { src: "/images/logos/logo.svg", width: 180, height: 56 },
  secondary: { src: "/images/logos/logo-blue.svg", width: 130, height: 40 },
};

type LogoProps = {
  type: LogoType;
};

export default function Logo({ type }: LogoProps) {
  const { src, width, height } = LOGOS[type];

  return (
    <Link href={"/"}>
      <Image
        src={src}
        alt="RADAR 360"
        width={width}
        height={height}
      />
    </Link>
  );
}
