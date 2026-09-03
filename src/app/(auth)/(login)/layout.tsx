import AuthLayout from "@/app/layouts/auth/AuthLayout";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthLayout>{children}</AuthLayout>;
}
