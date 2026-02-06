"use client";
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { FolderCode } from "lucide-react"
import { useState } from "react";
import PopCreate from "./pop-create";
import { createProjectAction, joinProjectAction } from "@/action/projectAction";
import { PopJoinProject } from "./pop-join-project";

export function EmptyProject({ className }: { className?: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenJoin, setIsOpenJoin] = useState(false);
    const handleCreateProject = async (name: string, description: string) => {
        await createProjectAction({ name, description });
    }
    const handleJoinProject = async (code: string) => {
        await joinProjectAction(code);
    }
  return (
    <Empty className={className}>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderCode />
        </EmptyMedia>
        <EmptyTitle>No Projects Yet!</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any projects yet. Get started by creating
          your first project.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center gap-2">
        <Button variant="outline" onClick={() => setIsOpenJoin(true)} className="cursor-pointer">Join Project</Button>
        <Button onClick={() => setIsOpen(true)} className="cursor-pointer"> Create Project</Button>
      </EmptyContent>
      <PopCreate isOpen={isOpen} isCreate={true} setIsOpen={setIsOpen} handleCreateProject={handleCreateProject} />
      <PopJoinProject isOpen={isOpenJoin} setIsOpen={setIsOpenJoin} handleJoinProject={handleJoinProject}/>
    </Empty>
  )
}
