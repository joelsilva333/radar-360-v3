import VerificationForm from "./components/VerificationForm";

/*
 * O e-mail chega por query string (ex.: /verification-code?email=...),
 * enviado pela página que pediu o código.
 */
export default async function VerificationCode({
  searchParams,
}: PageProps<"/verification-code">) {
  const { email } = await searchParams;

  return (
    <VerificationForm email={typeof email === "string" ? email : undefined} />
  );
}
