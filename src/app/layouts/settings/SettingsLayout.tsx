import SettingsFooter from "./components/SettingsFooter";
import SettingsHeader from "./components/SettingsHeader";

export default function SettingsLayout({
  children,
  onNextClick,
  isNextDisabled,
  missingMessage,
  nextLabel,
}: {
  children: React.ReactNode;
  onNextClick: () => void;
  isNextDisabled: boolean;
  missingMessage?: string;
  nextLabel?: string;
}) {
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      {" "}
      <SettingsHeader />{" "}
      <main className="w-full h-full max-w-360.5 p-4"> {children} </main>{" "}
      <SettingsFooter
        onNextClick={onNextClick}
        isNextDisabled={isNextDisabled}
        missingMessage={missingMessage}
        nextLabel={nextLabel}
      />{" "}
    </div>
  );
}
