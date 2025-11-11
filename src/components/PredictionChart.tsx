'use client';

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { PricePredictionOutput } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

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

    const formatCurrencyForAxis = (value: number) => {
       const formatter = new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
            minimumFractionDigits: 0,
        });

        if (value >= 10000000) { // Crores
            return `₹${(value / 10000000).toFixed(2)}Cr`;
        }
        if (value >= 100000) { // Lakhs
            return `₹${(value / 100000).toFixed(1)}L`;
        }
        if (value >= 1000) {
            return `₹${(value / 1000).toFixed(0)}K`;
        }
        return formatter.format(value);
    }
    
    const formatCurrencyForTooltip = (value: number) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(value);
    }

    return (
        <div className="w-full h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
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
                                    <div className="rounded-lg border bg-background p-2 shadow-sm">
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
                    <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
