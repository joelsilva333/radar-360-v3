export default function FormInput({
  label,
  children,
}: {
  label: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-sm text-cinza font-medium font-inter">
        {label}
      </label>
      <div className="border rounded-lg border-line p-3  w-full flex items-center gap-2 font-inter text-sm font-normal">
        {children}
      </div>
    </div>
  );
}
