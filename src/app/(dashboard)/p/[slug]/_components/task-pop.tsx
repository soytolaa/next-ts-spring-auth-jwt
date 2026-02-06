import { AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogHeader, AlertDialogFooter, AlertDialogDescription } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useRef, useState, useEffect } from "react";
import * as React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { FormEvent } from "react";
import { Textarea } from "@/components/ui/textarea";    
import { DatePickerRange } from "@/components/date-picker-range";
import { User } from "@/types/auth";
import { updateTaskAction } from "@/action/taskAction";
import { Priority, Status } from "@/types/enums/Status";
import { LocalDate } from "@js-joda/core";   
import { TaskRequest, TaskResponse } from "@/types/task";
import StatusComponent from "../../_components/status";
import PriorityComponent from "../../_components/priority";
import UserComponent from "../../_components/user";
import { toast } from "react-hot-toast";
export function TaskPop({ isOpen, setIsOpen, projectId, users, isCreate, task, handleCreateTask }: { isOpen: boolean, setIsOpen: (open: boolean) => void, projectId: number, users: User[], isCreate: boolean, task?: TaskResponse, handleCreateTask?: (taskRequest: { name: string; description: string; status: Status; priorityStatus: Priority; assignees: number[]; assignedAt?: string; dueAt?: string }) => void }) {
    const formRef = useRef<HTMLFormElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<Status>(task?.status || Status.PENDING);
    const [selectedPriority, setSelectedPriority] = useState<Priority>(task?.priorityStatus || Priority.LOW);
    const [selectedAssignTo, setSelectedAssignTo] = useState<number[]>(task?.assignees || []);
    const [name, setName] = useState<string>(task?.name || "");
    const [description, setDescription] = useState<string>(task?.description || "");
    const [dateRange, setDateRange] = React.useState<{
      from?: LocalDate
      to?: LocalDate
    }>({
      from: task?.assignedAt,
      to: task?.dueAt
    })

    // Populate form when task is provided (edit mode) or reset when dialog opens/closes
    useEffect(() => {
        if (isOpen) {
            if (task && !isCreate) {
                // Edit mode - populate with task data
                setSelectedStatus(task.status);
                setSelectedPriority(task.priorityStatus);
                // Handle assignees - could be User[] or number[] depending on API response
                // Check if assignees are User objects (have userId property) or just numbers
                let assigneeIds: number[] = [];
                if (Array.isArray(task.assignees) && task.assignees.length > 0) {
                    const firstAssignee = task.assignees[0];
                    if (typeof firstAssignee === 'object' && firstAssignee !== null && 'userId' in firstAssignee) {
                        // It's an array of User objects
                        assigneeIds = (task.assignees as any[]).map((a: any) => typeof a === 'object' && a.userId ? a.userId : a);
                    } else if (typeof firstAssignee === 'number') {
                        // It's already an array of numbers
                        assigneeIds = task.assignees as number[];
                    }
                }
                setSelectedAssignTo(assigneeIds);
                setName(task.name);
                setDescription(task.description);
                setDateRange({
                    from: task.assignedAt,
                    to: task.dueAt
                });
            } else {
                // Create mode - reset to defaults
                setSelectedStatus(Status.PENDING);
                setSelectedPriority(Priority.LOW);
                setSelectedAssignTo([]);
                setName("");
                setDescription("");
                setDateRange({});
            }
        } else {
            // Reset when dialog closes
            setSelectedStatus(Status.PENDING);
            setSelectedPriority(Priority.LOW);
            setSelectedAssignTo([]);
            setName("");
            setDescription("");
            setDateRange({});
            if (formRef.current) {
                formRef.current.reset();
            }
        }
    }, [isOpen, task, isCreate]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const taskRequest: TaskRequest = {
                name: name,
                description: description,
                status: selectedStatus,
                priorityStatus: selectedPriority,
                projectId: projectId,
                assignees: selectedAssignTo,
                assignedAt: dateRange.from?.toString(),
                dueAt: dateRange.to?.toString(),
            }
            
            if (isCreate && handleCreateTask) {
                await handleCreateTask({
                    name: taskRequest.name,
                    description: taskRequest.description,
                    status: taskRequest.status,
                    priorityStatus: taskRequest.priorityStatus,
                    assignees: taskRequest.assignees,
                    assignedAt: taskRequest.assignedAt,
                    dueAt: taskRequest.dueAt,
                });
            } else if (task) {
                await updateTaskAction(task.id, taskRequest);
                toast.success("Task updated successfully");
            }
            
            setIsOpen(false);
        } catch (error) {
            console.error(`Error ${isCreate ? 'creating' : 'updating'} task:`, error);
        } finally {
            setIsLoading(false);
        }
    }
  return (
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="max-w-md">
        <form ref={formRef} onSubmit={handleSubmit}>
          <AlertDialogHeader>
            <AlertDialogTitle>{isCreate ? "New Task" : "Edit Task"}</AlertDialogTitle>
            <AlertDialogDescription>
              {isCreate 
                ? "Create a new task to organize your tasks and collaborate with your team."
                : "Update the task details and collaborate with your team."}
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
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {/* Task Assign to */}
            <div className="flex items-center gap-2">
                <Label className="text-sm font-medium w-20">Assign to</Label> 
                <div>
                <UserComponent 
                    key={task?.id || 'create'} 
                    isCreate={isCreate} 
                    users={users} 
                    selectedAssignTo={selectedAssignTo} 
                    setSelectedAssignTo={setSelectedAssignTo}  
                /> 
                </div>
                <input type="hidden" name="assignTo" value={selectedAssignTo.join(",") || ""} />
            </div>
            {/* Task Status */}
            <div className="flex items-center gap-2">
                <Label className="text-sm font-medium w-20">Status</Label>
                <StatusComponent 
                    isCreate={isCreate} 
                    status={selectedStatus}
                    onStatusChange={setSelectedStatus}
                />
                <input type="hidden" name="status" value={selectedStatus} />
            </div>
            {/* Task Priority */}
            <div className="flex items-center gap-2">
                <Label className="text-sm font-medium w-20">Priority</Label>
                <PriorityComponent 
                    isCreate={isCreate} 
                    priority={selectedPriority}
                    onPriorityChange={setSelectedPriority}
                />
                <input type="hidden" name="priority" value={selectedPriority} />
            </div>
            {/* Task Due Date */}
            <div className="flex items-center gap-2">
                <Label className="text-sm font-medium w-20">Due Date</Label>
                <DatePickerRange 
                     assignAt={dateRange.from}
                     dueAt={dateRange.to}
                     onDateChange={setDateRange}
                     
                />
                <input
                  type="hidden"
                  name="assignedAt"
                  value={dateRange.from?.toString() || ""}
                />
                <input
                  type="hidden"
                  name="dueAt"
                  value={dateRange.to?.toString() || ""}
                />
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
                  {isCreate ? "Creating..." : "Updating..."}
                </>
              ) : (
                isCreate ? "Create" : "Update"
              )}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}