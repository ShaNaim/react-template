import { createFileRoute } from "@tanstack/react-router";
import { ProtectedRoute } from "@/components/modules/auth/ProtectedRoute";
import { Chart } from "@/components/templates/charts";

import { StatsCards } from "@/components/modules/dashboard/StatsCards";
import { salesConfig, salesData, deviceConfig, deviceData, userConfig, userEngagementData, multipleLineData, multipleLineConfig } from "./_data";

export const Route = createFileRoute("/dashboard/")({
  component: RouteComponent,
});

// Sample data for charts

function RouteComponent() {
  return (
    <ProtectedRoute>
      <div className="w-full p-6 pb-20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-2">Overview of your business metrics</p>
        </div>
        <StatsCards />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 h-[45vh]">
          <div className="lg:col-span-2">
            <Chart config={salesConfig} type="bar" data={salesData} xAxisKey="month" yAxisKey={["sales", "revenue"]} title="Monthly Sells Chart" description="Something" />
          </div>
          <Chart config={deviceConfig} type="pie" data={deviceData} xAxisKey="name" yAxisKey="value" title="Monthly Sells Chart" description="Something" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[45vh]">
          <Chart config={userConfig} type="area" data={userEngagementData} dataKey="users" xAxisKey="day" yAxisKey="users" title="Monthly Area Chart" description="Area" />
          <div className="lg:col-span-2">
            <Chart
              title="Financial Performance"
              description="Monthly revenue, expenses, and profit trends"
              data={multipleLineData}
              config={multipleLineConfig}
              type="line"
              xAxisKey="month"
              yAxisKey={["revenue", "expenses", "profit"]}
              className="lg:col-span-2"
              height="h-[350px]"
            />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
