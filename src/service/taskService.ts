import { headerToken } from "@/app/api/headerToken";
import { ApiResponse } from "@/types/ApiResponse";
import { TaskRequest, TaskResponse } from "@/types/task";

export async function createTaskService(data: TaskRequest): Promise<ApiResponse<TaskResponse>> {
  const { headers } = await headerToken(false);
  
  // Transform TaskRequest to API format
  // LocalDateTime format: "2026-02-02T09:58:05" -> convert to ISO with milliseconds and Z
  const formatLocalDateTimeToISO = (ldt: LocalDateTime | undefined): string | undefined => {
    if (!ldt) return undefined;
    const isoString = ldt.toString(); // "2026-02-02T09:58:05"
    // Add milliseconds and Z to match API format: "2026-02-02T09:58:05.660Z"
    return `${isoString}.000Z`;
  };
  
  const apiPayload = {
    name: data.name,
    description: data.description,
    status: data.status,
    priorityStatus: data.priorityStatus,
    projectId: data.projectId,
    assignees: data.assignees.map(user => user.userId), // Convert User[] to number[]
    assignedAt: formatLocalDateTimeToISO(data.assignedAt), // Convert LocalDateTime to ISO string
    dueAt: formatLocalDateTimeToISO(data.dueAt), // Convert LocalDateTime to ISO string
  };
  
  const response = await fetch(`${process.env.API_URL}/tasks/create`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(apiPayload),
  });
  return response.json();
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