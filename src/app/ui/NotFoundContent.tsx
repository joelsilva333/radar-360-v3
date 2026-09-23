"use client";

import { ArrowLeft, SearchX } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface NotFoundContentProps {
  homeHref: string;
  homeLabel: string;
}

/*
 * Conteúdo comum às páginas 404. Cada área (logada e deslogada) envolve-o
 * no seu próprio layout e define para onde o botão principal leva.
 */
export default function NotFoundContent({
  homeHref,
  homeLabel,
}: NotFoundContentProps) {
  const router = useRouter();

  return (
    <div className="flex w-full max-w-117 flex-col items-center gap-6 text-center font-inter">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-1">
        <SearchX
          aria-hidden
          size={36}
          strokeWidth={1.5}
          className="text-primary"
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-semibold text-primary">Erro 404</span>

        <h1 className="font-google-sans text-2xl font-medium text-cinza">
          Página não encontrada
        </h1>

        <p className="text-base font-normal text-cinza-2">
          A página que procura não existe, foi removida ou mudou de endereço.
          Verifique o URL ou volte para um local conhecido.
        </p>
      </div>

      <div className="flex w-full flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => router.back()}
          className="btn-secondary flex-1 text-cinza-2">
          <ArrowLeft
            aria-hidden
            size={20}
            strokeWidth={1.25}
          />
          Voltar
        </button>

        <Link
          href={homeHref}
          className="btn-primary flex-1">
          {homeLabel}
        </Link>
      </div>
    </div>
  );
}
