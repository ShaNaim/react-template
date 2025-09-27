import { createFileRoute } from "@tanstack/react-router";
import { ProtectedRoute } from "@/components/modules/auth/ProtectedRoute";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Pie, PieChart, Cell, Area, AreaChart } from "recharts";
import { StatsCards } from "@/components/modules/dashboard/StatsCards";

export const Route = createFileRoute("/dashboard/")({
  component: RouteComponent,
});

// Sample data for charts
const salesData = [
  { month: "Jan", sales: 4000, revenue: 2400 },
  { month: "Feb", sales: 3000, revenue: 1398 },
  { month: "Mar", sales: 2000, revenue: 9800 },
  { month: "Apr", sales: 2780, revenue: 3908 },
  { month: "May", sales: 1890, revenue: 4800 },
  { month: "Jun", sales: 2390, revenue: 3800 },
];

const userEngagementData = [
  { day: "Mon", users: 200 },
  { day: "Tue", users: 300 },
  { day: "Wed", users: 250 },
  { day: "Thu", users: 400 },
  { day: "Fri", users: 350 },
  { day: "Sat", users: 180 },
  { day: "Sun", users: 220 },
];

const deviceData = [
  { name: "Desktop", value: 400, fill: "var(--color-desktop)" },
  { name: "Mobile", value: 300, fill: "var(--color-mobile)" },
  { name: "Tablet", value: 200, fill: "var(--color-tablet)" },
];

const conversionData = [
  { name: "Converted", value: 65, fill: "var(--color-converted)" },
  { name: "Not Converted", value: 35, fill: "var(--color-not-converted)" },
];

// Chart configurations
const salesConfig = {
  sales: {
    label: "Sales",
    color: "hsl(var(--chart-1))",
  },
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const userConfig = {
  users: {
    label: "Users",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

const deviceConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
  tablet: {
    label: "Tablet",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

const conversionConfig = {
  converted: {
    label: "Converted",
    color: "hsl(var(--chart-4))",
  },
  "not-converted": {
    label: "Not Converted",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

function RouteComponent() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen w-full p-6 pb-20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-2">Overview of your business metrics</p>
        </div>
        <StatsCards />
        {/* First Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 h-[45vh]">
          {/* Large Sales Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Sales & Revenue</CardTitle>
              <CardDescription>Monthly sales and revenue data</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={salesConfig} className="h-[250px] w-full">
                <BarChart data={salesData}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="sales" fill="var(--color-sales)" radius={4} />
                  <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Small Device Usage Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Device Usage</CardTitle>
              <CardDescription>Distribution by device type</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={deviceConfig} className="h-[250px] w-full">
                <PieChart>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Pie data={deviceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[45vh]">
          {/* Large User Engagement Line Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>User Engagement</CardTitle>
              <CardDescription>Daily active users over the week</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={userConfig} className="h-[250px] w-full">
                <AreaChart data={userEngagementData}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area type="monotone" dataKey="users" stroke="var(--color-users)" fill="var(--color-users)" fillOpacity={0.6} />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Small Conversion Rate Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Conversion Rate</CardTitle>
              <CardDescription>Success rate percentage</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={conversionConfig} className="h-[250px] w-full">
                <PieChart>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Pie data={conversionData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={80}>
                    {conversionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}
