import { AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogHeader, AlertDialogTrigger, AlertDialogFooter, AlertDialogDescription } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Pencil, X } from "lucide-react";
import { useRef, useState } from "react";
import * as React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { FormEvent } from "react";
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";    
import { ScrollArea } from "@/components/ui/scroll-area";
import { DatePickerRange } from "@/components/date-picker-range";
import { User } from "@/types/auth";
import { createTaskAction } from "@/action/taskAction";
import { Priority, Status } from "@/types/enums/Status";
import { LocalDateTime } from "@js-joda/core";
import { TaskRequest } from "@/types/task";

export function TaskPop({ isOpen, setIsOpen, projectId, users }: { isOpen: boolean, setIsOpen: (open: boolean) => void, projectId: number, users: User[] }) {
    const formRef = useRef<HTMLFormElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<Status>(Status.PENDING);
    const [selectedPriority, setSelectedPriority] = useState<Priority>(Priority.LOW);
    const [selectedAssignTo, setSelectedAssignTo] = useState<number | null>(users.length > 0 ? users[0].userId : null);
    const [dateRange, setDateRange] = useState<{ from?: Date, to?: Date }>({});

    // Reset form when dialog closes
    React.useEffect(() => {
        if (!isOpen) {
            setSelectedStatus(Status.PENDING);
            setSelectedPriority(Priority.LOW);
            setSelectedAssignTo(users.length > 0 ? users[0].userId : null);
            setDateRange({});
            if (formRef.current) {
                formRef.current.reset();
            }
        }
    }, [isOpen, users]);

    const handleCreateTask = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const formData = new FormData(e.currentTarget);
            
            // Convert Date objects to ISO strings for API
            const assignedAtISO = dateRange.from ? dateRange.from.toISOString() : undefined;
            const dueAtISO = dateRange.to ? dateRange.to.toISOString() : undefined;
            
            // Prepare request payload matching API format
            const taskRequestPayload = {
                name: formData.get("name") as string,
                description: formData.get("description") as string,
                status: selectedStatus,
                priorityStatus: selectedPriority,
                projectId: projectId,
                assignees: selectedAssignTo ? [selectedAssignTo] : [], // Array of user IDs (numbers)
                assignedAt: assignedAtISO, // ISO string
                dueAt: dueAtISO, // ISO string
            }
            
            // Transform to TaskRequest format (with LocalDateTime) for the action
            // Parse ISO string to LocalDateTime (remove milliseconds and timezone)
            const parseToLocalDateTime = (isoString: string | undefined): LocalDateTime | undefined => {
                if (!isoString) return undefined;
                // ISO format: "2026-02-02T09:58:05.660Z" -> "2026-02-02T09:58:05"
                const dateTimeString = isoString.split('.')[0].replace('Z', '');
                return LocalDateTime.parse(dateTimeString);
            };
            
            const taskRequest: TaskRequest = {
                name: taskRequestPayload.name,
                description: taskRequestPayload.description,
                status: taskRequestPayload.status,
                priorityStatus: taskRequestPayload.priorityStatus,
                projectId: taskRequestPayload.projectId,
                assignees: selectedAssignTo ? [users.find((user) => user.userId === selectedAssignTo)!] : [],
                assignedAt: parseToLocalDateTime(assignedAtISO),
                dueAt: parseToLocalDateTime(dueAtISO),
            }
            
            console.log("API Payload:", taskRequestPayload);
            const task = await createTaskAction(taskRequest);
            console.log("Task created:", task);
            
            // Close dialog on success
            setIsOpen(false);
          
        } catch (error) {
            console.error("Error creating task:", error);
        } finally {
            setIsLoading(false);
        }
    }
  return (
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="max-w-md">
        <form ref={formRef} onSubmit={handleCreateTask}>
          <AlertDialogHeader>
            <AlertDialogTitle>New Task</AlertDialogTitle>
            <AlertDialogDescription>
              Create a new task to organize your tasks and collaborate with your team.
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="space-y-4 mt-4">
            {/* Task Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Task Name</Label>
              <Input 
                id="name" 
                name="name" 
                type="text" 
                placeholder="Task Name" 
                required
                disabled={isLoading}
                className="border-gray-300"
              />
            </div>
            {/* Task Assign to */}
            <div className="flex items-center gap-2">
                <Label className="text-sm font-medium w-20">Assign to</Label>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Badge variant="outline" className="bg-transparent font-normal border rounded-lg text-sm px-2 py-1 w-32 text-center justify-center items-center cursor-pointer">
                            {users.find((user) => user.userId === selectedAssignTo)?.userName || "Select user"}
                        </Badge>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {users.map((user) => (
                            <DropdownMenuItem 
                                key={user.userId}
                                onClick={() => setSelectedAssignTo(user.userId)}
                            >
                                {user.userName}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                <input type="hidden" name="assignTo" value={selectedAssignTo || ""} />
            </div>
            {/* Task Status */}
            <div className="flex items-center gap-2">
                <Label className="text-sm font-medium w-20">Status</Label>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Badge variant="outline" className="bg-transparent font-normal border rounded-lg text-sm px-2 py-1 w-32 text-center justify-center items-center cursor-pointer">
                            {selectedStatus}
                        </Badge>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {Object.values(Status).map((status) => (
                            <DropdownMenuItem 
                                key={status}
                                onClick={() => setSelectedStatus(status)}
                            >
                                {status}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                <input type="hidden" name="status" value={selectedStatus} />
            </div>
            {/* Task Priority */}
            <div className="flex items-center gap-2">
                <Label className="text-sm font-medium w-20">Priority</Label>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Badge variant="outline" className="bg-transparent font-normal border rounded-lg text-sm px-2 py-1 w-32 text-center justify-center items-center cursor-pointer">
                            {selectedPriority}
                        </Badge>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {Object.values(Priority).map((priority) => (
                            <DropdownMenuItem 
                                key={priority}
                                onClick={() => setSelectedPriority(priority)}
                            >
                                {priority}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                <input type="hidden" name="priority" value={selectedPriority} />
            </div>
            {/* Task Due Date */}
            <div className="flex items-center gap-2">
                <Label className="text-sm font-medium w-20">Due Date</Label>
                <DatePickerRange 
                    assignAt={dateRange.from?.toISOString()} 
                    dueAt={dateRange.to?.toISOString()}
                    onDateChange={setDateRange}
                />
                <input type="hidden" name="assignAt" value={dateRange.from?.toISOString() || ""} />
                <input type="hidden" name="dueAt" value={dateRange.to?.toISOString() || ""} />
            </div>
            {/* Task Description */}
              <div className="space-y-2">
              <Label htmlFor="description">Task Description</Label>
              <Textarea
                id="description" 
                name="description" 
                placeholder="Task Description" 
                rows={4}
                disabled={isLoading}
                className="border-gray-300 h-[200px] max-h-[250px]"
              />
            </div>  
          </div>
          
          <AlertDialogFooter className="mt-6">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create"
              )}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}