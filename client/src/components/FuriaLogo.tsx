import React from "react";

interface FuriaLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function FuriaLogo({ className = "", size = "md" }: FuriaLogoProps) {
  // Define tamanhos com base no parâmetro size
  const sizes = {
    sm: "w-10 h-10",
    md: "w-16 h-16",
    lg: "w-28 h-28",
  };

  return (
    <div className={`${sizes[size]} ${className}`}>
      {/* Logo da FURIA estilizado - pantera */}
      <svg 
        viewBox="0 0 200 200" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <g transform="translate(0, 10)">
          {/* Contorno externo da pantera */}
          <path 
            d="M100 10
               C60 10 30 30 30 80
               C30 110 50 160 100 180
               C150 160 170 110 170 80
               C170 30 140 10 100 10Z" 
            fill="black" 
            stroke="white" 
            strokeWidth="4"
          />
          
          {/* Juba da pantera */}
          <path 
            d="M70 40
               C60 45 50 60 50 80
               C50 100 60 120 80 130
               C60 115 55 90 60 75
               C65 60 75 45 95 40
               C115 35 130 40 140 55
               C130 40 110 30 90 35
               C80 37 75 40 70 45"
            fill="black" 
            stroke="white" 
            strokeWidth="3"
          />
          
          {/* Olho */}
          <path 
            d="M130 55
               C125 60 120 65 110 65
               C100 65 95 60 93 55
               C95 65 105 75 120 70
               C128 67 130 60 130 55Z"
            fill="black" 
            stroke="white" 
            strokeWidth="3"
          />
          
          {/* Boca aberta */}
          <path 
            d="M70 70
               C65 80 67 100 75 115
               C85 130 100 135 120 130
               C100 135 85 130 75 115
               C65 100 65 80 70 70Z"
            fill="black" 
            stroke="white" 
            strokeWidth="3"
          />
          
          {/* Mandíbula */}
          <path 
            d="M85 95
               C80 100 75 110 75 120
               C75 130 80 140 90 145
               C80 140 70 130 70 110
               C70 100 75 90 85 95Z"
            fill="black" 
            stroke="white" 
            strokeWidth="3"
          />
        </g>
      </svg>
    </div>
  );
}