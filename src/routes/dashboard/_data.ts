import { type ChartConfig } from "@/components/ui/chart";

export const salesData = [
  { month: "Jan", sales: 4000, revenue: 2400 },
  { month: "Feb", sales: 3000, revenue: 1398 },
  { month: "Mar", sales: 2000, revenue: 9800 },
  { month: "Apr", sales: 2780, revenue: 3908 },
  { month: "May", sales: 1890, revenue: 4800 },
  { month: "Jun", sales: 2390, revenue: 3800 },
];

export const userEngagementData = [
  { day: "Mon", users: 200 },
  { day: "Tue", users: 300 },
  { day: "Wed", users: 250 },
  { day: "Thu", users: 400 },
  { day: "Fri", users: 350 },
  { day: "Sat", users: 180 },
  { day: "Sun", users: 220 },
];

export const deviceData = [
  { name: "Desktop", value: 400, fill: "var(--chart-2)" },
  { name: "Mobile", value: 300, fill: "var(--chart-3)" },
  { name: "Tablet", value: 200, fill: "var(--chart-4)" },
];

export const conversionData = [
  { name: "Converted", value: 65, fill: "var(--color-converted)" },
  { name: "Not Converted", value: 35, fill: "var(--color-not-converted)" },
];

export const salesConfig = {
  sales: {
    label: "Sales",
    color: "var(--chart-1)",
  },
  revenue: {
    label: "Revenue",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export const userConfig = {
  users: {
    label: "Users",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export const deviceConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
  tablet: {
    label: "Tablet",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export const conversionConfig = {
  converted: {
    label: "Converted",
    color: "(var(--chart-4))",
  },
  "not-converted": {
    label: "Not Converted",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

export const multipleLineData = [
  { month: "Jan", revenue: 4000, expenses: 2400, profit: 1600 },
  { month: "Feb", revenue: 3000, expenses: 1398, profit: 1602 },
  { month: "Mar", revenue: 2000, expenses: 1800, profit: 200 },
  { month: "Apr", revenue: 2780, expenses: 1908, profit: 872 },
  { month: "May", revenue: 1890, expenses: 1200, profit: 690 },
  { month: "Jun", revenue: 2390, expenses: 1500, profit: 890 },
  { month: "Jul", revenue: 3490, expenses: 2100, profit: 1390 },
  { month: "Aug", revenue: 4200, expenses: 2800, profit: 1400 },
  { month: "Sep", revenue: 3800, expenses: 2200, profit: 1600 },
  { month: "Oct", revenue: 4100, expenses: 2400, profit: 1700 },
  { month: "Nov", revenue: 4500, expenses: 2600, profit: 1900 },
  { month: "Dec", revenue: 5000, expenses: 3000, profit: 2000 },
];

export const multipleLineConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--chart-1)", // Blue
  },
  expenses: {
    label: "Expenses",
    color: "var(--chart-2)", // Red
  },
  profit: {
    label: "Profit",
    color: "var(--chart-3)", // Green
  },
} satisfies ChartConfig;
