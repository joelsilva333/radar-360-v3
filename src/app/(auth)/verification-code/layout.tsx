import AuthLayout from "@/app/layouts/auth/AuthLayout";

export default function VerificationCodeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthLayout>{children}</AuthLayout>;
}
