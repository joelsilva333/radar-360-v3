import { notFound } from "next/navigation";

/*
 * URLs desconhecidos só chegam ao not-found da raiz. Esta rota apanha
 * qualquer /dashboard/* inexistente e chama notFound(), para que seja
 * mostrado o 404 do dashboard (com sidebar e header).
 */
export default function DashboardCatchAll() {
  notFound();
}
