"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { TaskPop } from "./task-pop";
import { useState } from "react";
export function ButtonTask() {
    const [isOpen, setIsOpen] = useState(false);
    return(
        <>
            <Button onClick={() => setIsOpen(true)}><Plus className="w-4 h-4" /> Create Task</Button>
            <TaskPop isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    )
}