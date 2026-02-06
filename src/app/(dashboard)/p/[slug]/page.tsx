
import { ButtonTask } from "./_components/button-task";
import { getTasksByProjectIdAction } from "@/action/taskAction";
import { getUserInProjectAction } from "@/action/projectAction";
import ContributorComponent from "./_components/contributor";
import TaskContentComponent from "./_components/task-content";
import EmptyTask from "./_components/empty-task";


export default async function ProjectDetailPage({ params, searchParams }: { params: { slug: string }, searchParams: { proNm: string } }) {
    const { slug } = await params;
    const { proNm } = await searchParams;
    const tasks = await getTasksByProjectIdAction(Number(slug));  
    const users = await getUserInProjectAction(Number(slug));
  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] overflow-hidden px-10 pt-2">
      <div className="flex justify-between items-center mb-4 shrink-0">
        <h1 className="text-xl font-bold">{proNm}</h1>
        {tasks.payload.length === 0 ? "" : (
          <ButtonTask projectId={Number(slug)}  users={users.payload}/>   
        )}
      </div>
      {/* Main Content Container */}
      <div className="flex gap-4 w-full flex-1 min-h-0 overflow-hidden">
        {/* Task Block - 70% */}
        <div className="w-[70%] h-full flex flex-col  shadow-sm overflow-hidden">
          {tasks.payload.length === 0 ? <EmptyTask projectId={Number(slug)} users={users.payload} /> : <TaskContentComponent tasks={tasks.payload} projectId={Number(slug)} users={users.payload} />}
        </div>

        {/* Contributors Block - 30% */}
        <ContributorComponent users={users.payload} />
      </div>
    </div>
  )
}
