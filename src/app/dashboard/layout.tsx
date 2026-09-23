"use client"; // Necessário para usar hooks de navegação

import React from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

export interface MenuItem {
  label: string;
  icon: string;
  link: string;
}

export interface MenuGroup {
  title: string;
  items: MenuItem[];
}

const MENU_ITEMS: MenuGroup[] = [
  {
    title: "Visão Geral",
    items: [
      {
        label: "Página Inicial",
        icon: "/icons/sidebar/home.svg",
        link: "/dashboard",
      },
    ],
  },
  {
    title: "Gestão de Riscos",
    items: [
      {
        label: "Governance Hub",
        icon: "/icons/sidebar/governance-hub.svg",
        link: "/governance",
      },
      {
        label: "Assessments",
        icon: "/icons/sidebar/assessments.svg",
        link: "/assessments",
      },
      {
        label: "Aprovações",
        icon: "/icons/sidebar/aprovacoes.svg",
        link: "/aprovacoes",
      },
      {
        label: "Registo de Riscos",
        icon: "/icons/sidebar/riscos.svg",
        link: "/riscos",
      },
    ],
  },
  {
    title: "Configurações",
    items: [
      {
        label: "Biblioteca de Modelos",
        icon: "/icons/sidebar/biblioteca.svg",
        link: "/biblioteca",
      },
      {
        label: "Métricas KRI",
        icon: "/icons/sidebar/metricas.svg",
        link: "/metricas",
      },
    ],
  },
  {
    title: "Administração",
    items: [
      {
        label: "Usuários",
        icon: "/icons/sidebar/usuarios.svg",
        link: "/dashboard/usuarios",
      },
    ],
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Função para buscar o grupo (categoria) e a página ativa com base na rota atual
  const getActiveHeader = () => {
    for (const group of MENU_ITEMS) {
      const activeItem = group.items.find((item) => item.link === pathname);
      if (activeItem) {
        return {
          menuTitle: group.title,
          currentPage: activeItem.label,
        };
      }
    }

    // Retorno padrão caso a rota não esteja cadastrada no menu
    return {
      menuTitle: "Início",
      currentPage: "Página Inicial",
    };
  };

  const { menuTitle, currentPage } = getActiveHeader();

  return (
    <div className="flex h-screen w-full font-inter bg-background text-foreground">
      <Sidebar menuItems={MENU_ITEMS} />

      <div className="flex flex-col flex-1 min-w-0">
        <Header
          menuTitle={menuTitle}
          currentPage={currentPage}
        />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
