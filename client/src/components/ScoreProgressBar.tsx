interface ScoreProgressBarProps {
  value: number;
  max: number;
  label: string;
  color: string;
  secondaryColor: string;
}

export default function ScoreProgressBar({ 
  value, 
  max, 
  label, 
  color, 
  secondaryColor 
}: ScoreProgressBarProps) {
  // Ensure value is between 0 and max
  const normalizedValue = Math.min(Math.max(0, value), max);
  const percentage = (normalizedValue / max) * 100;
  
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span>{label}</span>
        <span style={{ color }}>{value}/{max}</span>
      </div>
      <div className="relative h-7 bg-black bg-opacity-40 rounded overflow-hidden">
        <div 
          className="h-full rounded relative overflow-hidden"
          style={{ 
            width: `${percentage}%`,
            background: `linear-gradient(to right, ${color}, ${secondaryColor})` 
          }}
        >
          <div className="absolute inset-0" style={{
            background: `linear-gradient(90deg, 
              rgba(255, 255, 255, 0.1) 25%, 
              rgba(255, 255, 255, 0.3) 50%, 
              rgba(255, 255, 255, 0.1) 75%)`,
            backgroundSize: '200% 100%',
            animation: 'progressShine 2s infinite linear'
          }}></div>
        </div>
      </div>
    </div>
  );
}
