"use client"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

const chartData = [
  { month: "January", project: 186, task: 80 },
  { month: "February", project: 305, task: 200 },
  { month: "March", project: 237, task: 120 },
  { month: "April", project: 73, task: 190 },
  { month: "May", project: 209, task: 130 },
  { month: "June", project: 214, task: 140 },
  { month: "July", project: 214, task: 140 },
  { month: "August", project: 214, task: 140 },
  { month: "September", project: 214, task: 140 },
  { month: "October", project: 214, task: 140 },
  { month: "November", project: 214, task: 140 },
  { month: "December", project: 214, task: 140 },
]

const chartConfig = {
  project: {
    label: "Project",
    color: "#10b981", // dark green
  },
  task: {
    label: "Task",
    color: "#", // dark
  },
} satisfies ChartConfig

export function ChartBar() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[500px] w-full" style={{ backgroundColor: "white" }}>
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis
          tickLine={false}
          axisLine={{ strokeWidth: 3 }}
          tickMargin={10}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="project" fill="var(--color-project)" radius={4} />
        <Bar dataKey="task" fill="var(--color-task)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
