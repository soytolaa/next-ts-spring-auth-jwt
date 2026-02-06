"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { TaskPop } from "./task-pop"; 
import { useState } from "react";
import { User } from "@/types/auth";
import { createTaskAction } from "@/action/taskAction";
import { toast } from "react-hot-toast";
import { Priority, Status } from "@/types/enums/Status";
export function ButtonTask({ projectId, users }: { projectId: number, users: User[] }) {
    const [isOpen, setIsOpen] = useState(false);
    const handleCreateTask = async (taskRequest: { name: string; description: string; status: Status; priorityStatus: Priority; assignees: number[]; assignedAt?: string; dueAt?: string }) => {
        await createTaskAction({ ...taskRequest, projectId });
        toast.success("Task created successfully");
        setIsOpen(false);
    }
    return(
        <>
            <Button onClick={() => setIsOpen(true)}><Plus className="w-4 h-4" /> Create Task</Button>
            <TaskPop isOpen={isOpen} setIsOpen={setIsOpen} projectId={projectId} users={users} isCreate={true} handleCreateTask={handleCreateTask} />
        </>
    )
}