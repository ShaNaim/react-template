import React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Pie, PieChart, Cell, Area, AreaChart, Line, LineChart } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

import type { ChartData, ChartProps } from "./types";

export function Chart({ title, description, data, config, type, dataKey = "value", xAxisKey = "name", yAxisKey, className = "", height = "h-[250px]", innerRadius, outerRadius = 80 }: ChartProps): React.ReactElement {
  const renderChart = (): React.ReactElement => {
    switch (type) {
      case "bar":
        return (
          <BarChart data={data}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey={xAxisKey} tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            {Array.isArray(yAxisKey) ? yAxisKey.map((key: string) => <Bar key={key} dataKey={key} fill={`var(--color-${key})`} radius={4} />) : <Bar dataKey={yAxisKey || dataKey} fill={`var(--color-${yAxisKey || dataKey})`} radius={4} />}
          </BarChart>
        );

      case "area":
        return (
          <AreaChart data={data}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey={xAxisKey} tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area type="monotone" dataKey={(yAxisKey as string) || dataKey} stroke={`var(--color-${yAxisKey || dataKey})`} fill={`var(--color-${yAxisKey || dataKey})`} fillOpacity={0.6} />
          </AreaChart>
        );

      case "line":
        return (
          <LineChart data={data}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey={xAxisKey} tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            {Array.isArray(yAxisKey) ? (
              yAxisKey.map((key: string) => <Line key={key} type="monotone" dataKey={key} stroke={`var(--color-${key})`} strokeWidth={2} />)
            ) : (
              <Line type="monotone" dataKey={(yAxisKey as string) || dataKey} stroke={`var(--color-${yAxisKey || dataKey})`} strokeWidth={2} />
            )}
          </LineChart>
        );

      case "pie":
        return (
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent />} />
            <Pie data={data} dataKey={dataKey} nameKey={xAxisKey} cx="50%" cy="50%" outerRadius={outerRadius}>
              {data.map((entry: ChartData, index: number) => (
                <Cell key={`cell-${index}`} fill={(entry.fill as string) || `hsl(var(--chart-${(index % 5) + 1}))`} />
              ))}
            </Pie>
          </PieChart>
        );

      case "donut":
        return (
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent />} />
            <Pie data={data} dataKey={dataKey} nameKey={xAxisKey} cx="50%" cy="50%" innerRadius={innerRadius || 40} outerRadius={outerRadius}>
              {data.map((entry: ChartData, index: number) => (
                <Cell key={`cell-${index}`} fill={(entry.fill as string) || `hsl(var(--chart-${(index % 5) + 1}))`} />
              ))}
            </Pie>
          </PieChart>
        );

      default:
        return <div>Unsupported chart type: {type}</div>;
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className={`${height} w-full`}>
          {renderChart()}
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
