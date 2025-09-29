// types/chart.ts
import { type ChartConfig } from "@/components/ui/chart";

export type ChartType = "bar" | "pie" | "area" | "line" | "donut";

export interface ChartData {
  [key: string]: string | number;
}

export interface ChartProps {
  title: string;
  description: string;
  data: ChartData[];
  config: ChartConfig;
  type: ChartType;
  dataKey?: string;
  xAxisKey?: string;
  yAxisKey?: string | string[];
  className?: string;
  height?: string;
  innerRadius?: number;
  outerRadius?: number;
}
