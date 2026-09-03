export default function Title({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex flex-col font-inter gap-2">
      <h1 className="text-xl text-cinza font-medium font-google-sans">{title}</h1>
      <p className="text-base text-cinza-2 font-normal">{subtitle}</p>
    </div>
  );
}
