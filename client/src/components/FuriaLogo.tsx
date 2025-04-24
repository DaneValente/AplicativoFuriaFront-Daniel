import React from "react";

interface FuriaLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function FuriaLogo({ className = "", size = "md" }: FuriaLogoProps) {
  // Define tamanhos com base no parâmetro size
  const sizes = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-20 h-20",
  };

  return (
    <div className={`${sizes[size]} ${className}`}>
      <img 
        src="/client/src/assets/fura-logo.png" 
        alt="FURIA Esports Logo"
        className="w-full h-full object-contain"
      />
    </div>
  );
}