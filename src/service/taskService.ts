import { headerToken } from "@/app/api/headerToken";
import { ApiResponse } from "@/types/ApiResponse";
import { TaskRequest, TaskResponse } from "@/types/task";   

export async function createTaskService(data: TaskRequest): Promise<ApiResponse<TaskResponse>> {
  const { headers } = await headerToken(false);

  const apiPayload = {
    name: data.name,
    description: data.description,
    status: data.status,
    priorityStatus: data.priorityStatus,
    projectId: data.projectId,
    assignees: data.assignees,
    assignedAt:data.assignedAt,  
    dueAt: data.dueAt,  
  };
  
  const response = await fetch(`${process.env.API_URL}/tasks/create`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(apiPayload),
  });
  if (response.status !== 201) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }
  return response.json() as Promise<ApiResponse<TaskResponse>>;
}

export async function getTasksByProjectIdService(id :number): Promise<ApiResponse<TaskResponse[]>> {
  const { headers } = await headerToken(false);
  const response = await fetch(`${process.env.API_URL}/tasks/project/${id}`, {
    method: "GET",
    headers: headers,
  });
  if (response.status !== 200) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }
  return response.json() as Promise<ApiResponse<TaskResponse[]>>;
}