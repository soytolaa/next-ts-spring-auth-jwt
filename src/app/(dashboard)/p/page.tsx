import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";
import ButtonCreate from "./(_components)/button-create";
import { getProjectsAction } from "@/action/projectAction";
import { format } from "date-fns"; 
import { EmptyProject } from "./(_components)/empty-project";
export default async function ProjectPage() {
  const formatDate = (date: string) => {
    return format(new Date(date), 'dd.MM.yyyy');
  }
  const projects = await getProjectsAction();
  return (
    <div className="px-10 pt-2">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">My Projects</h1>
        {projects.payload.length === 0 ? "" : (
          <ButtonCreate />
          )}
        </div>
      {projects.payload.length === 0 ? <EmptyProject className="items-center mt-32" /> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {projects.payload.map((project) => (
          <Link href={`/p/${project.id}?proNm=${project.name}`} key={project.id} >
          <Card key={project.id}  className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 ">
          <CardHeader className="p-4">
            <CardTitle className="flex justify-between items-center">
              <p className=" text-muted-foreground font-semibold text-2xl w-full truncate">{project.name}</p> 
              <EllipsisVertical className="w-4 h-4" />
            </CardTitle>
            <CardDescription className="min-h-16 pt-2 text-ellipsis">
              <p className="text-sm text-muted-foreground w-full line-clamp-3 text-ellipsis">{project.description}</p>
            </CardDescription>
          </CardHeader>
          {/* Member and Created at */}
          <CardFooter className="p-4 flex justify-between items-center gap-2 w-full">      
            <p className="text-sm text-muted-foreground">{`${project.membersCount} Members`}</p>
            <p className="text-sm text-muted-foreground">{formatDate(project.createdAt)}</p>
          </CardFooter>
          </Card>
          </Link>
        ))}
      </div>
      )}
    </div>
  );
}