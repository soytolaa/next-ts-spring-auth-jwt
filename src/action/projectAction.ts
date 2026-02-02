"use server";
import { createProjectService, getProjectsService } from "@/service/projectService";
import { ApiResponse } from "@/types/next-auth";
import { ProjectRequest, ProjectResponse } from "@/types/project";

export const createProjectAction = async (data: ProjectRequest): Promise<ApiResponse<ProjectResponse>> => {
  const response = await createProjectService(data);
  return response;
}

export const getProjectsAction = async (): Promise<ApiResponse<ProjectResponse[]>> => {
  const response = await getProjectsService();
  return response;
}