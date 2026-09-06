"use client";

import React, { useState, useRef } from "react";

export interface AddFrameworkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: { name: string; scope: string; file: File | null }) => void;
}

export default function AddFrameworkModal({
  isOpen,
  onClose,
  onAdd,
}: AddFrameworkModalProps) {
  const [name, setName] = useState("");
  const [scope, setScope] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !scope) return;

    onAdd({ name, scope, file: selectedFile });
    setName("");
    setScope("");
    setSelectedFile(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 font-inter">
      <div className="bg-white rounded-lg w-full max-w-187 p-6 shadow-xl relative animate-in fade-in zoom-in-95 duration-150">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 text-cinza hover:text-cinza-2 transition-colors">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15 5L5 15M5 5L15 15"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <h2 className="text-2xl font-medium text-cinza font-google-sans mb-6">
          Adicionar framework personalizado
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">
                Nome<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Digite o nome do framework"
                className="w-full px-3.5 py-2.5 bg-white border border-line rounded-lg text-sm text-slate-800 placeholder-cinza-2 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">
                Âmbito<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={scope}
                onChange={(e) => setScope(e.target.value)}
                placeholder="Digite o âmbito do framework"
                className="w-full px-3.5 py-2.5 bg-white border border-line rounded-lg text-sm text-slate-800 placeholder-cinza-2 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>
          </div>

          <div className="border border-dashed border-line rounded-xl gap-4 p-8 flex flex-col items-center justify-center text-center bg-slate-50/50">
            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center mb-4 ring-16 ring-primary/10">
              <svg
                width="24"
                height="24"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10.8333 1.66675H9.16659C8.70634 1.66675 8.33325 2.03985 8.33325 2.50008V4.16675C8.33325 4.62698 8.70634 5.00008 9.16659 5.00008H10.8333C11.2935 5.00008 11.6666 4.62698 11.6666 4.16675V2.50008C11.6666 2.03985 11.2935 1.66675 10.8333 1.66675Z"
                  stroke="#ffffff"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.8333 15H9.16659C8.70634 15 8.33325 15.3731 8.33325 15.8333V17.5C8.33325 17.9602 8.70634 18.3333 9.16659 18.3333H10.8333C11.2935 18.3333 11.6666 17.9602 11.6666 17.5V15.8333C11.6666 15.3731 11.2935 15 10.8333 15Z"
                  stroke="#ffffff"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.6667 3.33325H13.3334C14.5119 3.33325 15.1012 3.33325 15.4673 3.69937C15.8334 4.06549 15.8334 4.65474 15.8334 5.83325"
                  stroke="#ffffff"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.33341 3.33325H6.66675C5.48824 3.33325 4.89898 3.33325 4.53286 3.69937C4.16675 4.06549 4.16675 4.65474 4.16675 5.83325"
                  stroke="#ffffff"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.33341 16.6667H6.66675C5.48824 16.6667 4.89898 16.6667 4.53286 16.3007C4.16675 15.9345 4.16675 15.3452 4.16675 14.1667"
                  stroke="#ffffff"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.6667 16.6667H13.3334C14.5119 16.6667 15.1012 16.6667 15.4673 16.3007C15.8334 15.9345 15.8334 15.3452 15.8334 14.1667"
                  stroke="#ffffff"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.33325 10H11.6666"
                  stroke="#ffffff"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17.5001 10.8333V9.16659C17.5001 8.70634 17.127 8.33325 16.6667 8.33325H15.0001C14.5398 8.33325 14.1667 8.70634 14.1667 9.16659V10.8333C14.1667 11.2935 14.5398 11.6666 15.0001 11.6666H16.6667C17.127 11.6666 17.5001 11.2935 17.5001 10.8333Z"
                  stroke="#ffffff"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5.83333 10.8333V9.16659C5.83333 8.70634 5.46023 8.33325 5 8.33325H3.33333C2.8731 8.33325 2.5 8.70634 2.5 9.16659V10.8333C2.5 11.2935 2.8731 11.6666 3.33333 11.6666H5C5.46023 11.6666 5.83333 11.2935 5.83333 10.8333Z"
                  stroke="#ffffff"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="flex flex-col items-center justify-center gap-2">
              <p className="text-base font-medium text-cinza">
                Clique para Importar famework
              </p>
              <p className="text-sm text-cinza-2">
                CSV, JSON, até 50 MB
              </p>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".csv,.json"
                className="hidden"
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="cursor-pointer px-3.5 py-2.5 border border-line bg-white hover:bg-slate-50 text-cinza text-sm font-medium rounded-lg transition-colors shadow-sm">
                {selectedFile ? selectedFile.name : "Selecionar ficheiro"}
              </button>
            </div>
          </div>

          {/* Botão de Ação */}
          <button
            type="submit"
            className="w-full py-3 bg-primary hover:bg-primary/80 cursor-pointer text-white font-medium text-sm rounded-xl transition-colors shadow-sm">
            Adicionar
          </button>
        </form>
      </div>
    </div>
  );
}
