"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import PopCreate from "./pop-create";
import { useState } from "react";
import { createProjectAction, joinProjectAction } from "@/action/projectAction";
import { toast } from "react-hot-toast";
import { DropdownMenu, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { DropdownMenuGroup } from "@/components/ui/dropdown-menu";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { PopJoinProject } from "./pop-join-project";

export default function ButtonCreate() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpenJoinProject, setIsOpenJoinProject] = useState(false);
    const handleCreateProject = async (name: string, description: string) => {
        setIsLoading(true);
        try {
            await createProjectAction({ 
                name: name, 
                description: description 
            });
            toast.success("Project created successfully");
            setIsOpen(false);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to create project");
            throw error; // Re-throw to let PopCreate handle loading state
        } finally {
            setIsLoading(false);
        }
    };

    const handleJoinProject = async (code: string) => {
        setIsLoading(true);
        try {
            await joinProjectAction(code);
            toast.success("Project joined successfully");
            setIsOpenJoinProject(false);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to join project");
        } finally {
            setIsLoading(false);
        }
    };
    return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button><Plus className="h-4 w-4"/> Create Project</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="start">
        <DropdownMenuGroup >
          <DropdownMenuItem className="cursor-pointer" onClick={() => setIsOpenJoinProject(true)}>Join Project</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" onClick={() => setIsOpen(true)}>Create Project</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
      <PopCreate isOpen={isOpen} setIsOpen={setIsOpen} handleCreateProject={handleCreateProject} />
      <PopJoinProject isOpen={isOpenJoinProject} setIsOpen={setIsOpenJoinProject} handleJoinProject={handleJoinProject}/>
    </DropdownMenu>
  )
}