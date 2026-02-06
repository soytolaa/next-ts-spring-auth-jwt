"use client";

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { format } from "date-fns";
import { ProjectResponse } from "@/types/project";
import DropdownOptionEditAndDeleteProject from "./dropdown-project";

interface ProjectCardProps {
  project: ProjectResponse;
}

const formatDate = (date: string) => {
  return format(new Date(date), 'dd.MM.yyyy');
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const handleCardClick = (e: React.MouseEvent) => {
    // If clicking on the dropdown or its children, don't navigate
    const target = e.target as HTMLElement;
    if (target.closest('[data-dropdown]')) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <Link 
      href={`/p/${project.id}?proNm=${project.name}`} 
      onClick={handleCardClick}
      className="block"
    >
      <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
        <CardHeader className="p-4">
          <CardTitle className="flex justify-between items-center">
            <p className="text-muted-foreground font-semibold text-2xl w-full truncate">
              {project.name}
            </p>
            <div data-dropdown onClick={(e) => e.stopPropagation()}>
              <DropdownOptionEditAndDeleteProject projectId={project.id} project={project} />
            </div>
          </CardTitle>
          <CardDescription className="min-h-16 pt-2 text-ellipsis">
            <p className="text-sm text-muted-foreground w-full line-clamp-3 text-ellipsis">
              {project.description}
            </p>
          </CardDescription>
        </CardHeader>
        <CardFooter className="p-4 flex justify-between items-center gap-2 w-full">
          <p className="text-sm text-muted-foreground">{`${project.membersCount} Members`}</p>
          <p className="text-sm text-muted-foreground">{formatDate(project.createdAt)}</p>
        </CardFooter>
      </Card>
    </Link>
  );
}

