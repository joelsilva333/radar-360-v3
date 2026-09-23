export default function AuthFormLayout({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title: string;
  description?: React.ReactNode;
}) {
  return (
    <div className="flex w-115 flex-col gap-6  overflow-y-auto pb-5">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl text-cinza font-semibold font-inter">
          {title}
        </h1>

        {description && (
          <p className="text-sm text-cinza-2 font-normal font-inter">
            {description}
          </p>
        )}
      </div>

      {children}
    </div>
  );
}
