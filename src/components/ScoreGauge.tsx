import React from 'react';

interface ScoreGaugeProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  subtitle?: string;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({
  score,
  size = 180,
  strokeWidth = 14,
  label = 'Overall Score',
  subtitle
}) => {
  const normalizedScore = Math.max(0, Math.min(100, Math.round(score)));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (normalizedScore / 100) * circumference;

  // Professional color palette based on score
  let strokeColor = '#2563EB'; // Blue default
  let textColor = 'text-blue-600';
  let badgeText = 'Good';

  if (normalizedScore >= 85) {
    strokeColor = '#16A34A'; // Emerald
    textColor = 'text-emerald-600';
    badgeText = 'Excellent Profile';
  } else if (normalizedScore >= 70) {
    strokeColor = '#2563EB'; // Blue
    textColor = 'text-blue-600';
    badgeText = 'Competitive';
  } else if (normalizedScore >= 50) {
    strokeColor = '#D97706'; // Amber
    textColor = 'text-amber-600';
    badgeText = 'Needs Improvement';
  } else {
    strokeColor = '#DC2626'; // Red
    textColor = 'text-red-600';
    badgeText = 'Critical Review';
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#E2E8F0"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Animated progress ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="none"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className={`text-4xl font-bold tracking-tight ${textColor} tabular-nums`}>
            {normalizedScore}%
          </span>
          <span className="text-xs font-medium text-slate-500 mt-0.5">
            {badgeText}
          </span>
        </div>
      </div>

      {label && (
        <div className="mt-3 text-center">
          <p className="text-sm font-semibold text-slate-900">{label}</p>
          {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
        </div>
      )}
    </div>
  );
};
