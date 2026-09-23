import type { Metadata } from "next";
import UsersManagement from "./components/UsersManagement";

export const metadata: Metadata = {
  title: "Usuários | Radar 360",
};

export default function UsuariosPage() {
  return <UsersManagement />;
}
