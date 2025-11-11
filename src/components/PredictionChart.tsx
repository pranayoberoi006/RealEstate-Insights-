'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { PricePredictionOutput } from '@/lib/types';

interface PredictionChartProps {
  prediction: PricePredictionOutput;
}

export function PredictionChart({ prediction }: PredictionChartProps) {
  const chartData = [
    {
      name: 'Current',
      value: prediction.predictedPrice,
    },
  ];

  if (prediction.futurePredictedPrice) {
    chartData.push({
      name: '5-Year',
      value: prediction.futurePredictedPrice,
    });
  }

  // ✅ Format for axis with proper Rupee sign
  const formatCurrencyForAxis = (value: number) => {
    const rupee = '₹'; // Explicit character, not font fallback
    if (value >= 10000000) {
      return `${rupee}${(value / 10000000).toFixed(2)} Cr`;
    }
    if (value >= 100000) {
      return `${rupee}${(value / 100000).toFixed(1)} L`;
    }
    if (value >= 1000) {
      return `${rupee}${(value / 1000).toFixed(0)} K`;
    }
    return `${rupee}${value}`;
  };

  // ✅ Tooltip formatted with INR
  const formatCurrencyForTooltip = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      currencyDisplay: 'symbol',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="w-full h-[250px]" style={{ fontFamily: "'Noto Sans', Arial, sans-serif" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 20, left: -10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={formatCurrencyForAxis}
          />
          <Tooltip
            cursor={{ fill: 'hsl(var(--accent))', opacity: 0.3 }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm" style={{ fontFamily: "'Noto Sans', Arial, sans-serif" }}>
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex flex-col">
                        <span className="text-xs uppercase text-muted-foreground">
                          {payload[0].payload.name}
                        </span>
                        <span className="font-bold text-foreground">
                          {formatCurrencyForTooltip(payload[0].value as number)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar
            dataKey="value"
            fill="hsl(var(--primary))"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
