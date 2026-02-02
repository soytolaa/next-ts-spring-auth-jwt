import { AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogHeader, AlertDialogTrigger, AlertDialogFooter, AlertDialogDescription } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Pencil, X } from "lucide-react";
import { useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { FormEvent } from "react";
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";    
import { ScrollArea } from "@/components/ui/scroll-area";
import { DatePickerRange } from "@/components/date-picker-range";

const statuses = [
    {
        id: 1,
        name: "PENDING",
        color: "bg-red-500",
    },
    {
        id: 2,
        name: "IN PROGRESS",
        color: "bg-yellow-500",
    },
    {
        id: 3,
        name: "COMPLETED",
        color: "bg-green-500",
    },
    {
        id: 4,
        name: "CANCELLED",
        color: "bg-gray-500",
    },
    {
        id: 5,
        name: "ON HOLD",
        color: "bg-blue-500",
    },
]
const priorities = [
    {
        id: 1,
        name: "LOW",
        color: "bg-green-500",
    },
    {
        id: 2,
        name: "MEDIUM",
        color: "bg-yellow-500",
    },
    {
        id: 3,
        name: "HIGH",
        color: "bg-orange-500",
    },
]
const assignTo = [
    {
        id: 1,
        name: "Mr.Bean",
        email: "mrbean@example.com",
    },
    {
        id: 2,
        name: "Mr.Mind",
        email: "mrmind@example.com",
    },
    {
        id: 3,
        name: "Mr.Doe",
        email: "mrdoe@example.com",
    },
    {
        id: 4,
        name: "Mr.Smith",
        email: "mrsmith@example.com",
    },
]
export function TaskPop({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (open: boolean) => void }) {
    const formRef = useRef<HTMLFormElement>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleCreateTask = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
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
              <Label htmlFor="name">Project Name</Label>
              <Input 
                id="name" 
                name="name" 
                type="text" 
                placeholder="Project Name" 
                required
                disabled={isLoading}
                className="border-gray-300"
              />
            </div>
            {/* Task Assign to */}
            <div className="flex items-center gap-2">
                <Label className="text-sm font-medium w-20">Assign to</Label>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Badge variant="outline" className="bg-transparent font-normal border rounded-lg text-sm px-2 py-1 w-32 text-center justify-center items-center">
                            {assignTo.find((assignTo) => assignTo.id === 1)?.name}
                        </Badge>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {assignTo.map((assignTo) => (
                            <DropdownMenuItem key={assignTo.id}>
                                {assignTo.name}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            {/* Task Status */}
            <div className="flex items-center gap-2">
                <Label className="text-sm font-medium w-20">Status</Label>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Badge variant="outline" className="bg-transparent font-normal border rounded-lg text-sm px-2 py-1 w-32 text-center justify-center items-center">
                            {statuses.find((status) => status.id === 1)?.name}
                        </Badge>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {statuses.map((status) => (
                            <DropdownMenuItem key={status.id}>
                                {status.name}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            {/* Task Priority */}
            <div className="flex items-center gap-2">
                <Label className="text-sm font-medium w-20">Priority</Label>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Badge variant="outline" className="bg-transparent font-normal border rounded-lg text-sm px-2 py-1 w-32 text-center justify-center items-center">
                            {priorities.find((priority) => priority.id === 1)?.name}
                        </Badge>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {priorities.map((priority) => (
                            <DropdownMenuItem key={priority.id}>
                                {priority.name}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            {/* Task Due Date */}
            <div className="flex items-center gap-2">
                <Label className="text-sm font-medium w-20">Due Date</Label>
                <DatePickerRange/>
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