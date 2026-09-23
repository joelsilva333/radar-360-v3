"use client";

import {
  JOB_TITLES,
  USER_ROLE_LABELS,
  USER_ROLES,
  UserRole,
} from "@/core/types/user";
import { ChevronDown, X } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";

export interface InviteUserData {
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  roles: UserRole[];
}

interface InviteUserModalProps {
  /** E-mails já existentes, para evitar convites duplicados. */
  existingEmails: string[];
  onClose: () => void;
  onInvite: (data: InviteUserData) => void;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass = (hasError: boolean) =>
  `w-full rounded-lg border px-3 py-2.5 text-sm text-cinza outline-none transition-colors placeholder:text-cinza-3 focus:border-primary ${
    hasError ? "border-red-500" : "border-line"
  }`;

const Label = ({
  htmlFor,
  children,
}: {
  htmlFor?: string;
  children: string;
}) => (
  <label
    htmlFor={htmlFor}
    className="text-sm font-medium text-cinza">
    {children}
    <span
      aria-hidden
      className="text-red-600">
      *
    </span>
  </label>
);

const FieldError = ({ id, message }: { id: string; message?: string }) =>
  message ? (
    <p
      id={id}
      className="text-xs text-red-600">
      {message}
    </p>
  ) : null;

const requiredText = (message: string) => ({
  validate: (value: string) => value.trim().length > 0 || message,
});

export default function InviteUserModal({
  existingEmails,
  onClose,
  onInvite,
}: InviteUserModalProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<InviteUserData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      jobTitle: "",
      roles: [],
    },
  });

  const hasJobTitle = useWatch({ control, name: "jobTitle" }) !== "";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="invite-user-title"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        className="flex max-h-full w-full max-w-186 flex-col gap-5 overflow-y-auto rounded-lg bg-white p-6 font-inter shadow-lg">
        <div className="flex items-center justify-between gap-4">
          <h2
            id="invite-user-title"
            className="font-google-sans text-2xl font-medium text-cinza">
            Convidar utilizador
          </h2>

          <button
            type="button"
            aria-label="Fechar"
            onClick={onClose}
            className="cursor-pointer rounded p-1 transition-colors hover:bg-gray-100">
            <X
              aria-hidden
              size={24}
              strokeWidth={1.5}
              className="text-cinza"
            />
          </button>
        </div>

        <form
          noValidate
          onSubmit={handleSubmit(onInvite)}
          className="flex flex-col gap-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="invite-first-name">Nome</Label>
              <input
                id="invite-first-name"
                autoFocus
                autoComplete="given-name"
                aria-invalid={!!errors.firstName}
                aria-describedby="invite-first-name-error"
                className={inputClass(!!errors.firstName)}
                {...register("firstName", requiredText("Indique o nome."))}
              />
              <FieldError
                id="invite-first-name-error"
                message={errors.firstName?.message}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="invite-last-name">Apelido</Label>
              <input
                id="invite-last-name"
                autoComplete="family-name"
                aria-invalid={!!errors.lastName}
                aria-describedby="invite-last-name-error"
                className={inputClass(!!errors.lastName)}
                {...register("lastName", requiredText("Indique o apelido."))}
              />
              <FieldError
                id="invite-last-name-error"
                message={errors.lastName?.message}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="invite-email">E-mail</Label>
            <input
              id="invite-email"
              type="email"
              autoComplete="email"
              placeholder="nome@empresa.ao"
              aria-invalid={!!errors.email}
              aria-describedby="invite-email-error"
              className={inputClass(!!errors.email)}
              {...register("email", {
                required: "Indique o e-mail.",
                pattern: {
                  value: EMAIL_PATTERN,
                  message: "Indique um e-mail válido.",
                },
                validate: (value) =>
                  !existingEmails.includes(value.trim().toLowerCase()) ||
                  "Já existe um utilizador com este e-mail.",
              })}
            />
            <FieldError
              id="invite-email-error"
              message={errors.email?.message}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="invite-job-title">Cargo</Label>
            <div className="relative">
              <select
                id="invite-job-title"
                aria-invalid={!!errors.jobTitle}
                aria-describedby="invite-job-title-error"
                className={`${inputClass(!!errors.jobTitle)} cursor-pointer appearance-none bg-white pr-10 ${
                  hasJobTitle ? "" : "text-cinza-3"
                }`}
                {...register("jobTitle", { required: "Selecione o cargo." })}>
                <option
                  value=""
                  disabled
                  hidden>
                  Selecione o cargo
                </option>
                {JOB_TITLES.map((title) => (
                  <option
                    key={title}
                    value={title}
                    className="text-cinza">
                    {title}
                  </option>
                ))}
              </select>
              <ChevronDown
                aria-hidden
                size={20}
                className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-cinza"
              />
            </div>
            <FieldError
              id="invite-job-title-error"
              message={errors.jobTitle?.message}
            />
          </div>

          <fieldset
            aria-describedby="invite-roles-error"
            className="flex flex-col gap-2">
            <legend className="mb-2 text-sm font-medium text-cinza">
              Papel
              <span
                aria-hidden
                className="text-red-600">
                *
              </span>
            </legend>

            {USER_ROLES.map((role) => (
              <label
                key={role}
                className="flex w-fit cursor-pointer items-center gap-2.5 text-sm text-cinza">
                {/*
                 * Checkbox nativo escondido, desenhado como switch: mantém o
                 * teclado e os leitores de ecrã a funcionar.
                 */}
                <input
                  type="checkbox"
                  value={role}
                  role="switch"
                  className="peer sr-only"
                  {...register("roles", {
                    validate: (value) =>
                      value.length > 0 || "Selecione pelo menos um papel.",
                  })}
                />
                <span
                  aria-hidden
                  className="relative h-5 w-8 shrink-0 rounded-full bg-gray-200 transition-colors peer-checked:bg-primary peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary after:absolute after:top-0.5 after:left-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:shadow after:transition-transform peer-checked:after:translate-x-3"
                />
                {USER_ROLE_LABELS[role]}
              </label>
            ))}

            <FieldError
              id="invite-roles-error"
              message={errors.roles?.message}
            />
          </fieldset>

          <button
            type="submit"
            className="btn-primary w-full">
            Enviar convite
          </button>
        </form>
      </div>
    </div>
  );
}
