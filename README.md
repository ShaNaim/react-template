# Chart Component Documentation

## Overview

A generic, reusable Chart component that supports multiple chart types using Recharts library. The component automatically handles styling through CSS custom properties and provides a consistent API across all chart types.

## Available Chart Types

The component supports 5 different chart types:

1. **`bar`** - Bar charts (single or multiple bars)
2. **`area`** - Area charts with filled regions
3. **`line`** - Line charts
4. **`pie`** - Pie charts (full circles)
5. **`donut`** - Donut charts (pie charts with inner radius)

## Component Props

### Universal Props (Required for all types)

- `title: string` - Chart title displayed in header
- `description: string` - Chart description displayed below title
- `data: ChartData[]` - Array of data objects
- `config: ChartConfig` - Chart configuration for styling and labels
- `type: ChartType` - Type of chart to render

### Optional Props

- `className?: string` - Additional CSS classes (default: `""`)
- `height?: string` - Chart height class (default: `"h-[250px]"`)

### Chart-Specific Props

#### For Bar, Area, Line Charts

- `xAxisKey?: string` - Key for X-axis data (default: `"name"`)
- `yAxisKey?: string | string[]` - Key(s) for Y-axis data
  - `string` for single line/area
  - `string[]` for multiple bars

#### For Pie and Donut Charts

- `dataKey?: string` - Key for values (default: `"value"`)
- `xAxisKey?: string` - Key for labels (default: `"name"`)
- `outerRadius?: number` - Outer radius in pixels (default: `80`)
- `innerRadius?: number` - Inner radius for donut charts (default: `40`)

## Required Props by Chart Type

### Bar Chart

```typescript
// Required
title, description, data, config, type: "bar"

// Chart-specific required
xAxisKey: string          // e.g., "month", "category"
yAxisKey: string | string[] // e.g., "sales" or ["sales", "revenue"]
```

### Area Chart

```typescript
// Required
title, description, data, config, type: "area"

// Chart-specific required
xAxisKey: string    // e.g., "day", "month"
yAxisKey: string    // e.g., "users", "visits"
```

### Line Chart

```typescript
// Required
title, description, data, config, type: "line"

// Chart-specific required
xAxisKey: string    // e.g., "day", "month"
yAxisKey: string    // e.g., "temperature", "price"
```

### Pie Chart

```typescript
// Required
title, description, data, config, type: "pie"

// Chart-specific (uses defaults if not provided)
dataKey?: string    // default: "value"
xAxisKey?: string   // default: "name"
```

### Donut Chart

```typescript
// Required
title, description, data, config, type: "donut"

// Chart-specific (uses defaults if not provided)
dataKey?: string     // default: "value"
xAxisKey?: string    // default: "name"
innerRadius?: number // default: 40
```

## Data Structure Requirements

### Bar, Area, Line Charts

```typescript
// Data should have xAxisKey and yAxisKey properties
const data = [
  { month: "Jan", sales: 4000, revenue: 2400 },
  { month: "Feb", sales: 3000, revenue: 1398 },
  // ...
];
```

### Pie and Donut Charts

```typescript
// Data should have name/label and value properties
const data = [
  { name: "Desktop", value: 400 },
  { name: "Mobile", value: 300 },
  { name: "Tablet", value: 200 },
];

// Or with custom fill colors
const data = [
  { name: "Desktop", value: 400, fill: "var(--chart-1)" },
  { name: "Mobile", value: 300, fill: "var(--chart-2)" },
];
```

## Config Structure

The config object defines styling and labels for chart elements:

```typescript
const config = {
  [dataKey]: {
    label: string, // Display label
    color: string, // CSS color value
  },
  // ... more keys
} satisfies ChartConfig;
```

### Example Configs

```typescript
// Single data key (area, line, single bar)
const userConfig = {
  users: {
    label: "Active Users",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

// Multiple data keys (multiple bars)
const salesConfig = {
  sales: {
    label: "Sales",
    color: "var(--chart-1)",
  },
  revenue: {
    label: "Revenue",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

// Pie/Donut config (matches data name keys)
const deviceConfig = {
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
```

## Complete Examples

### 1. Bar Chart (Single Bar)

```typescript
const singleBarData = [
  { month: "Jan", sales: 4000 },
  { month: "Feb", sales: 3000 },
  { month: "Mar", sales: 5000 },
];

const singleBarConfig = {
  sales: {
    label: "Sales",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

<Chart
  title="Monthly Sales"
  description="Sales data for the year"
  data={singleBarData}
  config={singleBarConfig}
  type="bar"
  xAxisKey="month"
  yAxisKey="sales"
/>
```

### 2. Bar Chart (Multiple Bars)

```typescript
const multiBarData = [
  { month: "Jan", sales: 4000, revenue: 2400 },
  { month: "Feb", sales: 3000, revenue: 1398 },
  { month: "Mar", sales: 5000, revenue: 3200 },
];

const multiBarConfig = {
  sales: {
    label: "Sales",
    color: "var(--chart-1)",
  },
  revenue: {
    label: "Revenue",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

<Chart
  title="Sales & Revenue"
  description="Monthly comparison"
  data={multiBarData}
  config={multiBarConfig}
  type="bar"
  xAxisKey="month"
  yAxisKey={["sales", "revenue"]}
  className="lg:col-span-2"
/>
```

### 3. Area Chart

```typescript
const areaData = [
  { day: "Mon", users: 200 },
  { day: "Tue", users: 300 },
  { day: "Wed", users: 250 },
  { day: "Thu", users: 400 },
];

const areaConfig = {
  users: {
    label: "Active Users",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

<Chart
  title="User Engagement"
  description="Daily active users"
  data={areaData}
  config={areaConfig}
  type="area"
  xAxisKey="day"
  yAxisKey="users"
/>
```

### 4. Line Chart

```typescript
const lineData = [
  { time: "00:00", temperature: 20 },
  { time: "06:00", temperature: 18 },
  { time: "12:00", temperature: 25 },
  { time: "18:00", temperature: 22 },
];

const lineConfig = {
  temperature: {
    label: "Temperature (°C)",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

<Chart
  title="Temperature Trend"
  description="Hourly temperature readings"
  data={lineData}
  config={lineConfig}
  type="line"
  xAxisKey="time"
  yAxisKey="temperature"
/>
```

### 5. Pie Chart

```typescript
const pieData = [
  { name: "Desktop", value: 400 },
  { name: "Mobile", value: 300 },
  { name: "Tablet", value: 200 },
];

const pieConfig = {
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

<Chart
  title="Device Usage"
  description="Distribution by device type"
  data={pieData}
  config={pieConfig}
  type="pie"
  dataKey="value"
  xAxisKey="name"
  outerRadius={100}
/>
```

### 6. Donut Chart

```typescript
const donutData = [
  { name: "Converted", value: 65 },
  { name: "Not Converted", value: 35 },
];

const donutConfig = {
  converted: {
    label: "Converted",
    color: "var(--chart-4)",
  },
  "not-converted": {
    label: "Not Converted",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

<Chart
  title="Conversion Rate"
  description="Success rate percentage"
  data={donutData}
  config={donutConfig}
  type="donut"
  dataKey="value"
  xAxisKey="name"
  innerRadius={50}
  outerRadius={90}
/>
```

## CSS Variables

The component uses CSS custom properties for colors. Make sure these are defined in your CSS:

```css
:root {
  --chart-1: oklch(53.95% 0.11 259.86);
  --chart-2: oklch(70.44% 0.097 191.74);
  --chart-3: oklch(85.67% 0.117 139.75);
  --chart-4: oklch(97.14% 0.126 112.85);
  --chart-5: oklch(32.806% 0.05699 222.831);
}
```

## Common Patterns

### Responsive Layout

```typescript
// Large chart spanning 2 columns
<Chart
  className="lg:col-span-2"
  // ... other props
/>

// Small chart in single column
<Chart
  className=""
  // ... other props
/>
```

### Custom Height

```typescript
<Chart
  height="h-[400px]"  // Taller chart
  // ... other props
/>
```

### Grid Layout Example

```typescript
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  <Chart className="lg:col-span-2" {/* Large chart */} />
  <Chart {/* Small chart */} />
</div>
```

## Troubleshooting

### Colors Not Showing

1. Ensure CSS variables are defined in your stylesheet
2. Check that config keys match your data keys
3. Verify color format: use `var(--chart-1)` not `oklch(var(--chart-1))`

### Data Not Rendering

1. Verify prop names match your data structure
2. For bar/area/line: check `xAxisKey` and `yAxisKey`
3. For pie/donut: check `dataKey` and `xAxisKey`

### TypeScript Errors

1. Import types: `import type { ChartData, ChartProps } from "./types"`
2. Ensure data structure matches `ChartData[]` interface
3. Use proper `satisfies ChartConfig` for config objects
