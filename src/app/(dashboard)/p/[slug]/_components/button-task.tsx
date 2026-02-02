"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { TaskPop } from "./task-pop";
import { useState } from "react";
import { User } from "@/types/auth";
export function ButtonTask({ projectId, users }: { projectId: number, users: User[] }) {
    const [isOpen, setIsOpen] = useState(false);
    return(
        <>
            <Button onClick={() => setIsOpen(true)}><Plus className="w-4 h-4" /> Create Task</Button>
            <TaskPop isOpen={isOpen} setIsOpen={setIsOpen} projectId={projectId} users={users} />
        </>
    )
}