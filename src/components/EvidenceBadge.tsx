import React from 'react';

interface EvidenceBadgeProps {
  score: number;
}

function getColor(score: number) {
  if (score >= 85) return 'bg-[#22C55E]';
  if (score >= 70) return 'bg-[#FACC15]';
  return 'bg-[#F87171]';
}

function getLabel(score: number) {
  if (score >= 85) return 'Alta';
  if (score >= 70) return 'Moderada';
  return 'Limitada';
}

const EvidenceBadge: React.FC<EvidenceBadgeProps> = ({ score }) => (
  <span className={`inline-block px-3 py-1 rounded-full text-white font-bold text-sm ${getColor(score)}`}>
    IEC: {score} <span className="ml-2 font-normal">({getLabel(score)})</span>
  </span>
);

export default EvidenceBadge; 