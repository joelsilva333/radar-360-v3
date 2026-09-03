interface LoadingProps {
  size?: "sm" | "md" | "lg";
  color: string;
}

export default function Loading({ size = "md", color = "text-blue-500" }: LoadingProps) {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <div
      className={`${sizes[size]} ${color} animate-spin rounded-full border-2 border-current border-t-transparent`}
    />
  );
}
