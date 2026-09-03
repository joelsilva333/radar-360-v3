"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuItem {
  title: string;
  items: {
    label: string;
    icon: string;
    link: string;
  }[];
}

export default function Sidebar({ menuItems }: { menuItems: MenuItem[] }) {
  const pathname = usePathname();

  return (
    <div className="max-w-65 w-full text-white h-screen font-inter bg-primary-3 flex flex-col justify-between">
      <Link
        href="/"
        className="flex h-20 items-center justify-center w-full px-5 py-6 bg-primary-2">
        <Image
          src="/images/logos/logo.svg"
          alt="Logo"
          width={130}
          height={40}
        />
      </Link>

      <ul className="p-4 flex flex-col h-full gap-4 overflow-y-auto">
        {menuItems.map((menu, index) => (
          <div
            key={index}
            className="flex flex-col gap-2.5">
            <h1 className="text-xs font-medium uppercase text-white/70">
              {menu.title}
            </h1>

            {menu.items.map((item, itemIndex) => {
              const isActive = pathname === item.link;

              return (
                <li key={itemIndex}>
                  <Link
                    href={item.link}
                    className={`flex items-center gap-2 py-2 px-4 rounded-lg transition-all duration-300 hover:bg-primary ${
                      isActive ? "bg-primary" : ""
                    }`}>
                    <Image
                      src={item.icon}
                      alt={item.label}
                      width={20}
                      height={20}
                    />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </div>
        ))}
      </ul>

      <div className="flex items-center gap-2 p-4 border-t border-white/10">
        <Image
          src="/images/avatars/user.jpg"
          alt="Avatar"
          width={40}
          height={40}
          className="rounded-full bg-gray-500"
        />

        <div className="flex flex-col">
          <h1 className="font-normal text-sm text-white">Joel Silva</h1>
          <p className="text-sm font-normal text-white/50">Administrador</p>
        </div>
      </div>
    </div>
  );
}
