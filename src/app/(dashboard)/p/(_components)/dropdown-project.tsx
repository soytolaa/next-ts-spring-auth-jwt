"use client";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ProjectResponse } from "@/types/project";  
import { MoreVertical, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import YNAlert from "@/components/yn-alert";
import PopCreateProject from "./pop-create";
import { updateProjectAction } from "@/action/projectAction";
import { toast } from "react-hot-toast";

export default function DropdownOptionEditAndDeleteProject({ projectId, project }: { projectId: number, project: ProjectResponse }) {
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    
    const handleUpdateProject = async (id: number, name: string, description: string) => {
        try {
            await updateProjectAction(id, { name, description });
            toast.success("Project updated successfully");
            setIsOpenEdit(false);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to update project");
            throw error; // Re-throw to let PopCreate handle loading state
        }
    }
    
    const handleDelete = async () => {
        console.log("Delete project", project);
        // TODO: Implement delete functionality
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
        <PopCreateProject 
            isOpen={isOpenEdit} 
            setIsOpen={setIsOpenEdit} 
            handleUpdateProject={handleUpdateProject} 
            isCreate={false} 
            project={project}
        />
        <YNAlert isOpen={isOpenDelete} setIsOpen={setIsOpenDelete} handleConfirm={handleDelete} title="# Delete Project" description="Are you sure you want to delete this project?" />
        </>
    )
}