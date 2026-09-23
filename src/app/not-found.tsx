import Logo from "@/app/ui/Logo";
import NotFoundContent from "@/app/ui/NotFoundContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página não encontrada | Radar 360",
};

/*
 * 404 da área deslogada. Por ser o not-found da raiz, também apanha
 * qualquer URL que não corresponda a nenhuma rota da aplicação.
 */
export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-10">
      <div className="absolute top-10 left-10">
        <Logo type="secondary" />
      </div>

      <NotFoundContent
        homeHref="/"
        homeLabel="Ir para o login"
      />

      <p className="absolute bottom-3 font-inter text-sm font-normal text-cinza-2">
        © {new Date().getFullYear()} RADAR 360. Todos os direitos reservados.
      </p>
    </div>
  );
}
