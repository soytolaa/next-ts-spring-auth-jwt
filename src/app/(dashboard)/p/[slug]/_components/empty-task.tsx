"use client";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { EmptyContent } from "@/components/ui/empty";
import { FolderCode } from "lucide-react";
import { useState } from "react";
import { TaskPop } from "./task-pop";
import { User } from "@/types/auth";
import { createTaskAction } from "@/action/taskAction";
import { toast } from "react-hot-toast";
import { Priority, Status } from "@/types/enums/Status";

export default function EmptyTask({ projectId, users }: { projectId: number, users: User[] }) {
 
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenJoin, setIsOpenJoin] = useState(false);
    const handleCreateTask = async (taskRequest: { name: string; description: string; status: Status; priorityStatus: Priority; assignees: number[]; assignedAt?: string; dueAt?: string }) => {
        await createTaskAction({ ...taskRequest, projectId });
        toast.success("Task created successfully");
        setIsOpen(false);
    }
  return (
    <Empty className="">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderCode />
        </EmptyMedia>
        <EmptyTitle>No Tasks Yet!</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any tasks yet. Get started by creating
          your first task.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center gap-2">
        <Button onClick={() => setIsOpen(true)} className="cursor-pointer"> Create Task</Button>
      </EmptyContent>
      <TaskPop isOpen={isOpen} setIsOpen={setIsOpen} projectId={projectId} users={users} isCreate={true} handleCreateTask={handleCreateTask} />
    </Empty>
  )
    
}