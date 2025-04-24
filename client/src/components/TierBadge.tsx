import { FanScoreTier, TierConfig } from "@/lib/types";
import { getUserTier } from "@/lib/fanScoreUtils";

interface TierBadgeProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showTitle?: boolean;
  className?: string;
}

export default function TierBadge({ score, size = "md", showTitle = true, className = "" }: TierBadgeProps) {
  const tier = getUserTier(score);
  
  // Size classes
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-24 h-24",
    lg: "w-48 h-48",
  };
  
  // Font size for the score display
  const scoreFontSize = {
    sm: "text-lg",
    md: "text-3xl",
    lg: "text-5xl",
  };
  
  // Title font size
  const titleFontSize = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-xl",
  };
  
  // Icon size
  const iconSize = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-2xl",
  };
  
  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      <div 
        className="absolute inset-0 clip-path-hexagon p-1"
        style={{ 
          background: `linear-gradient(to bottom, ${tier.colors.primary}, ${tier.colors.secondary})` 
        }}
      >
        <div className="h-full w-full clip-path-hexagon bg-[#1E1E1E] flex flex-col items-center justify-center">
          <p className={`${size === "sm" ? "hidden" : "block"} font-medium text-gray-400`}>
            {size === "lg" ? "Seu Fan Score" : "Score"}
          </p>
          <h2 
            className={`${scoreFontSize[size]} font-bold`}
            style={{ color: tier.colors.primary }}
          >
            {score}
          </h2>
          {showTitle && (
            <div 
              className={`mt-1 px-2 py-0.5 rounded flex items-center ${titleFontSize[size]}`}
              style={{ 
                backgroundColor: `${tier.colors.background}`, 
                color: tier.colors.primary 
              }}
            >
              <i className={`fas fa-${tier.icon} ${size === "sm" ? "" : "mr-1"}`}></i>
              {size !== "sm" && tier.title}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
