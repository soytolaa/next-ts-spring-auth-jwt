import { createTaskService, getTasksByProjectIdService } from "@/service/taskService";
import { ApiResponse } from "@/types/ApiResponse";
import { TaskRequest, TaskResponse } from "@/types/task";
export const createTaskAction = async (data: TaskRequest): Promise<ApiResponse<TaskResponse>> => {
  const response = await createTaskService(data);
  return response;
}

export const getTasksByProjectIdAction = async (id: number): Promise<ApiResponse<TaskResponse[]>> => {
  const response = await getTasksByProjectIdService(id);
  return response;
}