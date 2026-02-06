"use client";
import { Button } from "@/components/ui/button";
import { MoreVertical, Pencil, Trash } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { TaskPop } from "../[slug]/_components/task-pop";
import { User } from "@/types/auth";
import { TaskResponse } from "@/types/task";
import YNAlert from "@/components/yn-alert";

export default function DropdownEditAndDelete({ projectId, taskId, users, task }: { projectId: number, taskId: number, users: User[], task: TaskResponse }) {
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const handleDelete = () => {
        console.log("Delete task");
    }
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="rounded-full" size="icon">
                        <MoreVertical className="w-4 h-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="ml-2">
                    <DropdownMenuItem onClick={() => setIsOpenEdit(true)} className="cursor-pointer flex items-center gap-2"> <Pencil className="w-4 h-4" /> Edit</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setIsOpenDelete(true)} className="cursor-pointer flex items-center gap-2 text-red-500"> <Trash className="w-4 h-4" /> Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu> 
            <TaskPop isOpen={isOpenEdit} setIsOpen={setIsOpenEdit} projectId={projectId} users={users} isCreate={false} task={task} />
            <YNAlert isOpen={isOpenDelete} setIsOpen={setIsOpenDelete} handleConfirm={() => handleDelete()} title="# Delete Task" description="Are you sure you want to delete this task?" />
        </>
    )
}