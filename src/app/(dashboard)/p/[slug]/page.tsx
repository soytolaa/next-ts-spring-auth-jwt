import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const tasks = [
  {
    id: 1,
    title: "Task 1",
    description: "Task 1 Description",
  },
  {
    id: 2,
    title: "Task 2",
    description: "Task 2 Description",
  },
  {
    id: 3,
    title: "Task 3",
    description: "Task 3 Description",
  },
  {
    id: 4,
    title: "Task 4",
    description: "Task 4 Description",
  },
  {
    id: 5,
    title: "Task 5",
    description: "Task 5 Description",
  },
  {
    id: 6,
    title: "Task 6",
    description: "Task 6 Description",
  },
  {
    id: 7,
    title: "Task 7",
    description: "Task 7 Description",
  },
  {
    id: 8,
    title: "Task 8",
    description: "Task 8 Description",
  },
  {
    id: 9,
    title: "Task 9",
    description: "Task 9 Description",
  },
  {
    id: 10,
    title: "Task 10",
    description: "Task 10 Description",
  },  
  {
    id: 11,
    title: "Task 11",
    description: "Task 11 Description",
  },
  {
    id: 12,
    title: "Task 12",
    description: "Task 12 Description",
  },
  {
    id: 13,
    title: "Task 13",
    description: "Task 13 Description",
  },
  {
    id: 14,
    title: "Task 14",
    description: "Task 14 Description",
  },
  {
    id: 15,
    title: "Task 15",
    description: "Task 15 Description",
  },
]
const members = [
  {
    id: 1,
    name: "Member 1",
    email: "member1@example.com",
  },
  {
    id: 2,
    name: "Member 2",
    email: "member2@example.com",
  },
  {
    id: 3,
    name: "Member 3",
    email: "member3@example.com",
  },
  {
    id: 4,
    name: "Member 4",
    email: "member4@example.com",
  },
  {
    id: 5,
    name: "Member 5",
    email: "member5@example.com",
  },
]
export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    console.log(slug);
  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] overflow-hidden">
      <div className="flex justify-between items-center mb-4 shrink-0">
        <h1 className="text-xl font-bold">Project Detail {slug}</h1>
        <Button>Create Task</Button>
      </div>
      {/* Main Content Container */}
      <div className="flex gap-4 w-full flex-1 min-h-0 overflow-hidden">
        {/* Task Block - 70% */}
        <div className="w-[70%] h-full flex flex-col   border-gray-200 bg-white shadow-sm overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 min-h-0 scrollbar-hide">
            {tasks.map((task) => (
            <div key={task.id} className="flex flex-col gap-2 w-full border border-gray-200 rounded-lg p-2">     
                <div className="flex items-center gap-2 p-2 rounded hover:bg-gray-50">
                  <p>{task.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contributors Block - 30% */}
        <div className="w-[30%] h-full flex flex-col rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-200 shrink-0">
            <h2 className="text-xl font-bold">Contributors</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-4 min-h-0 scrollbar-hide">
            <div className="flex flex-col gap-2">
              {members.map((member) => (
                <div key={member.id} className="flex items-center gap-2 p-2 rounded hover:bg-gray-50">
                  <Avatar>
                    <AvatarImage src={member.email} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <p>{member.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
