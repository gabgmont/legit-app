import { LoadingDots } from "./loading-animation";

interface LegitButtonProps {
  label: string;
  loadingLabel?: string;
  type?: "submit" | "reset" | "button" | undefined;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export function LegitButton({
  label,
  loadingLabel,
  type,
  onClick,
  disabled = false,
  loading = false,
}: LegitButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className="w-full bg-[#4169e1] text-white py-3 rounded-md font-medium mt-6 disabled:opacity-70"
    >
      {loading ? (
        <span className="flex items-center justify-center">
          {loadingLabel ?? "Loading"}{" "}
          <LoadingDots className="ml-2" color="white" />
        </span>
      ) : (
        `${label}`
      )}
    </button>
  );
}

export function LegitButtonOutline({
  label,
  loadingLabel,
  type,
  onClick,
  disabled = false,
  loading = false,
}: LegitButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className="w-full border border-white rounded-md py-3 mt-auto mb-4"
    >
      {loading ? (
        <span className="flex items-center justify-center">
          {loadingLabel ?? "Loading"}{" "}
          <LoadingDots className="ml-2" color="white" />
        </span>
      ) : (
        `${label}`
      )}
    </button>
  );
}
