"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Loading from "@/app/ui/Loading";

export default function SettingsFooter({
  onNextClick,
  isNextDisabled,
  missingMessage,
  loading = false,
  nextLabel = "Continuar",
}: {
  onNextClick: () => void | Promise<void>;
  isNextDisabled: boolean;
  missingMessage?: string;
  loading?: boolean;
  nextLabel?: string;
}) {
  const router = useRouter();

  const handleBackClick = () => {
    if (loading) return;

    router.back();
  };

  const handleNextClick = () => {
    if (loading) return;

    if (isNextDisabled) {
      toast.warning(
        missingMessage ||
          "Preencha todos os campos obrigatórios antes de continuar.",
      );
      return;
    }

    onNextClick();
  };

  return (
    <footer className="bg-white border-t shadow-black/5 shadow-sm border-line w-full py-1 px-60 flex gap-2 h-20 items-center justify-between">
      <button
        type="button"
        onClick={handleBackClick}
        disabled={loading}
        className="btn-secondary text-cinza-2 w-fit disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Voltar para a página anterior">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M4.58337 10.0016H15.8334"
            stroke="#70808F"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M9.16657 15.0016C9.16657 15.0016 4.16663 11.3191 4.16663 10.0015C4.16662 8.68396 9.16665 5.00159 9.16665 5.00159"
            stroke="#70808F"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Voltar
      </button>

      <button
        type="button"
        className="btn-primary w-fit min-w-28 px-4 flex items-center justify-center disabled:cursor-not-allowed disabled:bg-primary/50"
        disabled={isNextDisabled || loading}
        aria-disabled={isNextDisabled || loading}
        onClick={handleNextClick}>
        {loading ? (
          <Loading
            color="text-white"
            size="sm"
          />
        ) : (
          <>
            {nextLabel}
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M15.4167 10.0016H4.16666"
                stroke="white"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10.8334 15.0016C10.8334 15.0016 15.8334 11.3191 15.8334 10.0015C15.8334 8.68396 10.8333 5.00159 10.8333 5.00159"
                stroke="white"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </>
        )}
      </button>
    </footer>
  );
}
