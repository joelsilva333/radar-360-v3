"use client";

import CloseButton from "@/app/ui/CloseButton";
import Logo from "@/app/ui/Logo";

export default function SettingsHeader() {
  return (
    <header className="px-20 py-5 w-full bg-white z-50 border-line border-b justify-center flex items-center shadow-black/5 shadow-sm">
      <div className="flex justify-between items-center w-full max-w-360.5 ">
        <Logo type="secondary" />
        <CloseButton onClick={() => {}} />
      </div>
    </header>
  );
}
