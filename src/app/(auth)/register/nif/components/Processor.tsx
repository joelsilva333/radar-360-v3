"use client";

import { useEffect, useState } from "react";
import Loading from "@/app/ui/Loading";

interface ProcessorProps {
  onComplete?: () => void;
  duration?: number;
  title?: string;
  description?: string;
}

export default function Processor({
  onComplete,
  duration = 3200,
  title = "Validando informações da empresa",
  description = "Estamos a processar os dados da organização. Aguarde um momento.",
}: ProcessorProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setProgress(20), 300),
      setTimeout(() => setProgress(45), 900),
      setTimeout(() => setProgress(70), 1500),
      setTimeout(() => setProgress(90), 2100),
      setTimeout(() => setProgress(100), 2700),
    ];

    const completionTimer = setTimeout(() => {
      onComplete?.();
    }, duration);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(completionTimer);
    };
  }, [duration, onComplete]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-white">
      <div className="flex flex-col items-center max-w-md w-full text-center space-y-6">
        <Loading
          size="lg"
          color="text-primary"
        />

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-cinza">{title}</h2>

          <p className="text-sm text-cinza-2 font-normal font-inter">
            {description}
          </p>
        </div>

        <div className="w-full bg-[#F4F4F5] rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-primary h-2.5 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
