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
    lg: "w-16 h-16",
  };

  return (
    <div className={`${sizes[size]} ${className}`}>
      <svg 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Base preta do logo */}
        <path d="M10 10 H90 V90 H10 Z" fill="black" />
        
        {/* Letra "F" estilizada em cinza */}
        <path 
          d="M25 25 H75 V40 H40 V55 H65 V70 H40 V90 H25 V25 Z" 
          fill="#333333" 
        />
        
        {/* Destaque - parte superior do "F" */}
        <path 
          d="M25 25 H75 V40 H25 V25 Z" 
          fill="white" 
        />
        
        {/* Destaque - parte do meio do "F" */}
        <path 
          d="M40 55 H65 V70 H40 V55 Z" 
          fill="white" 
        />
      </svg>
    </div>
  );
}