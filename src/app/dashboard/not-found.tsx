import NotFoundContent from "@/app/ui/NotFoundContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página não encontrada | Radar 360",
};

/*
 * 404 da área logada: é renderizado dentro do layout do dashboard, pelo que
 * a sidebar e o header continuam visíveis.
 */
export default function DashboardNotFound() {
  return (
    <div className="flex h-full items-center justify-center">
      <NotFoundContent
        homeHref="/dashboard"
        homeLabel="Ir para a página inicial"
      />
    </div>
  );
}
