import { TaskResponse } from "@/types/task";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare } from "lucide-react";
import { DatePickerRange } from "@/components/date-picker-range";
import StatusComponent from "../../_components/status";
import DropdownEditAndDelete from "../../_components/button-edit";
import { User } from "@/types/auth";
import PriorityComponent from "../../_components/priority";
export default function TaskContentComponent({ tasks, projectId, users }: { tasks: TaskResponse[], projectId: number, users: User[] }) {
    return (
       <ScrollArea className="flex-1 min-h-0 scroll-area-hide-scrollbar">
            {tasks?.map((task: TaskResponse) => (
              // the frist card dont use mt
            <Card key={task.id} className={`flex flex-col gap-2 w-full rounded-lg p-4 ${tasks.indexOf(task) === 0 ? 'mt-0' : 'mt-16'}`} >
                <CardHeader className="gap-2 p-2 rounded border-b">
                  {/* Add avatar and name of the task owner */}
                  <div className="flex items-center gap-2 justify-between">
                    <div className="flex items-center gap-2">
                    <Avatar>
                    <AvatarImage src={"https://github.com/shadcn.png"} />
                    <AvatarFallback>CN</AvatarFallback>
                    {/* Add name and date of the task owner */}
                  </Avatar>
                  <div>
                      <p className="text-m font-bold">{"Mr.Bean"}</p>
                      <p className="text-sm text-muted-foreground">{"10.12.2025"}</p>
                    </div></div>
                  {/* ... To update the name and date of the task owner */}
                  <div className="flex items-center gap-2 justify-end">
                    <DropdownEditAndDelete projectId={projectId} users={users} task={task} taskId={task.id} />
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
                        {users.find(user => user.userId === assignTo)?.userName}
                      </Badge>              
                      ))}
                  </div>
                  {/* Status of the task */}
                  <div className="flex items-center gap-2">
                    <Label className="text-sm font-medium w-20">Status</Label>
                    <StatusComponent isCreate={false} status={task.status} />
                  </div>
                  {/* Priority of the task */}
                  <div className="flex items-center gap-2">
                    <Label className="text-sm font-medium w-20">Priority</Label>
                    <PriorityComponent isCreate={false} priority={task.priorityStatus} />
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
    )
}