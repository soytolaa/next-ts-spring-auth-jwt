"use server";
import { createTaskService, getTasksByProjectIdService, updateTaskService } from "@/service/taskService";
import { ApiResponse } from "@/types/ApiResponse";
import { TaskRequest, TaskResponse } from "@/types/task";
import { revalidateTag } from "next/cache";
export const createTaskAction = async (data: TaskRequest): Promise<ApiResponse<TaskResponse>> => {
  console.log("Data:", data);
  const response = await createTaskService(data);
  revalidateTag("task")
  return response;
}

export const updateTaskAction = async (id: number, data: TaskRequest): Promise<ApiResponse<TaskResponse>> => {
  const response = await updateTaskService(id, data);
  revalidateTag("task")
  return response;
}

export const getTasksByProjectIdAction = async (id: number): Promise<ApiResponse<TaskResponse[]>> => {
  const response = await getTasksByProjectIdService(id);
  return response;
}