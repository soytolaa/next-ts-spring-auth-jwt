import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Heart, MessageSquare } from "lucide-react";
import { DatePickerRange } from "@/components/date-picker-range";
import { Badge } from "@/components/ui/badge";
import { ButtonTask } from "./(_components)/button-task";
import { getTasksByProjectIdAction } from "@/action/taskAction";
import { TaskResponse } from "@/types/task";
import { Priority, Status } from "@/types/enums/Status";
import { getUserInProjectAction } from "@/action/projectAction";


export default async function ProjectDetailPage({ params, searchParams }: { params: { slug: string }, searchParams: { proNm: string } }) {
    const { slug } = await params;
    const { proNm } = await searchParams;
    const tasks = await getTasksByProjectIdAction(Number(slug));  
    const users = await getUserInProjectAction(Number(slug));
    console.log(users);
  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] overflow-hidden px-10 pt-2">
      <div className="flex justify-between items-center mb-4 shrink-0">
        <h1 className="text-xl font-bold">{proNm}</h1>
        <ButtonTask projectId={Number(slug)}  users={users.payload}/>
      </div>
      {/* Main Content Container */}
      <div className="flex gap-4 w-full flex-1 min-h-0 overflow-hidden">
        {/* Task Block - 70% */}
        <div className="w-[70%] h-full flex flex-col  shadow-sm overflow-hidden">
          <ScrollArea className="flex-1 min-h-0 scroll-area-hide-scrollbar">
            {tasks.payload.map((task: TaskResponse) => (
              // the frist card dont use mt
            <Card key={task.id} className={`flex flex-col gap-2 w-full rounded-lg p-4 ${tasks.payload.indexOf(task) === 0 ? 'mt-0' : 'mt-16'}`} >
                <CardHeader className="gap-2 p-2 rounded border-b">
                  {/* Add avatar and name of the task owner */}
                  <div className="flex items-center gap-2">
                    <Avatar>
                    <AvatarImage src={"https://github.com/shadcn.png"} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  {/* Add name and date of the task owner */}
                  <div>
                    <p className="text-m font-bold">{"Mr.Bean"}</p>
                    <p className="text-sm text-muted-foreground">{"10.12.2025"}</p>
                  </div>
                  </div>
                  {/* Add task title and description */}
                  <CardTitle>{task.name}</CardTitle>
                  <CardDescription>{task.description}</CardDescription>
                </CardHeader>
                {/*  */}
                <CardContent className="border-b flex flex-col gap-5 pt-2">
                  {/* assign to */}
                  <div className="flex items-center gap-2">
                    <Label className="text-sm font-medium w-20">Assign to</Label>
                    {task.assignees.map((assignTo,index) => (
                    <Badge key={index} variant="outline" className="bg-transparent font-normal border rounded-lg text-sm px-2 py-1 w-32 text-center justify-center items-center">
                        {assignTo.userName}
                      </Badge>              
                      ))}
                  </div>
                  {/* Status of the task */}
                  <div className="flex items-center gap-2">
                    <Label className="text-sm font-medium w-20">Status</Label>
                    <DropdownMenu >
                    <DropdownMenuTrigger className="bg-transparent border rounded-lg px-2 py-1 text-sm w-32">
                        {task.status === Status.PENDING ? "PENDING" : task.status === Status.PROGRESS ? "PROGRESS" : task.status === Status.COMPLETED ? "COMPLETED" : task.status === Status.CANCELLED ? "CANCELLED" : task.status === Status.ON_HOLD ? "ON HOLD" : "FEEDBACK"}    
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-40">
                        {Object.values(Status).map((status) => (
                          <DropdownMenuItem key={status}>
                            {status}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  {/* Priority of the task */}
                  <div className="flex items-center gap-2">
                    <Label className="text-sm font-medium w-20">Priority</Label>
                    <DropdownMenu >
                    <DropdownMenuTrigger className="bg-transparent border rounded-lg px-2 py-1 text-sm w-32">
                        { task.priorityStatus === Priority.LOW && "LOW" || task.priorityStatus === Priority.MEDIUM && "MEDIUM" || task.priorityStatus === Priority.HIGH && "HIGH" || task.priorityStatus === Priority.URGENT && "URGENT" || "LOW"}
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-40">
                        {Object.values(Priority).map((priority) => (
                          <DropdownMenuItem key={priority.valueOf()}>
                            {priority}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  {/* Date of the task */}
                  <div className="flex items-center gap-2">
                    <Label className="text-sm font-medium w-20">Due Date</Label>
                    <DatePickerRange assignAt={task.assignedAt} dueAt={task.dueAt}/> 
                  </div>
                
                </CardContent>
                <CardFooter className="mt-auto">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 border rounded-md">
                      <p className="text-sm text-muted-foreground">Likes</p>
                      <Button variant="outline" className="p-0" size="icon">
                          <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 border rounded-md">   
                      <p className="text-sm text-muted-foreground">Comments</p>
                      <Button variant="outline" className="p-0" size="icon">
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </ScrollArea>
        </div>

        {/* Contributors Block - 30% */}
        <div className="w-[30%] h-full max-w-[30%] min-w-[30%] flex flex-col rounded-lg border shadow-sm overflow-hidden">
          <div className="p-4 border-b shrink-0">
            <h2 className="text-l ">Contributors</h2>
          </div>
          <ScrollArea className="flex-1 min-h-0 p-4 scroll-area-hide-scrollbar">
            <div className="flex flex-col gap-2">
              {users.payload.map((user) => (
                <Card key={user.userId} className="flex flex-col gap-2 w-full rounded-lg p-2">
                  <CardHeader className="pl-2 rounded flex flex-col justify-between">
                    <div className="flex items-center justify-between gap-2">
                      <Avatar>
                        <AvatarImage src={"https://github.com/shadcn.png"} />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div className="w-32">
                        <CardTitle className="text-sm font-normal">{user.userName}</CardTitle>
                        <CardDescription className="text-xs text-muted-foreground truncate">{user.email}</CardDescription>
                      </div>
                      <div className="flex items-center gap-2 px-2 py-1" >
                      <Badge variant="outline" className="text-xs font-normal">
                        {user.type}
                      </Badge>
                    </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}
