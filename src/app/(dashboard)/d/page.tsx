import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Box, Calendar, FileText, Users2 } from "lucide-react";
import { ChartBar } from "@/components/chart-bart";
const cards = [
  {
    id: 1,
    title: "Projects",
    description: "View all projects",
    icon: <Box />,
  },
  {
    id: 2,
    title: "Tasks",
    description: "View all tasks",
    icon: <Calendar />,
  },
  {
    id: 3,
    title: "Users",
    description: "View all users",
    icon: <Users2 />,
  },
  {
    id: 4,
    title: "Reports",
    description: "View all reports",
    icon: <FileText />,
  },
]

export default function DashboardPage() {
  return (
    <div className="px-10 pt-2">
      <div>
        <h1 className="text-xl font-bold">Dashboard </h1>
        <p className="text-sm text-muted-foreground">Good Morning, <span className="font-bold">John Doe</span></p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
        {cards.map((card) => (
          <Card key={card.id} className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 h-full"> 
            <CardHeader>
              <CardTitle>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">{card.title}</p>
                  <p className="text-sm text-muted-foreground">{card.icon}</p>
                </div>
              </CardTitle>
              <CardDescription className="text-4xl font-bold">10</CardDescription>
            </CardHeader>
            <CardFooter className="p-0">
              <div className="flex justify-between items-center gap-2">
                <div className="flex items-center gap-2">
                  <p className="text-sm text-muted-foreground">Members</p>
                  <p className="text-sm text-muted-foreground">10</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-muted-foreground">10.12.2025</p>
                </div>
              </div>
            </CardFooter> 
          </Card>
        ))}
      </div>
      {/* Create Chart Analyse Project and Task */}
      <div className="w-full h-full rounded-lg mt-10">
        <h2 className="text-xl font-bold mb-10">Project And Task Analysis</h2>
        <ChartBar />
      </div>

    </div>
  );
}