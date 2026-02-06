"use server";
import { activeDeactiveProjectService, createProjectService, deleteProjectService, getProjectsService, getUserInProjectService, joinProjectService, updateProjectService } from "@/service/projectService";
import { User } from "@/types/auth";
import { ApiResponse } from "@/types/next-auth";
import { ProjectRequest, ProjectResponse } from "@/types/project";
import { revalidateTag } from "next/cache";

export const createProjectAction = async (data: ProjectRequest): Promise<ApiResponse<ProjectResponse>> => {
  console.log("Create Project Action Data", data);
  const response = await createProjectService(data);  
  revalidateTag("project")
  return response;
}

export const getProjectsAction = async (): Promise<ApiResponse<ProjectResponse[]>> => {
  const response = await getProjectsService();
  console.log("Project Action Response", response);
  return response;
}

export const getUserInProjectAction = async (id: number): Promise<ApiResponse<User[]>> => {
  const response = await getUserInProjectService(id);
  return response;
}

export const joinProjectAction = async (code: string): Promise<ApiResponse<boolean>> => {
  const response = await joinProjectService(code);
  console.log("response", response);
  revalidateTag("project")
  return response;
}

export const updateProjectAction = async (id: number, data: ProjectRequest): Promise<ApiResponse<ProjectResponse>> => {
  const response = await updateProjectService(id, data);
  revalidateTag("project")
  return response;
}

export const deleteProjectAction = async (id: number): Promise<ApiResponse<boolean>> => {
  const response = await deleteProjectService(id);
  revalidateTag("project")
  return response;
}

export const activeDeactiveProjectAction = async (id: number,isActive: boolean): Promise<ApiResponse<boolean>> => {
  const response = await activeDeactiveProjectService(id,isActive);
  revalidateTag("project")
  return response;
}
