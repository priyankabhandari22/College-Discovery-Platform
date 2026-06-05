'use client';

import { useEffect, useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { RatingBreakdown } from '@/types/college';

export default function RatingRadar({ data }: { data: RatingBreakdown }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const chartData = [
    { subject: 'Faculty', A: data.faculty, fullMark: 5 },
    { subject: 'Campus', A: data.campus, fullMark: 5 },
    { subject: 'Placements', A: data.placements, fullMark: 5 },
    { subject: 'Infra', A: data.infrastructure, fullMark: 5 },
    { subject: 'Value', A: data.valueForMoney, fullMark: 5 },
  ];

  return (
    <div className="w-full h-80">
      {mounted && (
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
            <PolarGrid stroke="#E5E7EB" />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: '#4B5563', fontSize: 11, fontWeight: 700 }} 
            />
            <PolarRadiusAxis 
              angle={30} 
              domain={[0, 5]} 
              tick={false} 
              axisLine={false} 
            />
            <Radar
              name="Rating"
              dataKey="A"
              stroke="#3B82F6"
              fill="#3B82F6"
              fillOpacity={0.4}
              animationDuration={1500}
            />
          </RadarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
