import React from "react";

interface CenteredContainerProps {
  children: React.ReactNode;
}

export function CenteredContainer({ children }: CenteredContainerProps) {
  return (
    <div className="flex flex-col justify-center items-center h-[100dvh] bg-[#050810] text-white">
      <div className="w-full sm:w-96 flex-1 flex flex-col items-center justify-center px-8 py-8">
        {children}
      </div>
    </div>
  );
}