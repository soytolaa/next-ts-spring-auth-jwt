import ButtonCreate from "./(_components)/button-create";
import { getProjectsAction } from "@/action/projectAction";
import { EmptyProject } from "./(_components)/empty-project";
import ProjectCard from "./(_components)/project-card";
export default async function ProjectPage() {
  const projects = await getProjectsAction();
  return (
    <div className="px-10 pt-2">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">My Projects</h1>
        {projects.payload.length === 0 ? "" : (
          <ButtonCreate />
        )}
      </div>
      {projects.payload.length === 0 ? (
        <EmptyProject className="items-center mt-32" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {projects.payload.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}