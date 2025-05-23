import { Logo } from "./logo";

export function LegitLogoHorizontal() {
  return (
    <div className="flex items-center justify-center mt-8 mb-4">
      <Logo size="sm" />
      <span className="text-xl font-semibold">Legit</span>
    </div>
  );
}

export function LegitLogoVertical() {
  return (
    <div className="flex-col items-center justify-center mt-8 mb-4">
      <Logo size="sm" />
      <span className="text-xl font-semibold">Legit</span>
    </div>
  );
}
