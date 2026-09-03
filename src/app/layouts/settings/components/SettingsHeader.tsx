'use client'

import CloseButton from "@/app/ui/CloseButton";
import Logo from "@/app/ui/Logo";

export default function SettingsHeader() {
  return (
    <header className="px-60 py-5 w-full border-line border-b justify-between flex items-center shadow-black/5 shadow-sm">
      <Logo type="secondary" />
      <CloseButton onClick={() => {}} />
    </header>
  );
}
