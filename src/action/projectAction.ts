"use server";
import { createProjectService, getProjectsService, getUserInProjectService } from "@/service/projectService";
import { User } from "@/types/auth";
import { ApiResponse } from "@/types/next-auth";
import { ProjectRequest, ProjectResponse } from "@/types/project";
import { revalidateTag } from "next/cache";

export const createProjectAction = async (data: ProjectRequest): Promise<ApiResponse<ProjectResponse>> => {
  const response = await createProjectService(data);  
  revalidateTag("project")
  return response;
}

export const getProjectsAction = async (): Promise<ApiResponse<ProjectResponse[]>> => {
  const response = await getProjectsService();
  return response;
}

export const getUserInProjectAction = async (id: number): Promise<ApiResponse<User[]>> => {
  const response = await getUserInProjectService(id);
  return response;
}