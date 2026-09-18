"use client";

interface SummaryCardProps {
  icon: React.ReactNode;
  label: string;
  value?: string;
  description?: string;
  chips?: string[];
}

function SummaryCard({ icon, label, value, description, chips }: SummaryCardProps) {
  return (
    <div className="border border-line rounded-xl p-5 bg-white">
      <div className="flex items-center gap-2 mb-3 text-primary">
        {icon}
        <span className="text-sm font-medium text-cinza-2">{label}</span>
      </div>

      {value && (
        <p className="text-base font-medium text-cinza">{value}</p>
      )}

      {description && (
        <p className="text-sm text-cinza-2 mt-1">{description}</p>
      )}

      {chips && (
        <div className="flex flex-wrap gap-2 mt-1">
          {chips.map((chip) => (
            <span
              key={chip}
              className="px-3 py-1.5 text-xs font-medium text-cinza bg-slate-100 rounded-full">
              {chip}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

const MATRIX_COLUMNS = ["Baixa", "Média", "Alta"];

const MATRIX_ROWS: { label: string; colors: string[] }[] = [
  { label: "Alto", colors: ["bg-amber-500", "bg-red-600", "bg-red-600"] },
  { label: "Média", colors: ["bg-amber-500", "bg-yellow-400", "bg-red-600"] },
  { label: "Baixa", colors: ["bg-emerald-600", "bg-amber-500", "bg-amber-500"] },
];

export default function SetupSummary() {
  return (
    <div className="w-full space-y-6 text-slate-800 font-inter">
      <div className="space-y-2">
        <h1 className="text-2xl font-medium text-cinza font-google-sans">
          Tudo pronto para concluir
        </h1>
        <p className="text-sm text-cinza-2">
          Reveja o resumo. Ao concluir, criamos a versão v1.0 e ativamos a
          plataforma.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SummaryCard
          label="Industria Principal"
          value="Petróleo e Gás"
          description="Recursos Naturais e Energia"
          icon={
            <svg
              width="20"
              height="20"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8.5 23.5001C9.75 21.0001 10.5833 17.6667 10.5833 12.6667H16.4167C16.4167 17.6667 17.25 21.0001 18.5 23.5001"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 9.55412C16.9753 8.18996 18.2232 8.18996 19.1985 9.55412C19.7866 10.3912 20.5468 10.3602 21.1492 9.52313C22.1102 8.15896 23.358 8.15896 24.3333 9.52313"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16.708 16.0593H19.6697C19.787 17.5911 19.6583 20.2636 22.4126 23.3499"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.66663 23.5H23.5"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        />

        <SummaryCard
          label="Jurisdições Ativas"
          chips={[
            "Angola",
            "Alemanha",
            "Portugal",
            "França",
            "Reino Unido",
            "Brasil",
            "Cabo Verde",
          ]}
          icon={
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10 18.3334C14.6024 18.3334 18.3334 14.6025 18.3334 10.0001C18.3334 5.39771 14.6024 1.66675 10 1.66675C5.39765 1.66675 1.66669 5.39771 1.66669 10.0001C1.66669 14.6025 5.39765 18.3334 10 18.3334Z"
                stroke="currentColor"
                strokeWidth="1.25"
              />
              <path
                d="M10 18.3334C11.841 18.3334 13.3334 14.6025 13.3334 10.0001C13.3334 5.39771 11.841 1.66675 10 1.66675C8.15907 1.66675 6.66669 5.39771 6.66669 10.0001C6.66669 14.6025 8.15907 18.3334 10 18.3334Z"
                stroke="currentColor"
                strokeWidth="1.25"
              />
              <path
                d="M1.66669 10H18.3334"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        />

        <SummaryCard
          label="Frameworks"
          chips={[
            "ISO 31000",
            "ISO 9001",
            "RGPD",
            "ISO 27001",
            "ISO 45001",
            "ISO 50001",
          ]}
          icon={
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8333 1.66675H9.16659C8.70634 1.66675 8.33325 2.03985 8.33325 2.50008V4.16675C8.33325 4.62698 8.70634 5.00008 9.16659 5.00008H10.8333C11.2935 5.00008 11.6666 4.62698 11.6666 4.16675V2.50008C11.6666 2.03985 11.2935 1.66675 10.8333 1.66675Z"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10.8333 15H9.16659C8.70634 15 8.33325 15.3731 8.33325 15.8333V17.5C8.33325 17.9602 8.70634 18.3333 9.16659 18.3333H10.8333C11.2935 18.3333 11.6666 17.9602 11.6666 17.5V15.8333C11.6666 15.3731 11.2935 15 10.8333 15Z"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.6667 3.33325H13.3334C14.5119 3.33325 15.1012 3.33325 15.4673 3.69937C15.8334 4.06549 15.8334 4.65474 15.8334 5.83325"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.33341 3.33325H6.66675C5.48824 3.33325 4.89898 3.33325 4.53286 3.69937C4.16675 4.06549 4.16675 4.65474 4.16675 5.83325"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.33341 16.6667H6.66675C5.48824 16.6667 4.89898 16.6667 4.53286 16.3007C4.16675 15.9345 4.16675 15.3452 4.16675 14.1667"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.6667 16.6667H13.3334C14.5119 16.6667 15.1012 16.6667 15.4673 16.3007C15.8334 15.9345 15.8334 15.3452 15.8334 14.1667"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.33325 10H11.6666"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17.5001 10.8333V9.16659C17.5001 8.70634 17.127 8.33325 16.6667 8.33325H15.0001C14.5398 8.33325 14.1667 8.70634 14.1667 9.16659V10.8333C14.1667 11.2935 14.5398 11.6666 15.0001 11.6666H16.6667C17.127 11.6666 17.5001 11.2935 17.5001 10.8333Z"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.83333 10.8333V9.16659C5.83333 8.70634 5.46023 8.33325 5 8.33325H3.33333C2.8731 8.33325 2.5 8.70634 2.5 9.16659V10.8333C2.5 11.2935 2.8731 11.6666 3.33333 11.6666H5C5.46023 11.6666 5.83333 11.2935 5.83333 10.8333Z"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        />

        <SummaryCard
          label="Taxonomia de Risco"
          value="Em construção (Guiado)"
          description="Definição e aprovação no Governance Hub"
          icon={
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M15.8038 3.30381L14.5711 2.07115C14.4133 1.91332 14.3344 1.83441 14.241 1.78001C14.1762 1.74226 14.1066 1.71345 14.0341 1.69431C13.9296 1.66675 13.818 1.66675 13.5948 1.66675C12.5718 1.66675 12.0604 1.66675 11.6779 1.88366C11.4158 2.03228 11.1989 2.24916 11.0503 2.51123C10.8334 2.89371 10.8334 3.4052 10.8334 4.42817V5.41675C10.8334 6.58713 10.8334 7.17232 11.1143 7.5927C11.2359 7.77468 11.3921 7.93093 11.5741 8.05253C11.9945 8.33341 12.5796 8.33341 13.75 8.33341C14.9205 8.33341 15.5056 8.33341 15.926 8.05253C16.108 7.93093 16.2642 7.77468 16.3858 7.5927C16.6667 7.17232 16.6667 6.58017 16.6667 5.39587C16.6667 4.86791 16.6667 4.60393 16.5915 4.36218C16.5614 4.26536 16.5225 4.17147 16.4754 4.08171C16.3575 3.85761 16.173 3.67301 15.8038 3.30381Z"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15.8038 13.3038L14.5711 12.0712C14.4133 11.9133 14.3344 11.8344 14.241 11.78C14.1762 11.7422 14.1066 11.7134 14.0341 11.6943C13.9296 11.6667 13.818 11.6667 13.5948 11.6667C12.5718 11.6667 12.0604 11.6667 11.6779 11.8837C11.4158 12.0322 11.1989 12.2492 11.0503 12.5112C10.8334 12.8937 10.8334 13.4052 10.8334 14.4282V15.4167C10.8334 16.5872 10.8334 17.1723 11.1143 17.5927C11.2359 17.7747 11.3921 17.9309 11.5741 18.0525C11.9945 18.3334 12.5796 18.3334 13.75 18.3334C14.9205 18.3334 15.5056 18.3334 15.926 18.0525C16.108 17.9309 16.2642 17.7747 16.3858 17.5927C16.6667 17.1723 16.6667 16.5802 16.6667 15.3958C16.6667 14.8679 16.6667 14.6039 16.5915 14.3622C16.5614 14.2653 16.5225 14.1715 16.4754 14.0817C16.3575 13.8576 16.173 13.673 15.8038 13.3038Z"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.33337 5.00008H3.33337M3.33337 5.00008V1.66675M3.33337 5.00008V10.0001C3.33337 12.3571 3.33337 13.5356 4.06561 14.2678C4.79784 15.0001 5.97635 15.0001 8.33337 15.0001"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        />

        <SummaryCard
          label="Responsável"
          value="Joshua Michael"
          description="Chief Risk Officer"
          icon={
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <circle
                cx="10"
                cy="6.66675"
                r="3.33325"
                stroke="currentColor"
                strokeWidth="1.25"
              />
              <path
                d="M3.33331 17.0833C3.33331 13.816 6.31739 11.1666 9.99998 11.1666C13.6826 11.1666 16.6666 13.816 16.6666 17.0833"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
              />
            </svg>
          }
        />

        <SummaryCard
          label="Matriz de Avaliação"
          value="3x3"
          description="9 níveis"
          icon={
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3.24268 16.7573C2.08331 15.5978 2.08331 13.7318 2.08331 9.99992C2.08331 6.26797 2.08331 4.40199 3.24268 3.24262C4.40205 2.08325 6.26803 2.08325 9.99998 2.08325C13.7319 2.08325 15.5979 2.08325 16.7573 3.24262C17.9166 4.40199 17.9166 6.26797 17.9166 9.99992C17.9166 13.7318 17.9166 15.5978 16.7573 16.7573C15.5979 17.9166 13.7319 17.9166 9.99998 17.9166C6.26803 17.9166 4.40205 17.9166 3.24268 16.7573Z"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2.5 7.5H17.5"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2.5 12.5H17.5"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 7.5V12.5"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        />
      </div>

      <div className="border border-line rounded-xl p-5 bg-white">
        <div
          className="grid gap-2 mb-2 pl-16"
          style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}>
          {MATRIX_COLUMNS.map((label) => (
            <div
              key={label}
              className="text-center text-xs font-medium text-slate-500">
              {label}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          {MATRIX_ROWS.map((row) => (
            <div
              key={row.label}
              className="flex items-center gap-3">
              <div className="w-13 text-right text-xs font-medium text-slate-500 shrink-0">
                {row.label}
              </div>

              <div
                className="grid gap-2 flex-1"
                style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}>
                {row.colors.map((color, index) => (
                  <div
                    key={index}
                    className={`h-12 rounded-lg ${color}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
